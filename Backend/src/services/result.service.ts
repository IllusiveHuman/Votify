import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';
import { RedisKeys, RedisTTL } from '../config/redis';
import { ResultsUpdatedResponse } from '../types/socket.types';

// Структура запису в Redis перед flush у MySQL
interface PendingResult {
  sessionId: number;
  questionId: number;
  participantId: string;
  optionIds: number[];
  score: number;
}

export class ResultService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly redis: Redis,
  ) {}

  // =============================================================
  // accumulateVote — буферизація голосу в Redis.
  //
  // Thundering Herd Prevention:
  // При 500+ одночасних відповідях пряма запис у MySQL спричиняє
  // шторм запитів (connection pool overflow, lock contention).
  //
  // Рішення — 2 Redis Hash на питання:
  // [1] questionVoteCount: { "option:{id}": count } — агрегація для UI
  // [2] questionVoteData:  { "{participantId}": JSON } — дані для flush
  //
  // MySQL отримує дані лише при переключенні питання або завершенні сесії
  // (batch upsert), тобто 1 запит замість N.
  //
  // Використовуємо pipeline для атомарного відправлення команд
  // (мінімізуємо round-trips до Redis).
  // =============================================================
  async accumulateVote(
    pin: string,
    sessionId: number,
    questionId: number,
    participantId: string,
    optionIds: number[],
    score: number,
  ): Promise<void> {
    const pipeline = this.redis.pipeline();

    // 1. Інкременти лічильників для real-time агрегації
    const voteCountKey = RedisKeys.questionVoteCount(pin, questionId);
    for (const optionId of optionIds) {
      pipeline.hincrby(voteCountKey, `option:${optionId}`, 1);
    }
    pipeline.expire(voteCountKey, RedisTTL.SESSION_DATA);

    // 2. Сирі дані для real-time відображення імен виборців
    const voteDataKey = RedisKeys.questionVoteData(pin, questionId);
    const record: PendingResult = { sessionId, questionId, participantId, optionIds, score };
    pipeline.hset(voteDataKey, participantId, JSON.stringify(record));
    pipeline.expire(voteDataKey, RedisTTL.SESSION_DATA);

    await pipeline.exec();

    // 3. Одразу зберігаємо в MySQL як джерело правди.
    // Захищає від втрати даних якщо сесія не завершується явно
    // (організатор закрив вкладку) і Redis TTL спливає через 24 год.
    await this.prisma.result.upsert({
      where: {
        sessionId_questionId_participantId: { sessionId, questionId, participantId },
      },
      create: { sessionId, questionId, participantId, optionIds, score },
      update: {},
    });
  }

  // =============================================================
  // getAggregatedResults — real-time агрегація для організатора.
  //
  // Читаємо лічильники з Redis Hash (O(1) на опцію).
  // Набагато швидше ніж COUNT(*) GROUP BY у MySQL під навантаженням.
  // =============================================================
  async getAggregatedResults(
    pin: string,
    questionId: number,
    options: Array<{ id: number; text: string }>,
    questionText: string,
  ): Promise<ResultsUpdatedResponse> {
    const voteCountKey = RedisKeys.questionVoteCount(pin, questionId);
    const voteDataKey = RedisKeys.questionVoteData(pin, questionId);

    const [rawCounts, rawVotes] = await Promise.all([
      this.redis.hgetall(voteCountKey),
      this.redis.hgetall(voteDataKey),
    ]);

    // participantId → optionIds
    const voterChoices = new Map<string, number[]>();
    for (const [participantId, json] of Object.entries(rawVotes)) {
      const record = JSON.parse(json) as PendingResult;
      voterChoices.set(participantId, record.optionIds);
    }

    // Fetch participant names from Redis in a single pipeline
    const participantIds = Array.from(voterChoices.keys());
    const nameMap = new Map<string, string>();
    if (participantIds.length > 0) {
      const pipeline = this.redis.pipeline();
      for (const pId of participantIds) {
        pipeline.hget(RedisKeys.participantProgress(pin, pId), 'name');
      }
      const pipelineResults = await pipeline.exec();
      pipelineResults?.forEach(([, name], idx) => {
        if (name) nameMap.set(participantIds[idx], name as string);
      });
    }

    // optionId → voter names
    const optionVoters = new Map<number, string[]>();
    for (const [participantId, optionIds] of voterChoices.entries()) {
      const name = nameMap.get(participantId) ?? participantId;
      for (const optionId of optionIds) {
        if (!optionVoters.has(optionId)) optionVoters.set(optionId, []);
        optionVoters.get(optionId)!.push(name);
      }
    }

    // Build counts from voteCount hash
    const countMap = new Map<number, number>();
    let totalVotes = 0;
    for (const [field, count] of Object.entries(rawCounts)) {
      const optionId = parseInt(field.replace('option:', ''));
      const voteCount = parseInt(count);
      countMap.set(optionId, voteCount);
      totalVotes += voteCount;
    }

    const results = options.map((option) => {
      const count = countMap.get(option.id) ?? 0;
      return {
        optionId: option.id,
        optionText: option.text,
        count,
        percentage: totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0,
        voters: optionVoters.get(option.id) ?? [],
      };
    });

    return { questionId, questionText, results, totalVotes, voterCount: participantIds.length };
  }

  // =============================================================
  // flushQuestionResults — batch flush Redis → MySQL.
  //
  // Ідемпотентна операція (upsert з порожнім update):
  // повторний flush не дублює записи, якщо він вже виконувався.
  //
  // Порядок: читаємо Redis → batch upsert → видаляємо з Redis.
  // Якщо MySQL транзакція падає — Redis дані залишаються для retry.
  // =============================================================
  async flushQuestionResults(pin: string, questionId: number): Promise<void> {
    const voteDataKey = RedisKeys.questionVoteData(pin, questionId);
    const rawData = await this.redis.hgetall(voteDataKey);

    const entries = Object.values(rawData);
    if (entries.length === 0) return;

    const pendingResults: PendingResult[] = entries.map((d) => JSON.parse(d) as PendingResult);

    await this.prisma.$transaction(
      pendingResults.map((result) =>
        this.prisma.result.upsert({
          where: {
            sessionId_questionId_participantId: {
              sessionId: result.sessionId,
              questionId: result.questionId,
              participantId: result.participantId,
            },
          },
          create: {
            sessionId: result.sessionId,
            questionId: result.questionId,
            participantId: result.participantId,
            optionIds: result.optionIds,
            score: result.score,
          },
          update: {}, // Ідемпотентність: не перезаписуємо наявний запис
        }),
      ),
    );

    // Видаляємо з Redis тільки після підтвердженого запису в MySQL
    await this.redis.del(voteDataKey);
  }

  async flushAllSessionResults(pin: string, questionIds: number[]): Promise<void> {
    await Promise.all(questionIds.map((qId) => this.flushQuestionResults(pin, qId)));
  }

  // Перевірка дублікату — захист від повторного голосування
  async hasParticipantVoted(pin: string, questionId: number, participantId: string): Promise<boolean> {
    const key = RedisKeys.questionVoteData(pin, questionId);
    return (await this.redis.hexists(key, participantId)) === 1;
  }
}
