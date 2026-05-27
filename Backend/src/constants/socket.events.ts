export const ClientEvents = {
  JOIN_ROOM: "join_room",
  START_SESSION: "start_session",
  SUBMIT_VOTE: "submit_vote",
  NEXT_QUESTION: "next_question",
  END_SESSION: "end_session",
  JOIN_LOBBY: "join_lobby",
  DISCONNECT: "disconnect",
} as const;

export const ServerEvents = {
  ROOM_JOINED: "room_joined",
  SESSION_STARTED: "session_started",
  QUESTION_ACTIVE: "question_active",
  VOTE_ACCEPTED: "vote_accepted",
  RESULTS_UPDATED: "results_updated",
  USER_FINISHED: "user_finished",
  SESSION_ENDED: "session_ended",
  PARTICIPANTS_UPDATED: "participants_updated",
  ERROR: "error",
} as const;
