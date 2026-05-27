import { Server, Socket } from "socket.io";
import Redis from "ioredis";
import { PrismaClient, ProgressionMode, SessionStatus } from "@prisma/client";
import { SessionService, CachedSessionMeta } from "../services/session.service";
import { ResultService } from "../services/result.service";
import { RedisKeys, RedisTTL } from "../config/redis";
import { generateParticipantId } from "../utils/pin.generator";
import { calculateScore, validateSubmittedOptions } from "../utils/scoring";
import { checkWsRateLimit } from "../middleware/rateLimiter.middleware";
import {
  JoinRoomPayload,
  SubmitVotePayload,
  NextQuestionPayload,
  StartSessionPayload,
  EndSessionPayload,
  JoinLobbyPayload,
  QuestionActiveResponse,
  SocketData,
} from "../types/socket.types";
import { ClientEvents, ServerEvents } from "../constants/socket.events";

// =============================================================
// PollGateway — центральний WebSocket шлюз застосунку.
//
// Dual-Mode Design:
//   MANUAL — організатор синхронно перемикає питання для всіх.
//            io.to(pin).emit() — broadcast всій кімнаті.
//
//   AUTO   — кожен учасник просувається у власному темпі.
//            socket.emit() — персональне повідомлення.
//            Для кожного сокета тримається індивідуальний
//            таймер + expectedQuestionId у socketStates Map.
//
// Захист від race conditions (AUTO):
//   - socketStates: Map<socketId, { timer, expectedQuestionId }>
//   - submit_vote перевіряє questionId проти expectedQuestionId:
//     запізнілий пакет → silent return.
//   - clearTimeout виконується СИНХРОННО до будь-якого await,
//     що унеможливлює одночасне спрацювання таймера і submit.
//
// Dead Man's Switch (AUTO):
//   Серверний setTimeout = timeLimit * 1000 + 2000 мс (grace period).
//   По спрацюванню: score=0, пропуск питання, перехід до наступного.
// =============================================================

interface SocketTimerState {
  timer?: NodeJS.Timeout;
  expectedQuestionId: number;
  participantId: string;
  pin: string;
}

export class PollGateway {
  private readonly sessionService: SessionService;
  private readonly resultService: ResultService;

  // Зберігає стан таймера і поточного очікуваного питання для кожного сокета.
  // Ключ: socket.id (унікальний на з'єднання, змінюється при реконнекті).
  private readonly socketStates = new Map<string, SocketTimerState>();

  constructor(
    private readonly io: Server,
    private readonly prisma: PrismaClient,
    private readonly redis: Redis,
  ) {
    this.sessionService = new SessionService(prisma, redis);
    this.resultService = new ResultService(prisma, redis);
    this.initialize();
  }

  private initialize(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log(`[WS] Connected: ${socket.id}`);

      socket.on(ClientEvents.JOIN_ROOM, (p: JoinRoomPayload) => this.handleJoinRoom(socket, p));
      socket.on(ClientEvents.START_SESSION, (p: StartSessionPayload) => this.handleStartSession(socket, p));
      socket.on(ClientEvents.SUBMIT_VOTE, (p: SubmitVotePayload) => this.handleSubmitVote(socket, p));
      socket.on(ClientEvents.NEXT_QUESTION, (p: NextQuestionPayload) => this.handleNextQuestion(socket, p));
      socket.on(ClientEvents.END_SESSION, (p: EndSessionPayload) => this.handleEndSession(socket, p));
      socket.on(ClientEvents.JOIN_LOBBY, (p: JoinLobbyPayload) => this.handleJoinLobby(socket, p));
      socket.on(ClientEvents.DISCONNECT, (reason: string) => this.handleDisconnect(socket, reason));
    });
  }

  // ============================================================
  // join_lobby — організатор приєднується до кімнати
  // ============================================================
  private async handleJoinLobby(socket: Socket, payload: JoinLobbyPayload): Promise<void> {
    if (!(await this.checkRateLimit(socket))) return;

    const { pin } = payload;
    const sessionMeta = await this.sessionService.getCachedSessionMeta(pin);
    if (!sessionMeta) return this.emitError(socket, "Session not found", "SESSION_NOT_FOUND");

    await socket.join(pin);

    const count = await this.redis.scard(RedisKeys.sessionParticipants(pin));
    socket.emit(ServerEvents.PARTICIPANTS_UPDATED, { count });

    // Organizer rejoining an already active session — replay full state
    if (sessionMeta.status === SessionStatus.ACTIVE) {
      socket.emit(ServerEvents.SESSION_STARTED, { progressionMode: sessionMeta.progressionMode });

      if (sessionMeta.progressionMode === ProgressionMode.MANUAL) {
        const currentQ = await this.getQuestionByIndex(sessionMeta.pollId, sessionMeta.currentQuestion);
        if (currentQ) {
          socket.emit(ServerEvents.QUESTION_ACTIVE, this.formatQuestion(currentQ, sessionMeta.currentQuestion, sessionMeta.totalQuestions));
        }
      }

      const questions = await this.prisma.question.findMany({
        where: { pollId: sessionMeta.pollId },
        orderBy: { order: "asc" },
        include: { options: { select: { id: true, text: true } } },
      });

      for (const question of questions) {
        const hasVotes = await this.redis.exists(RedisKeys.questionVoteCount(pin, question.id));
        if (hasVotes) {
          const results = await this.resultService.getAggregatedResults(pin, question.id, question.options, question.text);
          socket.emit(ServerEvents.RESULTS_UPDATED, results);
        }
      }
    }
  }

  // ============================================================
  // join_room — підключення до кімнати сесії
  // ============================================================
  //
  // Подвійна роль: перше з'єднання і реконнект.
  //   - без participantId → новий учасник (генеруємо UUID)
  //   - з participantId  → реконнект (відновлюємо прогрес з Redis)
  //
  // AUTO + ACTIVE: одразу надсилаємо поточне питання і озброюємо таймер.
  //
  private async handleJoinRoom(socket: Socket, payload: JoinRoomPayload): Promise<void> {
    if (!(await this.checkRateLimit(socket))) return;

    const { pin, participantName, participantId: existingId } = payload;

    if (!existingId && !participantName) {
      return this.emitError(socket, "participantName is required", "MISSING_NAME");
    }

    const sessionMeta = await this.sessionService.getCachedSessionMeta(pin);
    if (!sessionMeta) return this.emitError(socket, "Session not found", "SESSION_NOT_FOUND");
    if (sessionMeta.status === SessionStatus.FINISHED) {
      return this.emitError(socket, "Session has already ended", "SESSION_FINISHED");
    }

    let participantId = existingId ?? generateParticipantId();
    let isReconnect = !!existingId;
    let progressKey = RedisKeys.participantProgress(pin, participantId);
    let resumeQuestionIndex = 0;

    // Validate reconnect: progress key must exist AND belong to this exact session.
    // Stale keys from a previous session with the same PIN are rejected.
    if (isReconnect) {
      const savedProgress = await this.redis.hgetall(progressKey);
      const belongsToSession = savedProgress.sessionId === String(sessionMeta.id);
      if (savedProgress.questionIndex !== undefined && belongsToSession) {
        resumeQuestionIndex = parseInt(savedProgress.questionIndex);
        console.log(`[WS] Reconnect: ${participantId} resuming at Q${resumeQuestionIndex}`);
      } else {
        if (!participantName) {
          return this.emitError(socket, "participantName is required", "MISSING_NAME");
        }
        participantId = generateParticipantId();
        isReconnect = false;
        progressKey = RedisKeys.participantProgress(pin, participantId);
      }
    }

    Object.assign(socket.data, {
      participantId,
      participantName,
      currentPin: pin,
      isOrganizer: false,
    } satisfies SocketData);

    await socket.join(pin);

    await this.prisma.sessionParticipant.upsert({
      where: { id: participantId },
      create: { id: participantId, name: participantName, sessionId: sessionMeta.id },
      update: {},
    });

    if (!isReconnect) {
      await this.redis.hset(progressKey, {
        sessionId: String(sessionMeta.id),
        name: participantName,
        questionIndex: "0",
        totalScore: "0",
        joinedAt: Date.now().toString(),
      });
      await this.redis.expire(progressKey, RedisTTL.PARTICIPANT);
    }

    await this.redis.sadd(RedisKeys.sessionParticipants(pin), participantId);

    socket.emit(ServerEvents.ROOM_JOINED, {
      sessionId: sessionMeta.id,
      pin,
      participantId,
      progressionMode: sessionMeta.progressionMode,
      totalQuestions: sessionMeta.totalQuestions,
      pollTitle: sessionMeta.pollTitle,
      pollDescription: sessionMeta.pollDescription,
    });

    const count = await this.redis.scard(RedisKeys.sessionParticipants(pin));
    this.io.to(pin).emit(ServerEvents.PARTICIPANTS_UPDATED, { count });

    if (sessionMeta.status === SessionStatus.ACTIVE) {
      if (sessionMeta.progressionMode === ProgressionMode.AUTO) {
        // AUTO: надсилаємо персональне питання і озброюємо таймер
        await this.sendAutoQuestion(socket, pin, resumeQuestionIndex, sessionMeta);
      } else {
        // MANUAL: надсилаємо поточне питання тільки цьому сокету (він приєднався пізно)
        await this.sendManualQuestion(socket, sessionMeta.currentQuestion, sessionMeta);
      }
    }
  }

  // ============================================================
  // start_session — організатор запускає сесію
  // ============================================================
  //
  // AUTO:   fetchSockets() → персональне питання КОЖНОМУ учаснику.
  // MANUAL: broadcast першого питання через io.to(pin).emit().
  //
  private async handleStartSession(socket: Socket, payload: StartSessionPayload): Promise<void> {
    if (!(await this.checkRateLimit(socket))) return;

    const { pin } = payload;
    const sessionMeta = await this.sessionService.getCachedSessionMeta(pin);
    if (!sessionMeta) return this.emitError(socket, "Session not found", "SESSION_NOT_FOUND");

    if (sessionMeta.status !== SessionStatus.WAITING) {
      return this.emitError(socket, "Session is already started", "ALREADY_STARTED");
    }

    await this.sessionService.updateSessionStatus(pin, SessionStatus.ACTIVE);

    if (sessionMeta.progressionMode === ProgressionMode.AUTO) {
      // Дістаємо всі підключені сокети кімнати і надсилаємо питання персонально
      const roomSockets = await this.io.in(pin).fetchSockets();

      for (const remote of roomSockets) {
        const clientData = remote.data as SocketData;
        if (!clientData.participantId) continue; // пропускаємо організатора

        // io.sockets.sockets.get() повертає реальний Socket (для emit і timer)
        const clientSocket = this.io.sockets.sockets.get(remote.id);
        if (!clientSocket) continue;

        await this.sendAutoQuestion(clientSocket, pin, 0, sessionMeta);
      }
    } else {
      // MANUAL: broadcast першого питання всій кімнаті
      const question = await this.getQuestionByIndex(sessionMeta.pollId, 0);
      if (question) {
        this.io.to(pin).emit(ServerEvents.QUESTION_ACTIVE, this.formatQuestion(question, 0, sessionMeta.totalQuestions));
      }
    }

    socket.emit(ServerEvents.SESSION_STARTED, { pin, progressionMode: sessionMeta.progressionMode });
  }

  // ============================================================
  // submit_vote — обробка відповіді учасника
  // ============================================================
  private async handleSubmitVote(socket: Socket, payload: SubmitVotePayload): Promise<void> {
    if (!(await this.checkRateLimit(socket))) return;

    const { participantId } = socket.data as SocketData;
    if (!participantId) return this.emitError(socket, "Not joined to a session", "NOT_JOINED");

    const sessionMeta = await this.sessionService.getCachedSessionMeta(payload.pin);
    if (!sessionMeta) return this.emitError(socket, "Session not found", "SESSION_NOT_FOUND");

    if (sessionMeta.progressionMode === ProgressionMode.AUTO) {
      await this.handleAutoVote(socket, payload, participantId, sessionMeta);
    } else {
      await this.handleManualVote(socket, payload, participantId, sessionMeta);
    }
  }

  // ─── AUTO vote ────────────────────────────────────────────────
  //
  // Ключові захисти:
  // 1. expectedQuestionId guard — відкидає запізнілі пакети.
  // 2. clearTimeout СИНХРОННО — до першого await, щоб таймер
  //    не міг спрацювати паралельно з цим обробником.
  // 3. Порожній optionIds [] = клієнтський таймаут → score=0.
  //
  private async handleAutoVote(
    socket: Socket,
    payload: SubmitVotePayload,
    participantId: string,
    sessionMeta: CachedSessionMeta,
  ): Promise<void> {
    const { pin, questionId, optionIds } = payload;

    // Guard: якщо questionId не збігається — це запізнілий або дублікат пакет
    const state = this.socketStates.get(socket.id);
    if (!state || state.expectedQuestionId !== questionId) return;

    // Очищаємо таймер СИНХРОННО — до будь-якого await
    if (state.timer) {
      clearTimeout(state.timer);
      state.timer = undefined;
    }

    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      include: { options: true },
    });
    if (!question) return;

    // Порожній масив = клієнт-сайд таймаут → приймаємо як score=0
    let score = 0;
    if (optionIds.length > 0) {
      const validation = validateSubmittedOptions(question, optionIds);
      if (!validation.valid) return this.emitError(socket, validation.error!, "INVALID_OPTIONS");
      score = calculateScore(question, optionIds);
    }

    await this.resultService.accumulateVote(pin, sessionMeta.id, questionId, participantId, optionIds, score);
    await this.redis.hincrby(RedisKeys.participantProgress(pin, participantId), "totalScore", score);

    socket.emit(ServerEvents.VOTE_ACCEPTED, { questionId, score });

    const aggregated = await this.resultService.getAggregatedResults(
      pin,
      questionId,
      question.options.map((o) => ({ id: o.id, text: o.text })),
      question.text,
    );
    this.io.to(pin).emit(ServerEvents.RESULTS_UPDATED, aggregated);

    await this.advanceToNext(socket, pin, participantId, sessionMeta);
  }

  // ─── MANUAL vote ──────────────────────────────────────────────
  private async handleManualVote(
    socket: Socket,
    payload: SubmitVotePayload,
    participantId: string,
    sessionMeta: CachedSessionMeta,
  ): Promise<void> {
    const { pin, questionId, optionIds } = payload;

    if (await this.resultService.hasParticipantVoted(pin, questionId, participantId)) {
      return this.emitError(socket, "Already voted for this question", "DUPLICATE_VOTE");
    }

    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      include: { options: true },
    });
    if (!question) return this.emitError(socket, "Question not found", "QUESTION_NOT_FOUND");

    const validation = validateSubmittedOptions(question, optionIds);
    if (!validation.valid) return this.emitError(socket, validation.error!, "INVALID_OPTIONS");

    const score = calculateScore(question, optionIds);

    await this.resultService.accumulateVote(pin, sessionMeta.id, questionId, participantId, optionIds, score);
    await this.redis.hincrby(RedisKeys.participantProgress(pin, participantId), "totalScore", score);

    socket.emit(ServerEvents.VOTE_ACCEPTED, { questionId, score });

    const aggregated = await this.resultService.getAggregatedResults(
      pin,
      questionId,
      question.options.map((o) => ({ id: o.id, text: o.text })),
      question.text,
    );
    this.io.to(pin).emit(ServerEvents.RESULTS_UPDATED, aggregated);
  }

  // ============================================================
  // next_question — організатор переключає питання (тільки MANUAL)
  // ============================================================
  private async handleNextQuestion(socket: Socket, payload: NextQuestionPayload): Promise<void> {
    if (!(await this.checkRateLimit(socket))) return;

    const { pin } = payload;
    const sessionMeta = await this.sessionService.getCachedSessionMeta(pin);
    if (!sessionMeta) return this.emitError(socket, "Session not found", "SESSION_NOT_FOUND");

    if (sessionMeta.progressionMode !== ProgressionMode.MANUAL) {
      return this.emitError(socket, "next_question is only available in MANUAL mode", "WRONG_MODE");
    }
    if (sessionMeta.status !== SessionStatus.ACTIVE) {
      return this.emitError(socket, "Session is not active", "SESSION_NOT_ACTIVE");
    }

    const currentQ = await this.getQuestionByIndex(sessionMeta.pollId, sessionMeta.currentQuestion);
    if (currentQ) await this.resultService.flushQuestionResults(pin, currentQ.id);

    const nextIndex = sessionMeta.currentQuestion + 1;

    if (nextIndex >= sessionMeta.totalQuestions) {
      await this.endSession(pin, sessionMeta);
      return;
    }

    await this.sessionService.advanceQuestion(pin, nextIndex);

    const nextQuestion = await this.getQuestionByIndex(sessionMeta.pollId, nextIndex);
    if (nextQuestion) {
      this.io.to(pin).emit(ServerEvents.QUESTION_ACTIVE, this.formatQuestion(nextQuestion, nextIndex, sessionMeta.totalQuestions));
    }
  }

  // ============================================================
  // end_session — організатор завершує сесію вручну (тільки AUTO)
  // ============================================================
  //
  // Очищає всі активні таймери учасників цієї кімнати,
  // флашить результати з Redis у MySQL і ставить статус FINISHED.
  //
  private async handleEndSession(socket: Socket, payload: EndSessionPayload): Promise<void> {
    if (!(await this.checkRateLimit(socket))) return;

    const { pin } = payload;
    const sessionMeta = await this.sessionService.getCachedSessionMeta(pin);
    if (!sessionMeta) return this.emitError(socket, "Session not found", "SESSION_NOT_FOUND");

    if (sessionMeta.status === SessionStatus.FINISHED) {
      return this.emitError(socket, "Session is already finished", "SESSION_FINISHED");
    }

    // Зупиняємо всі таймери учасників цієї кімнати
    for (const [socketId, state] of this.socketStates.entries()) {
      if (state.pin === pin) {
        if (state.timer) clearTimeout(state.timer);
        this.socketStates.delete(socketId);
      }
    }

    await this.endSession(pin, sessionMeta);
  }

  // ============================================================
  // disconnect — очищення після від'єднання
  // ============================================================
  //
  // КРИТИЧНО: clearTimeout тут запобігає:
  //   1. Memory leak (Map + NodeJS timer живуть вічно)
  //   2. Спробі emit на мертвий сокет після спрацювання таймера
  //
  private async handleDisconnect(socket: Socket, reason: string): Promise<void> {
    console.log(`[WS] Disconnected: ${socket.id}, reason: ${reason}`);

    const state = this.socketStates.get(socket.id);
    if (state) {
      if (state.timer) clearTimeout(state.timer);
      this.socketStates.delete(socket.id);
    }

    const data = socket.data as SocketData;
    if (data.currentPin && data.participantId) {
      await this.redis.srem(RedisKeys.sessionParticipants(data.currentPin), data.participantId);
      const count = await this.redis.scard(RedisKeys.sessionParticipants(data.currentPin));
      this.io.to(data.currentPin).emit(ServerEvents.PARTICIPANTS_UPDATED, { count });
    }
  }

  // ============================================================
  // handleTimeout — Dead Man's Switch (AUTO mode)
  // ============================================================
  //
  // Викликається через setTimeout якщо учасник не відповів
  // за timeLimit + 2 сек grace period.
  //
  // Guards:
  //   - socketStates miss → submit_vote вже обробив це питання
  //   - expectedQuestionId mismatch → застарілий таймер
  //   - socket не знайдено → disconnect прибрав стан (edge case
  //     при дуже швидкому reconnect, де handleDisconnect не встиг)
  //
  private async handleTimeout(socketId: string, questionId: number, pin: string): Promise<void> {
    const state = this.socketStates.get(socketId);
    if (!state || state.expectedQuestionId !== questionId) return;

    state.timer = undefined;

    const socket = this.io.sockets.sockets.get(socketId);
    if (!socket) {
      // Сокет відключився після того як таймер потрапив у чергу подій.
      // Прибираємо стан, щоб уникнути каскаду таймерів для мертвого сокета.
      this.socketStates.delete(socketId);
      return;
    }

    const sessionMeta = await this.sessionService.getCachedSessionMeta(pin);
    if (!sessionMeta) return;

    // Зберігаємо пропущену відповідь: score=0, порожні optionIds
    await this.resultService.accumulateVote(pin, sessionMeta.id, questionId, state.participantId, [], 0);

    await this.advanceToNext(socket, pin, state.participantId, sessionMeta, true);
  }

  // ============================================================
  // advanceToNext — перехід до наступного питання (AUTO)
  // ============================================================
  //
  // isTimeout=true (Dead Man's Switch): якщо питань більше немає,
  // додатково емітимо session_ended особисто цьому сокету.
  //
  private async advanceToNext(
    socket: Socket,
    pin: string,
    participantId: string,
    sessionMeta: CachedSessionMeta,
    isTimeout = false,
  ): Promise<void> {
    const progressKey = RedisKeys.participantProgress(pin, participantId);
    const currentIndexStr = await this.redis.hget(progressKey, "questionIndex");
    const nextIndex = parseInt(currentIndexStr ?? "0") + 1;

    if (nextIndex >= sessionMeta.totalQuestions) {
      const totalScoreStr = await this.redis.hget(progressKey, "totalScore");
      socket.emit(ServerEvents.USER_FINISHED, {
        totalScore: parseInt(totalScoreStr ?? "0"),
        totalQuestions: sessionMeta.totalQuestions,
      });
      this.socketStates.delete(socket.id);

      if (isTimeout) {
        socket.emit(ServerEvents.SESSION_ENDED, { message: "Session has ended", pin });
      }
      return;
    }

    await this.redis.hset(progressKey, { questionIndex: nextIndex.toString() });
    await this.sendAutoQuestion(socket, pin, nextIndex, sessionMeta);
  }

  // ============================================================
  // sendAutoQuestion — надіслати питання + озброїти таймер (AUTO)
  // ============================================================
  //
  // Єдина точка входу для надсилання питання в AUTO режимі.
  // Оновлює socketStates: новий expectedQuestionId і timer.
  //
  private async sendAutoQuestion(
    socket: Socket,
    pin: string,
    questionIndex: number,
    sessionMeta: CachedSessionMeta,
  ): Promise<void> {
    const question = await this.getQuestionByIndex(sessionMeta.pollId, questionIndex);
    if (!question) return;

    // Якщо для цього сокета вже є таймер (реконнект mid-question) — очищаємо
    const existing = this.socketStates.get(socket.id);
    if (existing?.timer) clearTimeout(existing.timer);

    const state: SocketTimerState = {
      expectedQuestionId: question.id,
      participantId: (socket.data as SocketData).participantId,
      pin,
    };
    this.socketStates.set(socket.id, state);

    socket.emit(ServerEvents.QUESTION_ACTIVE, this.formatQuestion(question, questionIndex, sessionMeta.totalQuestions));

    // Озброюємо таймер тільки якщо у питання є ліміт часу
    if (question.timeLimit != null) {
      state.timer = setTimeout(
        () => void this.handleTimeout(socket.id, question.id, pin),
        question.timeLimit * 1000 + 2000, // +2 сек grace period
      );
    }
  }

  // ============================================================
  // Допоміжні методи
  // ============================================================

  private async sendManualQuestion(
    socket: Socket,
    questionIndex: number,
    sessionMeta: CachedSessionMeta,
  ): Promise<void> {
    const question = await this.getQuestionByIndex(sessionMeta.pollId, questionIndex);
    if (!question) return;
    socket.emit(ServerEvents.QUESTION_ACTIVE, this.formatQuestion(question, questionIndex, sessionMeta.totalQuestions));
  }

  private async getQuestionByIndex(pollId: number, index: number) {
    return this.prisma.question.findFirst({
      where: { pollId },
      include: { options: true },
      orderBy: { order: "asc" },
      skip: index,
      take: 1,
    });
  }

  private async endSession(pin: string, sessionMeta: CachedSessionMeta): Promise<void> {
    const questions = await this.prisma.question.findMany({
      where: { pollId: sessionMeta.pollId },
      select: { id: true },
    });

    await this.resultService.flushAllSessionResults(
      pin,
      questions.map((q) => q.id),
    );
    await this.sessionService.updateSessionStatus(pin, SessionStatus.FINISHED);
    await this.redis.del(RedisKeys.sessionParticipants(pin));

    // Надсилаємо user_finished кожному учаснику (потрібно для MANUAL режиму,
    // де advanceToNext не викликається і бал учасника ніколи не надходить)
    const roomSockets = await this.io.in(pin).fetchSockets();
    for (const remote of roomSockets) {
      const clientData = remote.data as SocketData;
      if (!clientData.participantId) continue;
      const totalScoreStr = await this.redis.hget(
        RedisKeys.participantProgress(pin, clientData.participantId),
        'totalScore',
      );
      const clientSocket = this.io.sockets.sockets.get(remote.id);
      if (clientSocket) {
        clientSocket.emit(ServerEvents.USER_FINISHED, {
          totalScore: parseInt(totalScoreStr ?? '0'),
          totalQuestions: sessionMeta.totalQuestions,
        });
      }
    }

    this.io.to(pin).emit(ServerEvents.SESSION_ENDED, { message: "Session has ended", pin });
  }

  private formatQuestion(
    question: {
      id: number;
      text: string;
      timeLimit: number | null;
      type: string;
      options: Array<{ id: number; text: string }>;
    },
    index: number,
    total: number,
  ): QuestionActiveResponse {
    return {
      id: question.id,
      text: question.text,
      timeLimit: question.timeLimit,
      type: question.type as QuestionActiveResponse["type"],
      options: question.options.map((o) => ({ id: o.id, text: o.text })),
      questionNumber: index + 1,
      totalQuestions: total,
    };
  }

  private async checkRateLimit(socket: Socket): Promise<boolean> {
    const allowed = await checkWsRateLimit(socket);
    if (!allowed) this.emitError(socket, "Rate limit exceeded", "RATE_LIMIT");
    return allowed;
  }

  private emitError(socket: Socket, message: string, code: string): void {
    socket.emit(ServerEvents.ERROR, { message, code });
  }
}
