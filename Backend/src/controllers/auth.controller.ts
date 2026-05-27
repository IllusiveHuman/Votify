import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/auth.service';
import type { AuthenticatedRequest } from '../types/api.types';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export class AuthController {
  private readonly authService: AuthService;

  constructor(prisma: PrismaClient) {
    this.authService = new AuthService(prisma);
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = registerSchema.parse(req.body);
      const result = await this.authService.register(dto);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = loginSchema.parse(req.body);
      const result = await this.authService.login(dto);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = changePasswordSchema.parse(req.body);
      const { user } = req as AuthenticatedRequest;
      await this.authService.changePassword(user.id, dto);
      res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  };
}
