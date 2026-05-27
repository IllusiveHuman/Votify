import { Response, NextFunction } from 'express';
import { z } from 'zod';
import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';
import { SessionService } from '../services/session.service';
import { AuthenticatedRequest } from '../types/api.types';

const createSessionSchema = z.object({
  pollId: z.number().int().positive(),
  progressionMode: z.enum(['MANUAL', 'AUTO']),
});

const sessionListQuerySchema = z.object({
  search:    z.string().optional(),
  dateFrom:  z.string().optional(),
  dateTo:    z.string().optional(),
  sortBy:    z.enum(['createdAt', 'participants']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page:      z.coerce.number().int().positive().optional(),
  pageSize:  z.coerce.number().int().positive().max(100).optional(),
});

export class SessionController {
  private readonly sessionService: SessionService;

  constructor(prisma: PrismaClient, redis: Redis) {
    this.sessionService = new SessionService(prisma, redis);
  }

  createSession = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = createSessionSchema.parse(req.body);
      const result = await this.sessionService.createSession(req.user.id, dto);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  getSessions = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = sessionListQuerySchema.parse(req.query);
      const result = await this.sessionService.getOrganizerSessions(req.user.id, query);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getSessionResults = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pin = Array.isArray(req.params.pin) ? req.params.pin[0] : (req.params.pin ?? '');
      const session = await this.sessionService.getSessionByPin(pin);
      if (session.organizerId !== req.user.id) {
        res.status(403).json({ success: false, error: 'Access denied' });
        return;
      }
      const results = await this.sessionService.getSessionResults(session.id);
      res.json({ success: true, data: results });
    } catch (error) {
      next(error);
    }
  };

  exportResults = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pin = Array.isArray(req.params.pin) ? req.params.pin[0] : (req.params.pin ?? '');
      const buffer = await this.sessionService.exportSessionResultsToExcel(pin, req.user.id);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="Votify_${pin}.xlsx"`);
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };
}
