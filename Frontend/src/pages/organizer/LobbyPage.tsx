import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useSocket } from '../../context/SocketContext';
import type {
  ParticipantsUpdatedPayload,
  SessionStartedPayload,
  QuestionActivePayload,
  ResultsUpdatedPayload,
} from '../../types/socket';
import textData from '../../locales/ua.json';
import Spinner from '../../components/Spinner';
import OrganizerNav from '../../components/OrganizerNav';
import { ArrowRight, Users, Zap, ChevronRight } from 'lucide-react';

const MAX_AVATARS = 12;

function VoterAvatars({ names }: { names: string[] }) {
  const visible = names.slice(0, MAX_AVATARS);
  const overflow = names.length - MAX_AVATARS;
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {visible.map((name) => (
        <span
          key={name}
          title={name}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white"
        >
          {name.charAt(0).toUpperCase()}
        </span>
      ))}
      {overflow > 0 && (
        <span className="flex h-6 items-center rounded-full bg-gray-200 px-1.5 text-[10px] font-semibold text-gray-600 dark:bg-slate-600 dark:text-slate-300">
          +{overflow}
        </span>
      )}
    </div>
  );
}

function AnswerRing({ answered, total }: { answered: number; total: number }) {
  const r = 28;
  const sw = 6;
  const dim = 72;
  const center = 36;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? Math.min(answered / total, 1) : 0;
  const offset = circ * (1 - pct);
  const allDone = total > 0 && answered >= total;

  return (
    <div className="relative shrink-0" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
        <circle
          cx={center} cy={center} r={r}
          fill="none" strokeWidth={sw}
          className="stroke-gray-100 dark:stroke-slate-700"
        />
        <circle
          cx={center} cy={center} r={r}
          fill="none" strokeWidth={sw} strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className={`transition-[stroke-dashoffset] duration-700 ${
            allDone
              ? 'stroke-emerald-500 dark:stroke-emerald-400'
              : 'stroke-indigo-500 dark:stroke-indigo-400'
          }`}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none gap-0.5">
        <span className={`text-lg font-black tabular-nums ${
          allDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'
        }`}>
          {answered}
        </span>
        <span className="text-[10px] text-gray-400 dark:text-slate-500">/{total}</span>
      </div>
    </div>
  );
}

type LobbyPhase = 'waiting' | 'playing';

export default function LobbyPage() {
  const { pin } = useParams<{ pin: string }>();
  const { socket, emit } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase] = useState<LobbyPhase>('waiting');
  const [participantsCount, setParticipantsCount] = useState(0);
  const [progressionMode, setProgressionMode] = useState<'AUTO' | 'MANUAL'>(
    (location.state as { progressionMode?: 'AUTO' | 'MANUAL' } | null)?.progressionMode ?? 'MANUAL',
  );
  const [currentQuestion, setCurrentQuestion] = useState<QuestionActivePayload | null>(null);
  const [resultsMap, setResultsMap] = useState<Map<number, ResultsUpdatedPayload>>(new Map());

  const joinUrl = `${window.location.origin}/join?pin=${pin}`;

  useEffect(() => {
    if (!socket || !pin) return;

    const onParticipantsUpdated = (payload: ParticipantsUpdatedPayload) => setParticipantsCount(payload.count);
    const onSessionStarted = (payload: SessionStartedPayload) => { setProgressionMode(payload.progressionMode); setPhase('playing'); };
    const onQuestionActive = (payload: QuestionActivePayload) => setCurrentQuestion(payload);
    const onResultsUpdated = (payload: ResultsUpdatedPayload) => setResultsMap((prev) => new Map(prev).set(payload.questionId, payload));

    socket.on('participants_updated', onParticipantsUpdated);
    socket.on('session_started', onSessionStarted);
    socket.on('question_active', onQuestionActive);
    socket.on('results_updated', onResultsUpdated);
    socket.on('session_ended', () => navigate(`/results/${pin}`, { replace: true }));

    emit('join_lobby', { pin });

    return () => {
      socket.off('participants_updated', onParticipantsUpdated);
      socket.off('session_started', onSessionStarted);
      socket.off('question_active', onQuestionActive);
      socket.off('results_updated', onResultsUpdated);
      socket.off('session_ended');
    };
  }, [socket, pin, navigate, emit]);

  function handleStart() { if (pin) emit('start_session', { pin }); }
  function handleNext() { if (pin) emit('next_question', { pin }); }
  function handleEnd() {
    const msg = phase === 'waiting' ? textData.lobby.confirmCancel : textData.lobby.confirmEnd;
    if (!pin || !confirm(msg)) return;
    emit('end_session', { pin });
  }

  // ── Waiting phase ─────────────────────────────────────────────
  if (phase === 'waiting') {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
        <OrganizerNav />
        <div className="mx-auto max-w-lg px-4 py-10">
          <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-gray-200 shadow-xl dark:bg-slate-800 dark:ring-slate-700 dark:shadow-2xl dark:shadow-black/40">

            {/* PIN section */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-8 pb-6 pt-8 text-center">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-indigo-300">
                {textData.lobby.pinLabel}
              </p>
              <p className="font-black tracking-[0.12em] text-[72px] leading-none tabular-nums text-white">
                {pin}
              </p>
            </div>

            {/* QR + URL */}
            <div className="mx-6 my-5 rounded-2xl bg-gray-50 px-5 py-4 ring-1 ring-gray-200 dark:bg-slate-700/50 dark:ring-slate-600/50">
              <div className="flex items-center gap-5">
                <div className="shrink-0 rounded-xl bg-white p-2">
                  <QRCodeSVG value={joinUrl} size={80} level="M" />
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold text-gray-600 dark:text-slate-300">{textData.lobby.orOpen}</p>
                  <p className="break-all font-mono text-xs text-gray-600 dark:text-slate-300">{joinUrl}</p>
                </div>
              </div>
            </div>

            {/* Participants count */}
            <div className="mx-6 mb-5 flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-3.5 ring-1 ring-gray-200 dark:bg-slate-700/50 dark:ring-slate-600/50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-200 dark:bg-slate-600">
                  <Users size={17} className="text-gray-500 dark:text-slate-300" />
                </div>
                <span className="text-xl font-black text-gray-900 tabular-nums dark:text-white">{participantsCount}</span>
                <span className="text-sm text-gray-600 dark:text-slate-300">{textData.lobby.participantsConnected}</span>
              </div>
              <Spinner size="sm" />
            </div>

            {/* Buttons */}
            <div className="px-6 pb-6 space-y-3">
              <button
                onClick={handleStart}
                disabled={participantsCount === 0}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed dark:shadow-indigo-900/50"
              >
                <ChevronRight size={18} />
                {textData.lobby.startGame}
              </button>
              <button
                onClick={handleEnd}
                className="w-full rounded-2xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              >
                {textData.lobby.cancelSession}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Playing phase ─────────────────────────────────────────────
  const sortedResults = Array.from(resultsMap.values()).sort((a, b) => a.questionId - b.questionId);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <OrganizerNav />
      <div className="mx-auto max-w-2xl space-y-3 px-4 py-8">

        {/* Status bar */}
        <div className="flex items-center justify-between rounded-2xl bg-white px-5 py-3.5 ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50">
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${progressionMode === 'MANUAL' ? 'bg-indigo-50 dark:bg-indigo-600/20' : 'bg-violet-50 dark:bg-violet-600/20'}`}>
              {progressionMode === 'MANUAL'
                ? <Users size={15} className="text-indigo-600 dark:text-indigo-400" />
                : <Zap size={15} className="text-violet-600 dark:text-violet-400" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-slate-300">PIN: {pin}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {progressionMode === 'MANUAL' ? textData.lobby.modeManual : textData.lobby.modeAuto}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gray-500 dark:text-slate-400" />
            <span className="text-sm font-bold text-gray-800 tabular-nums dark:text-slate-200">{participantsCount}</span>
          </div>
        </div>

        {/* Current question (MANUAL, waiting for answers) */}
        {progressionMode === 'MANUAL' && currentQuestion && !resultsMap.has(currentQuestion.id) && (
          <div className="rounded-2xl bg-white p-6 ring-1 ring-indigo-200 dark:bg-slate-800 dark:ring-indigo-500/30">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {textData.lobby.questionLabel} {currentQuestion.questionNumber}/{currentQuestion.totalQuestions}
            </p>
            <p className="text-lg font-bold text-gray-900 leading-snug dark:text-white">{currentQuestion.text}</p>
            <div className="mt-5 flex items-center gap-5">
              <AnswerRing answered={0} total={participantsCount} />
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-500">
                <Spinner size="sm" />
                {textData.lobby.waitingAnswers}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {sortedResults.length > 0 ? (
          sortedResults.map((questionResult) => {
            const isCurrentQ = progressionMode === 'MANUAL' && currentQuestion?.id === questionResult.questionId;
            return (
              <div key={questionResult.questionId} className="rounded-2xl bg-white p-5 ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    {isCurrentQ && currentQuestion && (
                      <p className="mb-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {currentQuestion.questionNumber}/{currentQuestion.totalQuestions}
                      </p>
                    )}
                    <p className="font-bold text-gray-900 leading-snug dark:text-white">{questionResult.questionText}</p>
                  </div>
                  {isCurrentQ ? (
                    <AnswerRing answered={questionResult.voterCount} total={participantsCount} />
                  ) : (
                    <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600 tabular-nums dark:bg-slate-700 dark:text-slate-300">
                      {questionResult.voterCount} {textData.lobby.totalVotes}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5">
                  {questionResult.results.map((opt) => (
                    <div key={opt.optionId} className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-700/50">
                      <div
                        className="absolute inset-y-0 left-0 rounded-xl bg-indigo-200/70 transition-[width] duration-700 dark:bg-indigo-500/20"
                        style={{ width: `${opt.percentage}%` }}
                      />
                      <div className="relative flex items-center justify-between gap-3 px-4 py-3">
                        <span className="text-sm font-semibold text-gray-800 leading-snug dark:text-slate-200">
                          {opt.optionText}
                        </span>
                        <div className="flex shrink-0 items-baseline gap-1.5">
                          <span className="text-xs tabular-nums text-gray-500 dark:text-slate-400">{opt.count}</span>
                          <span className="w-12 text-right text-lg font-black tabular-nums leading-none text-indigo-600 dark:text-indigo-400">
                            {opt.percentage}%
                          </span>
                        </div>
                      </div>
                      {opt.voters.length > 0 && (
                        <div className="relative px-4 pb-2.5">
                          <VoterAvatars names={opt.voters} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          resultsMap.size === 0 && progressionMode === 'AUTO' && (
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white py-12 ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50">
              <Spinner size="sm" />
              <span className="text-sm text-gray-600 dark:text-slate-300">{textData.lobby.waitingAnswers}</span>
            </div>
          )
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3 pt-2">
          {progressionMode === 'MANUAL' && (
            <button
              onClick={handleNext}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 active:scale-[.98] dark:shadow-indigo-900/50"
            >
              {textData.lobby.nextQuestion}
              <ArrowRight size={18} />
            </button>
          )}
          <button
            onClick={handleEnd}
            className="w-full rounded-2xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            {textData.lobby.endForced}
          </button>
        </div>

      </div>
    </div>
  );
}
