import Redis from 'ioredis';
import { env } from './env';

// =============================================================
// Redis Client — Singleton pattern.
//
// Відповідальності Redis у цьому проєкті:
// 1. Буферизація голосів (Thundering Herd Protection)
// 2. Прогрес учасників у AUTO режимі
// 3. Rate limiting для WebSocket
// 4. Кеш метаданих сесій (cache-aside pattern)
// =============================================================

let client: Redis | null = null;

export function getRedisClient(): Redis {
  if (!client) {
    client = new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD ?? undefined,
      db: env.REDIS_DB,
      // Exponential backoff: 100ms → 200ms → 400ms → … → 3s
      retryStrategy: (times: number) => Math.min(times * 100, 3000),
      lazyConnect: false,
      enableReadyCheck: true,
    });

    client.on('error', (err) => console.error('[Redis] Error:', err.message));
    client.on('connect', () => console.log('[Redis] Connected'));
    client.on('reconnecting', () => console.log('[Redis] Reconnecting...'));
  }

  return client;
}

// =============================================================
// Типізований простір імен Redis ключів.
// Централізоване визначення запобігає конфліктам ключів
// і спрощує дебагінг через redis-cli.
//
// Конвенція: {entity}:{scope}:{identifier}:{field}
// =============================================================
export const RedisKeys = {
  // SET: socket ID-и активних учасників кімнати
  sessionParticipants: (pin: string) =>
    `session:${pin}:participants`,

  // HASH: { name, questionIndex, totalScore, joinedAt }
  participantProgress: (pin: string, participantId: string) =>
    `participant:${pin}:${participantId}:progress`,

  // HASH: { "option:{id}": count } — агрегований лічильник голосів
  questionVoteCount: (pin: string, questionId: number) =>
    `session:${pin}:q:${questionId}:votes`,

  // HASH: { "{participantId}": JSON(PendingResult) } — сирі дані для flush у MySQL
  questionVoteData: (pin: string, questionId: number) =>
    `session:${pin}:q:${questionId}:data`,

  // STRING (JSON): кешовані метадані сесії
  sessionMeta: (pin: string) =>
    `session:${pin}:meta`,

  // STRING (counter): лічильник подій для WS rate limiting
  wsRateLimit: (socketId: string) =>
    `ws:rate:${socketId}`,
} as const;

// TTL у секундах
export const RedisTTL = {
  SESSION_DATA: 86_400, // 24 год — сесія не може тривати довше
  PARTICIPANT: 3_600,   // 1 год — прогрес після disconnect
  RATE_LIMIT: 1,        // 1 с — вікно WS rate limiting
} as const;
