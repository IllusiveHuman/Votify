import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthController } from '../controllers/auth.controller';
import { authRateLimiter } from '../middleware/rateLimiter.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

export function createAuthRouter(prisma: PrismaClient): Router {
  const router = Router();
  const controller = new AuthController(prisma);

  router.post('/register', authRateLimiter, controller.register);
  router.post('/login', authRateLimiter, controller.login);
  router.put('/change-password', authMiddleware, controller.changePassword);

  return router;
}
