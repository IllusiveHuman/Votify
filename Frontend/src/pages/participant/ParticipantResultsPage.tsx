import { useLocation, useParams, Link } from 'react-router-dom';
import textData from '../../locales/ua.json';
import { Star } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';

export default function ParticipantResultsPage() {
  const { pin } = useParams<{ pin: string }>();
  const location = useLocation();

  const stateScore = (location.state as { score?: number } | null)?.score;
  const storedScore = pin ? sessionStorage.getItem(`score_${pin}`) : null;
  const score = stateScore ?? (storedScore !== null ? Number(storedScore) : null);

  if (score === null) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 px-4 text-center dark:bg-gradient-to-br dark:from-indigo-900 dark:via-indigo-800 dark:to-violet-900">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-white/10 dark:ring-white/20 dark:backdrop-blur-sm">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{textData.participantResults.finished}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-indigo-300">{textData.participantResults.noScoreData}</p>
          <Link to="/" className="mt-4 block text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-white">
            {textData.backToHome} →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gradient-to-br dark:from-indigo-900 dark:via-indigo-800 dark:to-violet-900">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-xs text-center">

        {/* Stars */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Star size={20} className="fill-amber-400 text-amber-400 opacity-60" />
          <Star size={28} className="fill-amber-400 text-amber-400" />
          <Star size={20} className="fill-amber-400 text-amber-400 opacity-60" />
        </div>

        <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
          {textData.participantResults.finished}
        </h1>
        <p className="mb-8 text-sm text-gray-500 dark:text-indigo-300">
          {textData.participantResults.pinPrefix} <span className="font-mono font-semibold">{pin}</span>
        </p>

        {/* Score card */}
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-white/10 dark:ring-white/20 dark:backdrop-blur-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
            {textData.participantResults.yourScore}
          </p>
          <p className="text-8xl font-black tabular-nums leading-none text-gray-900 dark:text-white">
            {score}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-indigo-300">балів</p>
        </div>

        <Link
          to="/"
          className="mt-8 block rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[.98] dark:bg-white/15 dark:hover:bg-white/25"
        >
          {textData.backToHome}
        </Link>
      </div>
    </div>
  );
}
