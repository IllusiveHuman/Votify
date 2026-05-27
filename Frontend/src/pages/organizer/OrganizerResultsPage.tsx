import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrganizerNav from '../../components/OrganizerNav';
import { sessionsApi } from '../../services/api';
import type { SessionResults, QuestionSummary, OptionSummary } from '../../types/api';
import textData from '../../locales/ua.json';
import Spinner from '../../components/Spinner';
import { Check, Trophy, ArrowLeft, ChevronDown, ChevronUp, Medal, Download, Users, TrendingUp, Target } from 'lucide-react';

const VOTERS_INITIAL = 5;

const PODIUM_STYLE = [
  {
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    ring: 'ring-amber-200 dark:ring-amber-500/30',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    icon: <Trophy size={16} className="text-amber-600 dark:text-amber-400" />,
  },
  {
    bg: 'bg-gray-100 dark:bg-slate-700/50',
    ring: 'ring-gray-200 dark:ring-slate-600/50',
    badge: 'bg-gray-200 text-gray-600 dark:bg-slate-600/50 dark:text-slate-400',
    icon: <Medal size={16} className="text-gray-500 dark:text-slate-400" />,
  },
  {
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    ring: 'ring-orange-200 dark:ring-orange-500/30',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    icon: <Medal size={16} className="text-orange-600 dark:text-orange-400" />,
  },
];

function VoterList({ voters }: { voters: OptionSummary['voters'] }) {
  const [expanded, setExpanded] = useState(false);
  if (voters.length === 0) return null;
  const visible = expanded ? voters : voters.slice(0, VOTERS_INITIAL);
  const hidden = voters.length - VOTERS_INITIAL;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5 pl-1">
      {visible.map((voter) => (
        <span key={voter.participantId} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-400 dark:ring-indigo-500/30">
          {voter.name}
        </span>
      ))}
      {!expanded && hidden > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-0.5 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
        >
          {textData.orgResults.votersShowMore} {hidden}<ChevronDown size={11} />
        </button>
      )}
      {expanded && voters.length > VOTERS_INITIAL && (
        <button
          onClick={() => setExpanded(false)}
          className="flex items-center gap-0.5 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
        >
          {textData.orgResults.votersCollapse}<ChevronUp size={11} />
        </button>
      )}
    </div>
  );
}

function SummaryCards({ results }: { results: SessionResults }) {
  const { participants, questionsSummary } = results;
  const count = participants.length;
  const avgScore = count > 0 ? Math.round(participants.reduce((s, p) => s + p.totalScore, 0) / count) : 0;
  const maxScore = count > 0 ? Math.max(...participants.map((p) => p.totalScore)) : 0;

  const questionsWithCorrect = questionsSummary.filter((q) => q.options.some((o) => o.isCorrect));
  const overallCorrectRate =
    count > 0 && questionsWithCorrect.length > 0
      ? Math.round(
          (questionsWithCorrect.reduce((sum, q) => {
            const correct = participants.filter((p) => {
              const ans = p.answers.find((a) => a.questionId === q.questionId);
              return ans && ans.score > 0;
            }).length;
            return sum + correct;
          }, 0) /
            (questionsWithCorrect.length * count)) *
            100,
        )
      : null;

  const cards = [
    {
      label: textData.orgResults.summaryParticipants,
      value: count,
      icon: <Users size={16} />,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-500/10',
    },
    {
      label: textData.orgResults.summaryAvgScore,
      value: avgScore,
      icon: <TrendingUp size={16} />,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-500/10',
    },
    {
      label: textData.orgResults.summaryMaxScore,
      value: maxScore,
      icon: <Trophy size={16} />,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
    },
    ...(overallCorrectRate !== null
      ? [
          {
            label: textData.orgResults.summaryCorrectRate,
            value: `${overallCorrectRate}%`,
            icon: <Target size={16} />,
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
          },
        ]
      : []),
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl bg-white p-4 ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50"
        >
          <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-xl ${card.bg} ${card.color}`}>
            {card.icon}
          </div>
          <p className="text-2xl font-black tabular-nums text-gray-900 dark:text-white">{card.value}</p>
          <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-slate-400">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

function DifficultyRanking({ results }: { results: SessionResults }) {
  const { participants, questionsSummary } = results;
  const withCorrect = questionsSummary.filter((q) => q.options.some((o) => o.isCorrect));
  if (withCorrect.length === 0) return null;

  const ranked = withCorrect
    .map((q) => {
      const originalIndex = questionsSummary.indexOf(q);
      const correctCount =
        participants.length > 0
          ? participants.filter((p) => {
              const ans = p.answers.find((a) => a.questionId === q.questionId);
              return ans && ans.score > 0;
            }).length
          : 0;
      const rate = participants.length > 0 ? Math.round((correctCount / participants.length) * 100) : 0;
      return { q, rate, originalIndex };
    })
    .sort((a, b) => a.rate - b.rate);

  function barColor(rate: number) {
    if (rate >= 70) return { bar: 'bg-emerald-400 dark:bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', label: textData.orgResults.difficultyEasy };
    if (rate >= 40) return { bar: 'bg-amber-400 dark:bg-amber-500', text: 'text-amber-700 dark:text-amber-400', label: textData.orgResults.difficultyMedium };
    return { bar: 'bg-red-400 dark:bg-red-500', text: 'text-red-700 dark:text-red-400', label: textData.orgResults.difficultyHard };
  }

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{textData.orgResults.difficultyTitle}</h2>
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50">
        {ranked.map(({ q, rate, originalIndex }, i) => {
          const colors = barColor(rate);
          return (
            <div
              key={q.questionId}
              className="flex items-center gap-4 border-t border-gray-100 px-5 py-3.5 first:border-0 dark:border-slate-700/50"
            >
              <span className="w-5 shrink-0 text-center text-xs font-bold text-gray-400 dark:text-slate-500">
                {i + 1}
              </span>
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800 dark:text-slate-200">
                <span className="mr-1.5 text-xs text-gray-400 dark:text-slate-500">
                  {textData.orgResults.questionLabel} {originalIndex + 1}.
                </span>
                {q.questionText}
              </p>
              <div className="flex w-40 shrink-0 items-center gap-2.5">
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-700">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ${colors.bar}`}
                    style={{ width: `${rate}%` }}
                  />
                </div>
                <span className={`w-9 shrink-0 text-right text-sm font-bold tabular-nums ${colors.text}`}>
                  {rate}%
                </span>
              </div>
              <span className={`hidden w-16 shrink-0 text-right text-xs font-semibold sm:block ${colors.text}`}>
                {colors.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function QuestionChart({ question, index }: { question: QuestionSummary; index: number }) {
  const total = question.options.reduce((sum, option) => sum + option.count, 0);
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50">
      <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        {textData.orgResults.questionLabel} {index + 1}
      </p>
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="font-bold text-gray-900 leading-snug dark:text-white">{question.questionText}</p>
        <div className="flex shrink-0 items-center gap-2">
          {question.questionType === 'SINGLE_CHOICE' && (
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
              {question.questionPoints} б.
            </span>
          )}
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500 tabular-nums dark:bg-slate-700 dark:text-slate-400">
            {total} {textData.lobby.totalVotes}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {question.options.map((opt) => {
          const percentage = total > 0 ? Math.round((opt.count / total) * 100) : 0;
          return (
            <div key={opt.optionId}>
              <div className={`relative overflow-hidden rounded-xl ${opt.isCorrect ? 'bg-indigo-50 ring-1 ring-indigo-200 dark:bg-indigo-500/10 dark:ring-indigo-500/20' : 'bg-gray-100 dark:bg-slate-700/50'}`}>
                <div
                  className={`absolute inset-y-0 left-0 rounded-xl transition-[width] duration-700 ${opt.isCorrect ? 'bg-indigo-200/80 dark:bg-indigo-500/25' : 'bg-gray-200 dark:bg-slate-600/50'}`}
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    {opt.isCorrect && <Check size={13} className="shrink-0 text-indigo-600 dark:text-indigo-400" />}
                    <span className={`truncate text-sm font-semibold ${opt.isCorrect ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-slate-300'}`}>
                      {opt.optionText}
                    </span>
                    {opt.isCorrect && question.questionType === 'MULTIPLE_CHOICE' && (
                      <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                        +{opt.points} б.
                      </span>
                    )}
                  </div>
                  <div className="flex shrink-0 items-baseline gap-1.5">
                    <span className="text-xs tabular-nums text-gray-500 dark:text-slate-400">{opt.count}</span>
                    <span className={`w-10 text-right text-base font-black tabular-nums ${opt.isCorrect ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-slate-300'}`}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
              <VoterList voters={opt.voters} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrganizerResultsPage() {
  const { pin } = useParams<{ pin: string }>();
  const [results, setResults] = useState<SessionResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pin) return;
    sessionsApi
      .results(pin)
      .then((response) => setResults(response.data))
      .catch(() => setError(textData.orgResults.errorLoad))
      .finally(() => setLoading(false));
  }, [pin]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-950">
        <p className="text-red-500 dark:text-red-400">{error ?? textData.orgResults.noData}</p>
      </div>
    );
  }

  const sortedParticipants = [...results.participants].sort((a, b) => b.totalScore - a.totalScore);
  const top3 = sortedParticipants.slice(0, 3);
  const rest = sortedParticipants.slice(3);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <OrganizerNav />

      <div className="mx-auto max-w-4xl px-4 py-10">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{textData.orgResults.title}</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">
              {textData.orgResults.pinPrefix} <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{pin}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => sessionsApi.exportResults(pin ?? '')}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[.98] dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              <Download size={15} />
              Експорт Excel
            </button>
            <Link
              to="/history"
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <ArrowLeft size={15} />
              {textData.backToArchive}
            </Link>
          </div>
        </div>

        {/* Summary cards */}
        <SummaryCards results={results} />

        {/* Leaderboard */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{textData.orgResults.leaderboard}</h2>

          {sortedParticipants.length === 0 ? (
            <div className="rounded-2xl bg-white py-12 text-center text-gray-600 ring-1 ring-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700/50">
              {textData.orgResults.noParticipants}
            </div>
          ) : (
            <div className="space-y-2.5">
              {top3.map((participant, rank) => {
                const style = PODIUM_STYLE[rank];
                return (
                  <div key={participant.participantId} className={`flex items-center gap-4 rounded-2xl px-5 py-4 ring-1 ${style.bg} ${style.ring}`}>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.badge}`}>
                      {style.icon}
                    </div>
                    <p className="flex-1 font-semibold text-gray-900 dark:text-white">{participant.name}</p>
                    <p className="text-xl font-black text-indigo-600 tabular-nums dark:text-indigo-400">{participant.totalScore}</p>
                  </div>
                );
              })}

              {rest.length > 0 && (
                <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50">
                  {rest.map((participant, rank) => (
                    <div key={participant.participantId} className="flex items-center gap-4 border-t border-gray-100 px-5 py-3.5 first:border-0 dark:border-slate-700/50">
                      <span className="w-6 text-center text-sm font-semibold text-gray-500 tabular-nums dark:text-slate-400">{rank + 4}</span>
                      <p className="flex-1 text-sm font-medium text-gray-800 dark:text-slate-300">{participant.name}</p>
                      <p className="font-bold text-indigo-600 tabular-nums dark:text-indigo-400">{participant.totalScore}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Difficulty ranking */}
        <DifficultyRanking results={results} />

        {/* Questions breakdown */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{textData.orgResults.chartsSection}</h2>
          <div className="space-y-4">
            {results.questionsSummary.map((questionSummary, questionIndex) => (
              <QuestionChart key={questionSummary.questionId} question={questionSummary} index={questionIndex} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
