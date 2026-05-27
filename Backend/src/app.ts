import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';
import { restRateLimiter } from './middleware/rateLimiter.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';
import { createAuthRouter } from './routes/auth.routes';
import { createPollRouter } from './routes/poll.routes';
import { createSessionRouter } from './routes/session.routes';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';

export function createApp(prisma: PrismaClient, redis: Redis): express.Application {
  const app = express();

  // Swagger UI — до helmet, щоб не блокувати inline стилі/скрипти Swagger
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Votify API Docs',
    swaggerOptions: { persistAuthorization: true },
  }));

  // Security: стандартні HTTP headers
  app.use(helmet());

  app.use(cors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Обмеження розміру body — захист від payload flooding
  app.use(express.json({ limit: '10kb' }));
  app.use(restRateLimiter);

  // ─── REST маршрути ────────────────────────────────────────
  app.use('/api/auth', createAuthRouter(prisma));
  app.use('/api/polls', createPollRouter(prisma));
  app.use('/api/sessions', createSessionRouter(prisma, redis));

  // Health check для load balancer / Docker healthcheck
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Глобальний обробник помилок — завжди останній
  app.use(errorHandler);

  return app;
}
