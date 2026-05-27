// ─── Emit payloads ───────────────────────────────────────────────────────────

export interface JoinRoomPayload {
  pin: string;
  participantName: string;
  participantId?: string; // for reconnect
}

export interface StartSessionPayload {
  pin: string;
}

export interface SubmitVotePayload {
  pin: string;
  questionId: number;
  optionIds: number[];
}

export interface NextQuestionPayload {
  pin: string;
}

export interface EndSessionPayload {
  pin: string;
}

export interface JoinLobbyPayload {
  pin: string;
}

// ─── On payloads ─────────────────────────────────────────────────────────────

export interface RoomJoinedPayload {
  sessionId: number;
  pin: string;
  participantId: string;
  progressionMode: 'AUTO' | 'MANUAL';
  totalQuestions: number;
  pollTitle: string;
  pollDescription: string | null;
}

export interface ParticipantsUpdatedPayload {
  count: number;
}

export interface SessionStartedPayload {
  pin: string;
  progressionMode: 'AUTO' | 'MANUAL';
}

export interface QuestionActivePayload {
  id: number;
  text: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  questionNumber: number;
  totalQuestions: number;
  timeLimit: number | null;
  options: Array<{ id: number; text: string }>;
}

export interface VoteAcceptedPayload {
  questionId: number;
  score: number;
}

export interface ResultsUpdatedPayload {
  questionId: number;
  questionText: string;
  results: Array<{ optionId: number; optionText: string; count: number; percentage: number; voters: string[] }>;
  totalVotes: number;
  voterCount: number;
}

export interface UserFinishedPayload {
  totalScore: number;
  totalQuestions: number;
}

export interface SessionEndedPayload {
  pin: string;
}

export interface SocketErrorPayload {
  message: string;
}

// ─── Unified event map ───────────────────────────────────────────────────────

export interface ServerToClientEvents {
  room_joined: (payload: RoomJoinedPayload) => void;
  participants_updated: (payload: ParticipantsUpdatedPayload) => void;
  session_started: (payload: SessionStartedPayload) => void;
  question_active: (payload: QuestionActivePayload) => void;
  vote_accepted: (payload: VoteAcceptedPayload) => void;
  results_updated: (payload: ResultsUpdatedPayload) => void;
  user_finished: (payload: UserFinishedPayload) => void;
  session_ended: (payload: SessionEndedPayload) => void;
  error: (payload: SocketErrorPayload) => void;
}

export interface ClientToServerEvents {
  join_room: (payload: JoinRoomPayload) => void;
  join_lobby: (payload: JoinLobbyPayload) => void;
  start_session: (payload: StartSessionPayload) => void;
  submit_vote: (payload: SubmitVotePayload) => void;
  next_question: (payload: NextQuestionPayload) => void;
  end_session: (payload: EndSessionPayload) => void;
}
