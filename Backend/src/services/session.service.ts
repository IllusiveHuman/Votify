import Redis from 'ioredis';
import * as XLSX from 'xlsx';
import { PrismaClient, ProgressionMode, SessionStatus } from '@prisma/client';
import { generateUniquePin } from '../utils/pin.generator';
import { AppError } from '../middleware/errorHandler.middleware';
import { CreateSessionDto, SessionListQuery } from '../types/api.types';
import { RedisKeys, RedisTTL } from '../config/redis';

// =============================================================
// Структура метаданих сесії в Redis-кеші.
// Зберігаємо мінімальний набір полів для WebSocket gateway —
// уникаємо зайвих запитів до MySQL при кожній WS-події.
// =============================================================
export interface CachedSessionMeta {
  id: number;
  pollId: number;
  organizerId: number;
  progressionMode: ProgressionMode;
  status: SessionStatus;
  currentQuestion: number;
  totalQuestions: number;
  pollTitle: string;
  pollDescription: string | null;
}

export class SessionService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly redis: Redis,
  ) {}

  // =============================================================
  // createSession — головний метод, що запускає все з нуля.
  //
  // Архітектурний потік:
  // 1. Validate: опитування існує і належить організатору
  // 2. Guard: опитування не порожнє
  // 3. Generate: криптографічно безпечний PIN
  // 4. Persist: сесія в MySQL (джерело правди)
  // 5. Cache: метадані в Redis (для швидкого WS-доступу)
  // =============================================================
  async createSession(organizerId: number, dto: CreateSessionDto) {
    const poll = await this.prisma.poll.findFirst({
      where: { id: dto.pollId, organizerId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: { options: true },
        },
      },
    });

    if (!poll) throw new AppError(404, 'Poll not found or access denied');
    if (poll.questions.length === 0) throw new AppError(400, 'Poll must have at least one question');

    const pin = await generateUniquePin(this.prisma);

    const session = await this.prisma.session.create({
      data: {
        pin,
        progressionMode: dto.progressionMode as ProgressionMode,
        pollId: dto.pollId,
        organizerId,
        status: SessionStatus.WAITING,
        currentQuestion: 0,
      },
    });

    // Кешуємо метадані в Redis з TTL 24 год.
    // Це дозволяє WebSocket gateway уникати JOIN до БД при кожній події.
    const meta: CachedSessionMeta = {
      id: session.id,
      pollId: poll.id,
      organizerId,
      progressionMode: dto.progressionMode as ProgressionMode,
      status: SessionStatus.WAITING,
      currentQuestion: 0,
      totalQuestions: poll.questions.length,
      pollTitle: poll.title,
      pollDescription: poll.description ?? null,
    };

    await this.redis.set(
      RedisKeys.sessionMeta(pin),
      JSON.stringify(meta),
      'EX',
      RedisTTL.SESSION_DATA,
    );
    await this.redis.del(RedisKeys.sessionParticipants(pin));

    return { session, pin, totalQuestions: poll.questions.length };
  }

  // =============================================================
  // Cache-aside pattern: читаємо з Redis, при промаху — з MySQL.
  // Це усуває N+1 запити при обробці WS-подій у реальному часі.
  // =============================================================
  async getCachedSessionMeta(pin: string): Promise<CachedSessionMeta | null> {
    const cached = await this.redis.get(RedisKeys.sessionMeta(pin));
    if (cached) return JSON.parse(cached) as CachedSessionMeta;

    // Cache miss: читаємо з БД і заповнюємо кеш
    const session = await this.prisma.session.findUnique({
      where: { pin },
      include: { poll: { include: { _count: { select: { questions: true } } } } },
    });

    if (!session) return null;

    const meta: CachedSessionMeta = {
      id: session.id,
      pollId: session.pollId,
      organizerId: session.organizerId,
      progressionMode: session.progressionMode,
      status: session.status,
      currentQuestion: session.currentQuestion,
      totalQuestions: session.poll._count.questions,
      pollTitle: session.poll.title,
      pollDescription: session.poll.description ?? null,
    };

    await this.redis.set(RedisKeys.sessionMeta(pin), JSON.stringify(meta), 'EX', RedisTTL.SESSION_DATA);
    return meta;
  }

  async getSessionByPin(pin: string) {
    const session = await this.prisma.session.findUnique({
      where: { pin },
      include: {
        poll: {
          include: {
            questions: { include: { options: true }, orderBy: { order: 'asc' } },
          },
        },
      },
    });

    if (!session) throw new AppError(404, 'Session not found');
    return session;
  }

  // Оновлення статусу: записує в БД і синхронізує кеш
  async updateSessionStatus(pin: string, status: SessionStatus): Promise<void> {
    await this.prisma.session.update({ where: { pin }, data: { status } });
    await this.patchCachedMeta(pin, { status });
  }

  // Переключення питання в MANUAL режимі
  async advanceQuestion(pin: string, nextIndex: number): Promise<void> {
    await this.prisma.session.update({
      where: { pin },
      data: { currentQuestion: nextIndex },
    });
    await this.patchCachedMeta(pin, { currentQuestion: nextIndex });
  }

  // Атомарне оновлення окремих полів кешу без повного перезапису
  private async patchCachedMeta(pin: string, patch: Partial<CachedSessionMeta>): Promise<void> {
    const cached = await this.redis.get(RedisKeys.sessionMeta(pin));
    if (!cached) return;

    const meta = { ...JSON.parse(cached) as CachedSessionMeta, ...patch };
    await this.redis.set(RedisKeys.sessionMeta(pin), JSON.stringify(meta), 'EX', RedisTTL.SESSION_DATA);
  }

  async getSessionResults(sessionId: number) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        poll: {
          include: {
            questions: {
              include: { options: true },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!session) throw new AppError(404, 'Session not found');

    // Flush будь-яких залишкових Redis даних перед читанням з MySQL.
    // Потрібно для сесій, де організатор закрив вкладку без явного завершення.
    await this.flushPendingVotes(session.pin, session.poll.questions.map((q) => q.id));

    const results = await this.prisma.result.findMany({
      where: { sessionId },
      include: { participant: true },
      orderBy: { answeredAt: 'asc' },
    });

    // ─── Participants (leaderboard) ───────────────────────────
    const participantMap = new Map<string, {
      participantId: string;
      name: string;
      totalScore: number;
      answers: Array<{ questionId: number; optionIds: number[]; score: number }>;
    }>();

    for (const result of results) {
      if (!participantMap.has(result.participantId)) {
        participantMap.set(result.participantId, {
          participantId: result.participantId,
          name: result.participant.name,
          totalScore: 0,
          answers: [],
        });
      }
      const entry = participantMap.get(result.participantId)!;
      entry.totalScore += result.score;
      entry.answers.push({
        questionId: result.questionId,
        optionIds: result.optionIds as number[],
        score: result.score,
      });
    }

    const participants = Array.from(participantMap.values())
      .sort((a, b) => b.totalScore - a.totalScore);

    // ─── Questions summary (charts) ───────────────────────────
    const questionsSummary = session.poll.questions.map((question) => {
      const questionResults = results.filter((r) => r.questionId === question.id);

      const options = question.options.map((option) => {
        const voters = questionResults
          .filter((r) => (r.optionIds as number[]).includes(option.id))
          .map((r) => ({ participantId: r.participantId, name: r.participant.name }));

        return {
          optionId: option.id,
          optionText: option.text,
          isCorrect: option.isCorrect,
          points: option.points,
          count: voters.length,
          voters,
        };
      });

      return {
        questionId: question.id,
        questionText: question.text,
        questionType: question.type,
        questionPoints: question.points,
        options,
      };
    });

    return { participants, questionsSummary };
  }

  // Flush залишкових Redis голосів у MySQL (ідемпотентно через upsert).
  // Дублює логіку ResultService.flushQuestionResults, але SessionService
  // не має доступу до ResultService — щоб уникнути кругової залежності.
  private async flushPendingVotes(pin: string, questionIds: number[]): Promise<void> {
    await Promise.all(questionIds.map(async (questionId) => {
      const voteDataKey = RedisKeys.questionVoteData(pin, questionId);
      const rawData = await this.redis.hgetall(voteDataKey);
      const entries = Object.values(rawData);
      if (entries.length === 0) return;

      const pending = entries.map((d) => JSON.parse(d) as {
        sessionId: number; questionId: number; participantId: string; optionIds: number[]; score: number;
      });

      await this.prisma.$transaction(
        pending.map((r) =>
          this.prisma.result.upsert({
            where: { sessionId_questionId_participantId: { sessionId: r.sessionId, questionId: r.questionId, participantId: r.participantId } },
            create: { sessionId: r.sessionId, questionId: r.questionId, participantId: r.participantId, optionIds: r.optionIds, score: r.score },
            update: {},
          }),
        ),
      );

      await this.redis.del(voteDataKey);
    }));
  }

  async exportSessionResultsToExcel(pin: string, organizerId: number): Promise<Buffer> {
    const session = await this.prisma.session.findUnique({ where: { pin } });
    if (!session) throw new AppError(404, 'Session not found');
    if (session.organizerId !== organizerId) throw new AppError(403, 'Access denied');

    const { participants, questionsSummary } = await this.getSessionResults(session.id);
    const questions = questionsSummary;
    const sortedParticipants = [...participants].sort((a, b) => b.totalScore - a.totalScore);

    const wb = XLSX.utils.book_new();

    // ── Аркуш 1: Відповіді учасників ─────────────────────────────
    const sheet1Headers = [
      'Учасник',
      'Загальний бал',
      ...questions.map((q, i) => `Пит. ${i + 1}: ${q.questionText}`),
    ];

    const sheet1Rows = sortedParticipants.map((p) => {
      const cells = questions.map((q) => {
        const answer = p.answers.find((a) => a.questionId === q.questionId);
        if (!answer) return '—';
        const chosen = q.options.filter((o) =>
          (answer.optionIds as number[]).includes(o.optionId as unknown as number),
        );
        if (chosen.length === 0) return '—';
        return chosen.map((o) => o.optionText + (o.isCorrect ? ' ✓' : '')).join(', ');
      });
      return [p.name, p.totalScore, ...cells];
    });

    const ws1 = XLSX.utils.aoa_to_sheet([sheet1Headers, ...sheet1Rows]);
    ws1['!cols'] = [{ wch: 22 }, { wch: 14 }, ...questions.map(() => ({ wch: 35 }))];
    XLSX.utils.book_append_sheet(wb, ws1, 'Відповіді учасників');

    // ── Аркуш 2: Аналіз питань ───────────────────────────────────
    const sheet2Headers = ['№', 'Питання', 'Варіант відповіді', 'Правильна', 'Відповідей', '%', 'Хто відповів'];
    const sheet2Rows: (string | number)[][] = [];

    questions.forEach((q, i) => {
      const total = q.options.reduce((sum, o) => sum + o.count, 0);
      q.options.forEach((opt, j) => {
        const pct = total > 0 ? Math.round((opt.count / total) * 100) : 0;
        sheet2Rows.push([
          j === 0 ? i + 1 : '',
          j === 0 ? q.questionText : '',
          opt.optionText,
          opt.isCorrect ? 'Так ✓' : 'Ні',
          opt.count,
          `${pct}%`,
          opt.voters.map((v) => v.name).join(', '),
        ]);
      });
      if (i < questions.length - 1) sheet2Rows.push(['', '', '', '', '', '', '']);
    });

    const ws2 = XLSX.utils.aoa_to_sheet([sheet2Headers, ...sheet2Rows]);
    ws2['!cols'] = [
      { wch: 5 }, { wch: 38 }, { wch: 28 },
      { wch: 12 }, { wch: 12 }, { wch: 7 }, { wch: 45 },
    ];
    XLSX.utils.book_append_sheet(wb, ws2, 'Аналіз питань');

    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
  }

  async getOrganizerSessions(organizerId: number, query: SessionListQuery = {}) {
    const {
      search,
      dateFrom,
      dateTo,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      pageSize = 10,
    } = query;

    const where = {
      organizerId,
      ...(search ? { poll: { title: { contains: search } } } : {}),
      ...((dateFrom || dateTo) ? {
        createdAt: {
          ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
          ...(dateTo ? { lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999)) } : {}),
        },
      } : {}),
    };

    const orderBy =
      sortBy === 'participants' ? { participants: { _count: sortOrder as 'asc' | 'desc' } } :
                                  { createdAt: sortOrder as 'asc' | 'desc' };

    const [total, data] = await Promise.all([
      this.prisma.session.count({ where }),
      this.prisma.session.findMany({
        where,
        include: {
          poll: { select: { title: true } },
          _count: { select: { participants: true } },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }
}
