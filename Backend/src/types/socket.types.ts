// =============================================================
// Типи WebSocket подій — контракт між клієнтом і сервером.
// Суворе типізування запобігає помилкам при рефакторингу.
// =============================================================

// ─── Payload від клієнта до сервера ──────────────────────────

export interface JoinRoomPayload {
  pin: string;
  participantName: string;
  // UUID для відновлення прогресу після перепідключення.
  // Клієнт зберігає його в localStorage і передає при реконнекті.
  participantId?: string;
}

export interface SubmitVotePayload {
  pin: string;
  questionId: number;
  // Масив ID варіантів. Для SINGLE_CHOICE завжди [id], для MULTIPLE_CHOICE — [id, id, ...]
  optionIds: number[];
}

export interface NextQuestionPayload {
  pin: string; // Організатор вказує PIN кімнати
}

export interface StartSessionPayload {
  pin: string;
}

export interface EndSessionPayload {
  pin: string;
}

export interface JoinLobbyPayload {
  pin: string;
}

// ─── Payload від сервера до клієнта ──────────────────────────

export interface RoomJoinedResponse {
  sessionId: number;
  pin: string;
  participantId: string; // Повертаємо UUID — клієнт зберігає для реконнекту
  progressionMode: 'MANUAL' | 'AUTO';
  totalQuestions: number;
  pollTitle: string;
  pollDescription: string | null;
}

export interface QuestionActiveResponse {
  id: number;
  text: string;
  timeLimit: number | null; // секунди, null = без ліміту
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  // ВАЖЛИВО: isCorrect не включається — серверна валідація
  options: Array<{ id: number; text: string }>;
  questionNumber: number;  // 1-based для UI
  totalQuestions: number;
}

export interface VoteAcceptedResponse {
  questionId: number;
  score: number; // 0–100 — скільки балів нараховано
}

export interface ResultsUpdatedResponse {
  questionId: number;
  questionText: string;
  results: Array<{
    optionId: number;
    optionText: string;
    count: number;
    percentage: number; // 0–100
    voters: string[];   // імена учасників, що обрали цей варіант
  }>;
  totalVotes: number;
  voterCount: number;   // кількість унікальних учасників, що відповіли
}

export interface ParticipantCompletedResponse {
  message: string;
  totalScore: number;
  totalQuestions: number;
}

export interface ErrorResponse {
  message: string;
  code: string;
}

// ─── Дані в socket.data ───────────────────────────────────────
// Зберігаються протягом lifecycle з'єднання.
// Доступні в будь-якому обробнику через socket.data.
export interface SocketData {
  participantId: string;
  participantName: string;
  currentPin?: string;
  isOrganizer: boolean;
  organizerId?: number;
}
