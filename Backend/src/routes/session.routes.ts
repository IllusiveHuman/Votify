import { Router } from 'express';
import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';
import { SessionController } from '../controllers/session.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export function createSessionRouter(prisma: PrismaClient, redis: Redis): Router {
  const router = Router();
  const controller = new SessionController(prisma, redis);

  router.use(authMiddleware as any);

  router.post('/', controller.createSession as any);
  router.get('/', controller.getSessions as any);
  router.get('/:pin/results', controller.getSessionResults as any);
  router.get('/:pin/results/export', controller.exportResults as any);

  return router;
}
