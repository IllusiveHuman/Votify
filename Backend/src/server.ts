import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { createApp } from './app';
import { getRedisClient } from './config/redis';
import { env } from './config/env';
import { PollGateway } from './gateways/poll.gateway';

// =============================================================
// Точка входу застосунку.
//
// Порядок ініціалізації (порушення порядку = помилки при старті):
// 1. Prisma client (підключення до MySQL)
// 2. Redis client (підключення до Redis)
// 3. Express application (HTTP layer)
// 4. HTTP server (обгортка для Socket.io)
// 5. Socket.io server (прив'язка до HTTP server)
// 6. PollGateway (реєстрація WS обробників)
// 7. Слухаємо порт
//
// Graceful shutdown: при SIGTERM/SIGINT закриваємо з'єднання
// до БД та Redis перед виходом — запобігаємо втраті даних.
// =============================================================

async function bootstrap(): Promise<void> {
  const prisma = new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

  const redis = getRedisClient();
  const app = createApp(prisma, redis);
  const httpServer = createServer(app);

  // Socket.io поверх того самого HTTP сервера — спільний порт для HTTP і WS
  const io = new Server(httpServer, {
    cors: {
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 30_000,  // Час очікування pong перед disconnect
    pingInterval: 10_000, // Частота ping для виявлення мертвих з'єднань
  });

  // Ініціалізація WebSocket gateway — реєструє обробники для io.on('connection')
  new PollGateway(io, prisma, redis);

  // Graceful shutdown — обробляємо системні сигнали
  const shutdown = async (): Promise<void> => {
    console.log('[Server] Shutting down gracefully...');
    await prisma.$disconnect();
    redis.disconnect();
    httpServer.close(() => {
      console.log('[Server] HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  httpServer.listen(env.PORT, () => {
    console.log(`[Server] Running on port ${env.PORT} (${env.NODE_ENV})`);
  });
}

bootstrap().catch((err: unknown) => {
  console.error('[Server] Failed to start:', err);
  process.exit(1);
});
