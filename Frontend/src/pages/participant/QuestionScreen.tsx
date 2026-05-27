import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import type { QuestionActivePayload } from '../../types/socket';
import textData from '../../locales/ua.json';
import Spinner from '../../components/Spinner';
import ThemeToggle from '../../components/ThemeToggle';
import { Check } from 'lucide-react';

type Phase = 'waiting' | 'question' | 'answered';

export default function QuestionScreen() {
  const { pin } = useParams<{ pin: string }>();
  const { socket, emit } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase] = useState<Phase>('waiting');
  const [question, setQuestion] = useState<QuestionActivePayload | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishedRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const submitVote = (optionIds: number[]) => {
    if (!pin || !question) return;
    clearTimer();
    emit('submit_vote', { pin, questionId: question.id, optionIds });
    setPhase('answered');
  };

  const handleOptionClick = (optionId: number) => {
    if (phase !== 'question' || !question) return;
    if (question.type === 'SINGLE_CHOICE') {
      setSelected(new Set([optionId]));
      return;
    }
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(optionId) ? next.delete(optionId) : next.add(optionId);
      return next;
    });
  };

  const startTimer = (seconds: number) => {
    clearTimer();
    setTimeLeft(seconds);
    setTotalTime(seconds);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearTimer();
          setPhase((currentPhase) => {
            if (currentPhase === 'question') submitVote([]);
            return currentPhase;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const applyQuestion = (payload: QuestionActivePayload) => {
    clearTimer();
    setQuestion(payload);
    setSelected(new Set());
    setPhase('question');
    if (payload.timeLimit != null && payload.timeLimit > 0) {
      startTimer(payload.timeLimit);
    } else {
      setTimeLeft(null);
      setTotalTime(null);
    }
  };

  useEffect(() => {
    if (!socket || !pin) return;
    const onReconnect = () => {
      const id = localStorage.getItem('participantId');
      const name = localStorage.getItem('participantName');
      if (id && name) emit('join_room', { pin, participantName: name, participantId: id });
    };
    socket.on('connect', onReconnect);
    return () => { socket.off('connect', onReconnect); };
  }, [socket, pin, emit]);

  useEffect(() => {
    if (!socket) return;
    socket.on('question_active', applyQuestion);
    socket.on('user_finished', (payload) => {
      finishedRef.current = true;
      clearTimer();
      if (pin) {
        sessionStorage.setItem(`score_${pin}`, String(payload.totalScore));
        navigate(`/results/${pin}`, { replace: true, state: { score: payload.totalScore } });
      }
    });
    socket.on('session_ended', () => {
      if (finishedRef.current) return;
      clearTimer();
      if (pin) navigate(`/results/${pin}`, { replace: true });
    });
    return () => {
      socket.off('question_active', applyQuestion);
      socket.off('user_finished');
      socket.off('session_ended');
      clearTimer();
    };
  }, [socket, pin]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const initialQuestion = (location.state as { initialQuestion?: QuestionActivePayload } | null)?.initialQuestion;
    if (initialQuestion) applyQuestion(initialQuestion);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Waiting ───────────────────────────────────────────────────
  if (phase === 'waiting') {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-950 dark:to-indigo-950 px-4">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <Spinner size="lg" />
        <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{textData.play.waitingGame}</p>
      </div>
    );
  }

  // ── Answered ──────────────────────────────────────────────────
  if (phase === 'answered') {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-950 dark:to-indigo-950 px-4">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 shadow-xl shadow-indigo-200 dark:shadow-indigo-900">
          <Check size={44} className="text-white" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-800 dark:text-white">{textData.play.answered}</p>
          <p className="mt-1 text-sm text-indigo-400 dark:text-slate-400">{textData.play.waitingNext}</p>
        </div>
        <Spinner size="sm" />
      </div>
    );
  }

  if (!question) return null;

  const isMulti = question.type === 'MULTIPLE_CHOICE';
  const timerPercent = timeLeft !== null && totalTime ? (timeLeft / totalTime) * 100 : 100;
  const timerUrgent = timeLeft !== null && timeLeft <= 5;
  const useGrid = question.options.length > 2;

  const optIdle =
    'bg-white border-gray-200 text-gray-800 hover:border-gray-300 hover:bg-gray-50 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-700';
  const optSelected =
    'bg-indigo-50 border-indigo-400 text-gray-900 dark:bg-indigo-900/25 dark:border-indigo-500 dark:text-white';

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-indigo-200">
            {textData.play.questionPrefix} {question.questionNumber}/{question.totalQuestions}
          </span>
          <div className="flex items-center gap-3">
            {timeLeft !== null && (
              <span className={`text-lg font-black tabular-nums transition-colors ${timerUrgent ? 'text-red-300' : 'text-white'}`}>
                {timeLeft}{textData.play.timerSuffix}
              </span>
            )}
            <ThemeToggle className="text-white/70 hover:bg-white/10 hover:text-white dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white" />
          </div>
        </div>
        {timeLeft !== null && (
          <div className="h-1.5 w-full bg-white/20">
            <div
              className={`h-full transition-[width] duration-1000 ease-linear ${timerUrgent ? 'bg-red-400' : 'bg-white'}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Question text */}
      <div className="px-5 pb-4 pt-8">
        <p className="text-center text-xl font-bold leading-snug text-gray-900 dark:text-slate-100">
          {question.text}
        </p>
        {isMulti && (
          <p className="mt-2 text-center text-xs font-medium text-gray-500 dark:text-slate-400">
            {textData.play.multiHint}
          </p>
        )}
      </div>

      {/* Options — centred on desktop */}
      <div className="flex-1 p-4">
        <div className={`mx-auto w-full max-w-2xl ${useGrid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'}`}>
          {question.options.map((option) => {
            const isSelected = selected.has(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`flex min-h-[80px] items-center gap-3 rounded-2xl border-2 p-4 text-left font-semibold transition-all active:scale-[0.97] ${isSelected ? optSelected : optIdle}`}
              >
                {/* Radio / Checkbox indicator */}
                {isMulti ? (
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-500' : 'border-gray-300 dark:border-slate-500'}`}>
                    {isSelected && <Check size={12} strokeWidth={3} className="text-white" />}
                  </span>
                ) : (
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isSelected ? 'border-indigo-600 dark:border-indigo-400' : 'border-gray-300 dark:border-slate-500'}`}>
                    <span className={`block h-2.5 w-2.5 rounded-full bg-indigo-600 transition-transform duration-150 dark:bg-indigo-400 ${isSelected ? 'scale-100' : 'scale-0'}`} />
                  </span>
                )}
                <span className="text-sm leading-snug">{option.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit button */}
      {selected.size > 0 && (
        <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto w-full max-w-2xl">
            <button
              onClick={() => submitVote(Array.from(selected))}
              className="w-full rounded-2xl bg-indigo-600 py-4 text-base font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98] dark:shadow-indigo-900"
            >
              {textData.play.submitAnswer}{isMulti && selected.size > 1 ? ` (${selected.size})` : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
