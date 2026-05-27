import { z } from 'zod';
import 'dotenv/config';

// =============================================================
// Валідація змінних середовища при старті (fail-fast підхід).
// Якщо будь-яка обов'язкова змінна відсутня або невалідна —
// застосунок падає з чітким повідомленням, а не в рантаймі.
// =============================================================

const envSchema = z.object({
  PORT: z.string().default('3000').transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('*'),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379').transform(Number),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.string().default('0').transform(Number),

  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform(Number),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100').transform(Number),
  WS_RATE_LIMIT_MAX_EVENTS: z.string().default('20').transform(Number),
  WS_RATE_LIMIT_WINDOW_MS: z.string().default('1000').transform(Number),
});

export type Env = z.infer<typeof envSchema>;

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('Invalid environment variables:', parseResult.error.format());
  process.exit(1);
}

export const env = parseResult.data;
