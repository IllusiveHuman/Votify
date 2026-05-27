import rateLimit from 'express-rate-limit';
import { Socket } from 'socket.io';
import { env } from '../config/env';
import { getRedisClient, RedisKeys, RedisTTL } from '../config/redis';

// ─── REST API Rate Limiter ────────────────────────────────────
export const restRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later' },
});

// Суворіший ліміт для auth — захист від brute-force атак
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many auth attempts, please try again later' },
});

// =============================================================
// WebSocket Rate Limiter через Redis.
//
// Чому не express-rate-limit: він не підтримує WS.
// Рішення: Redis INCR + EXPIRE — атомарний лічильник подій.
// Перевага: горизонтальне масштабування (всі інстанси бачать один лічильник).
//
// Алгоритм:
// 1. INCR key → count
// 2. Якщо count == 1 → EXPIRE key 1 (нове вікно)
// 3. count > MAX → reject
// =============================================================
export async function checkWsRateLimit(socket: Socket): Promise<boolean> {
  const redis = getRedisClient();
  const key = RedisKeys.wsRateLimit(socket.id);

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, RedisTTL.RATE_LIMIT);
  }

  return count <= env.WS_RATE_LIMIT_MAX_EVENTS;
}
