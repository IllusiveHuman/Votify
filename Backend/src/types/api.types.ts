import { Request } from 'express';

// Розширений Request з даними автентифікованого організатора
export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}

// Уніфікована обгортка відповіді REST API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── DTO (Data Transfer Objects) ─────────────────────────────

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface CreatePollDto {
  title: string;
  description?: string;
  progressionMode?: 'MANUAL' | 'AUTO';
  questions: Array<{
    text: string;
    timeLimit?: number | null;
    type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
    order: number;
    points?: number;
    options: Array<{
      text: string;
      isCorrect: boolean;
      points?: number;
    }>;
  }>;
}

export interface CreateSessionDto {
  pollId: number;
  progressionMode: 'MANUAL' | 'AUTO';
}

export interface PollListQuery {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'createdAt' | 'questions' | 'sessions';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface SessionListQuery {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'createdAt' | 'participants';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
