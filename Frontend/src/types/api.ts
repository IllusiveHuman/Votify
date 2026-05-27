// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  data: { token: string; user: AuthUser };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

// ─── Polls ───────────────────────────────────────────────────────────────────

export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';

export interface OptionInput {
  text: string;
  isCorrect: boolean;
  points?: number;
}

export interface QuestionInput {
  text: string;
  timeLimit?: number;
  type: QuestionType;
  order: number;
  points?: number;
  options: OptionInput[];
}

export interface CreatePollBody {
  title: string;
  description?: string;
  progressionMode?: ProgressionMode;
  questions: QuestionInput[];
}

export interface PollListItem {
  id: string;
  title: string;
  description?: string;
  progressionMode: ProgressionMode;
  createdAt: string;
  _count: { questions: number; sessions: number };
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

export interface PollListResponse {
  success: boolean;
  data: PollListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
  points: number;
}

export interface Question {
  id: string;
  text: string;
  timeLimit?: number | null;
  type: QuestionType;
  order: number;
  points: number;
  options: Option[];
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  progressionMode: ProgressionMode;
  createdAt: string;
  questions: Question[];
  _count?: { sessions: number };
}

export interface PollResponse {
  success: boolean;
  data: Poll;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

// ─── Sessions ────────────────────────────────────────────────────────────────

export type SessionStatus = 'WAITING' | 'ACTIVE' | 'FINISHED';
export type ProgressionMode = 'AUTO' | 'MANUAL';

export interface CreateSessionBody {
  pollId: string;
  progressionMode: ProgressionMode;
}

export interface SessionCreated {
  id: string;
  pin: string;
  status: SessionStatus;
}

export interface CreateSessionResponse {
  success: boolean;
  data: { session: SessionCreated; pin: string; totalQuestions: number };
}

export interface SessionListItem {
  id: string;
  pin: string;
  status: SessionStatus;
  progressionMode: ProgressionMode;
  createdAt: string;
  poll: { title: string };
  _count: { participants: number };
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

export interface SessionListResponse {
  success: boolean;
  data: SessionListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Results ─────────────────────────────────────────────────────────────────

export interface ParticipantAnswer {
  questionId: string;
  optionIds: string[];
  score: number;
}

export interface ParticipantResult {
  participantId: string;
  name: string;
  totalScore: number;
  answers: ParticipantAnswer[];
}

export interface OptionSummary {
  optionId: string;
  optionText: string;
  isCorrect: boolean;
  points: number;
  count: number;
  voters: { participantId: string; name: string }[];
}

export interface QuestionSummary {
  questionId: string;
  questionText: string;
  questionType: QuestionType;
  questionPoints: number;
  options: OptionSummary[];
}

export interface SessionResults {
  participants: ParticipantResult[];
  questionsSummary: QuestionSummary[];
}

export interface SessionResultsResponse {
  success: boolean;
  data: SessionResults;
}
