import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { PollService } from '../services/poll.service';
import { AuthenticatedRequest } from '../types/api.types';

const optionSchema = z.object({
  text: z.string().min(1).max(500),
  isCorrect: z.boolean(),
  points: z.number().int().min(1).max(10000).optional(),
});

const questionSchema = z.object({
  text: z.string().min(1),
  timeLimit: z.number().int().min(5).max(300).nullish(),
  type: z.enum(['SINGLE_CHOICE', 'MULTIPLE_CHOICE']),
  order: z.number().int().min(0),
  points: z.number().int().min(1).max(10000).optional(),
  options: z.array(optionSchema).min(2).max(10),
});

const createPollSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  progressionMode: z.enum(['MANUAL', 'AUTO']).optional(),
  questions: z.array(questionSchema).min(1).max(50),
});

const pollListQuerySchema = z.object({
  search:    z.string().optional(),
  dateFrom:  z.string().optional(),
  dateTo:    z.string().optional(),
  sortBy:    z.enum(['createdAt', 'questions', 'sessions']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page:      z.coerce.number().int().positive().optional(),
  pageSize:  z.coerce.number().int().positive().max(100).optional(),
});

export class PollController {
  private readonly pollService: PollService;

  constructor(prisma: PrismaClient) {
    this.pollService = new PollService(prisma);
  }

  createPoll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = createPollSchema.parse(req.body);
      const poll = await this.pollService.createPoll(req.user.id, dto);
      res.status(201).json({ success: true, data: poll });
    } catch (error) {
      next(error);
    }
  };

  getPoll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const poll = await this.pollService.getPollById(Number(req.params.id), req.user.id);
      res.json({ success: true, data: poll });
    } catch (error) {
      next(error);
    }
  };

  getPolls = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = pollListQuerySchema.parse(req.query);
      const result = await this.pollService.getAllPolls(req.user.id, query);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  updatePoll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = createPollSchema.parse(req.body);
      const poll = await this.pollService.updatePoll(Number(req.params.id), req.user.id, dto);
      res.json({ success: true, data: poll });
    } catch (error) {
      next(error);
    }
  };

  deletePoll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.pollService.deletePoll(Number(req.params.id), req.user.id);
      res.json({ success: true, message: 'Poll deleted' });
    } catch (error) {
      next(error);
    }
  };

  duplicatePoll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const poll = await this.pollService.duplicatePoll(Number(req.params.id), req.user.id);
      res.status(201).json({ success: true, data: poll });
    } catch (error) {
      next(error);
    }
  };
}
