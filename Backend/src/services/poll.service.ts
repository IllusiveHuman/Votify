import { PrismaClient, ProgressionMode } from '@prisma/client';
import { AppError } from '../middleware/errorHandler.middleware';
import { CreatePollDto, PollListQuery } from '../types/api.types';

export class PollService {
  constructor(private readonly prisma: PrismaClient) {}

  // Транзакція: атомарне створення poll + questions + options
  async createPoll(organizerId: number, dto: CreatePollDto) {
    return this.prisma.$transaction(async (tx) => {
      return tx.poll.create({
        data: {
          title: dto.title,
          description: dto.description,
          progressionMode: (dto.progressionMode ?? 'AUTO') as ProgressionMode,
          organizerId,
          questions: {
            create: dto.questions.map((q) => ({
              text: q.text,
              timeLimit: q.timeLimit ?? null,
              type: q.type,
              order: q.order,
              points: q.points ?? 100,
              options: {
                create: q.options.map((o) => ({
                  text: o.text,
                  isCorrect: o.isCorrect,
                  points: o.points ?? 100,
                })),
              },
            })),
          },
        },
        include: {
          questions: {
            include: { options: true },
            orderBy: { order: 'asc' },
          },
        },
      });
    });
  }

  async getPollById(pollId: number, organizerId: number) {
    const poll = await this.prisma.poll.findFirst({
      where: { id: pollId, organizerId },
      include: {
        questions: {
          include: { options: true },
          orderBy: { order: 'asc' },
        },
        _count: { select: { sessions: true } },
      },
    });

    if (!poll) throw new AppError(404, 'Poll not found');
    return poll;
  }

  async getAllPolls(organizerId: number, query: PollListQuery = {}) {
    const {
      search,
      dateFrom,
      dateTo,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      pageSize = 10,
    } = query;

    const where = {
      organizerId,
      ...(search ? { title: { contains: search } } : {}),
      ...((dateFrom || dateTo) ? {
        createdAt: {
          ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
          ...(dateTo ? { lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999)) } : {}),
        },
      } : {}),
    };

    const orderBy =
      sortBy === 'questions' ? { questions: { _count: sortOrder as 'asc' | 'desc' } } :
      sortBy === 'sessions'  ? { sessions:  { _count: sortOrder as 'asc' | 'desc' } } :
                               { createdAt: sortOrder as 'asc' | 'desc' };

    const [total, data] = await Promise.all([
      this.prisma.poll.count({ where }),
      this.prisma.poll.findMany({
        where,
        include: { _count: { select: { questions: true, sessions: true } } },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async updatePoll(pollId: number, organizerId: number, dto: CreatePollDto) {
    const poll = await this.prisma.poll.findFirst({ where: { id: pollId, organizerId } });
    if (!poll) throw new AppError(404, 'Poll not found');

    const sessionCount = await this.prisma.session.count({ where: { pollId } });
    if (sessionCount > 0) {
      throw new AppError(409, 'Cannot edit a poll that already has sessions. Duplicate it to create a new version.');
    }

    return this.prisma.$transaction(async (tx) => {
      // Load existing questions with options, sorted by id for stable option matching
      const existingQuestions = await tx.question.findMany({
        where: { pollId },
        include: { options: { orderBy: { id: 'asc' } } },
      });

      const existingByOrder = new Map(existingQuestions.map((q) => [q.order, q]));
      const newOrders = new Set(dto.questions.map((q) => q.order));

      // Delete questions whose order is no longer present — cascades to their Results
      const idsToDelete = existingQuestions
        .filter((q) => !newOrders.has(q.order))
        .map((q) => q.id);
      if (idsToDelete.length > 0) {
        await tx.question.deleteMany({ where: { id: { in: idsToDelete } } });
      }

      // Upsert each question by order to preserve IDs (and thus existing Results)
      for (const newQ of dto.questions) {
        const existing = existingByOrder.get(newQ.order);

        if (existing) {
          // Update question metadata in-place — keeps its ID so Results survive
          await tx.question.update({
            where: { id: existing.id },
            data: {
              text: newQ.text,
              timeLimit: newQ.timeLimit ?? null,
              type: newQ.type,
              order: newQ.order,
              points: newQ.points ?? 100,
            },
          });

          // Sync options by position index
          for (let i = 0; i < newQ.options.length; i++) {
            if (i < existing.options.length) {
              await tx.option.update({
                where: { id: existing.options[i].id },
                data: {
                  text: newQ.options[i].text,
                  isCorrect: newQ.options[i].isCorrect,
                  points: newQ.options[i].points ?? 100,
                },
              });
            } else {
              await tx.option.create({
                data: {
                  text: newQ.options[i].text,
                  isCorrect: newQ.options[i].isCorrect,
                  points: newQ.options[i].points ?? 100,
                  questionId: existing.id,
                },
              });
            }
          }

          // Remove surplus options (user deleted some)
          if (existing.options.length > newQ.options.length) {
            const surplusIds = existing.options.slice(newQ.options.length).map((o) => o.id);
            await tx.option.deleteMany({ where: { id: { in: surplusIds } } });
          }
        } else {
          // Brand-new question — create with options
          await tx.question.create({
            data: {
              text: newQ.text,
              timeLimit: newQ.timeLimit ?? null,
              type: newQ.type,
              order: newQ.order,
              points: newQ.points ?? 100,
              pollId,
              options: {
                create: newQ.options.map((o) => ({
                  text: o.text,
                  isCorrect: o.isCorrect,
                  points: o.points ?? 100,
                })),
              },
            },
          });
        }
      }

      return tx.poll.update({
        where: { id: pollId },
        data: {
          title: dto.title,
          description: dto.description,
          progressionMode: (dto.progressionMode ?? 'AUTO') as ProgressionMode,
        },
        include: {
          questions: {
            include: { options: true },
            orderBy: { order: 'asc' },
          },
        },
      });
    });
  }

  async deletePoll(pollId: number, organizerId: number) {
    const poll = await this.prisma.poll.findFirst({ where: { id: pollId, organizerId } });
    if (!poll) throw new AppError(404, 'Poll not found');

    await this.prisma.$transaction(async (tx) => {
      // Sessions reference Poll without onDelete cascade — delete them first.
      // Deleting sessions cascades to their Results and SessionParticipants.
      await tx.session.deleteMany({ where: { pollId } });
      await tx.poll.delete({ where: { id: pollId } });
    });
  }

  async duplicatePoll(pollId: number, organizerId: number) {
    const original = await this.prisma.poll.findFirst({
      where: { id: pollId, organizerId },
      include: {
        questions: {
          include: { options: true },
          orderBy: { order: 'asc' },
        },
      },
    });
    if (!original) throw new AppError(404, 'Poll not found');

    return this.prisma.poll.create({
      data: {
        title: `${original.title} (копія)`,
        description: original.description,
        progressionMode: original.progressionMode,
        organizerId,
        questions: {
          create: original.questions.map((q) => ({
            text: q.text,
            timeLimit: q.timeLimit,
            type: q.type,
            order: q.order,
            points: q.points,
            options: {
              create: q.options.map((o) => ({
                text: o.text,
                isCorrect: o.isCorrect,
                points: o.points,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: { options: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }
}
