import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { PollController } from '../controllers/poll.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export function createPollRouter(prisma: PrismaClient): Router {
  const router = Router();
  const controller = new PollController(prisma);

  // Всі маршрути опитувань потребують автентифікації
  router.use(authMiddleware as any);

  router.post('/', controller.createPoll as any);
  router.get('/', controller.getPolls as any);
  router.get('/:id', controller.getPoll as any);
  router.put('/:id', controller.updatePoll as any);
  router.delete('/:id', controller.deletePoll as any);
  router.post('/:id/duplicate', controller.duplicatePoll as any);

  return router;
}
