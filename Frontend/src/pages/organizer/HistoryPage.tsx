import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sessionsApi } from '../../services/api';
import type { SessionListItem, SessionListQuery } from '../../types/api';
import textData from '../../locales/ua.json';
import Spinner from '../../components/Spinner';
import OrganizerNav from '../../components/OrganizerNav';
import Pagination from '../../components/Pagination';
import { Clock, CheckCircle, Users, History, ArrowUpDown } from 'lucide-react';

const filters = textData.filters;

const STATUS_DOT: Record<string, string> = {
  WAITING: 'bg-amber-400',
  ACTIVE: 'bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.4)]',
  FINISHED: 'bg-gray-300 dark:bg-slate-600',
};

const STATUS_BADGE: Record<string, string> = {
  WAITING: 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30 dark:text-amber-400',
  ACTIVE: 'bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30 dark:text-emerald-400',
  FINISHED: 'bg-gray-100 text-gray-500 ring-1 ring-gray-200 dark:bg-slate-700 dark:text-slate-400 dark:ring-slate-600',
};

const STATUS_LABEL: Record<string, string> = {
  WAITING: textData.history.statusWaiting,
  ACTIVE: textData.history.statusActive,
  FINISHED: textData.history.statusFinished,
};

const SORT_OPTIONS: { value: SessionListQuery['sortBy']; label: string }[] = [
  { value: 'createdAt',    label: filters.sortByDate },
  { value: 'participants', label: filters.sortByParticipants },
];

export default function HistoryPage() {
  const navigate = useNavigate();

  const [sessions, setSessions]   = useState<SessionListItem[]>([]);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]     = useState(true);

  const [search, setSearch]       = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [dateFrom, setDateFrom]   = useState('');
  const [dateTo, setDateTo]       = useState('');
  const [sortBy, setSortBy]       = useState<SessionListQuery['sortBy']>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage]           = useState(1);
  const [pageSize, setPageSize]   = useState(10);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [search]);

  useEffect(() => {
    setLoading(true);
    sessionsApi
      .list({ search: debouncedSearch || undefined, dateFrom: dateFrom || undefined, dateTo: dateTo || undefined, sortBy, sortOrder, page, pageSize })
      .then((response) => {
        setSessions(response.data);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch, dateFrom, dateTo, sortBy, sortOrder, page, pageSize]);

  function resetToPage1() { setPage(1); }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <OrganizerNav />

      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{textData.history.title}</h1>
          {!loading && (
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">
              {total === 0 ? 'Жодної сесії' : `${total} сесі${total === 1 ? 'я' : 'й'}`}
            </p>
          )}
        </div>

        {/* Filter bar */}
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <input
            type="text"
            placeholder={filters.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-9 min-w-[180px] flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
          />

          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-600 dark:text-slate-300">{filters.dateFrom}</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => { setDateFrom(event.target.value); resetToPage1(); }}
              className="h-9 rounded-xl border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-600 dark:text-slate-300">{filters.dateTo}</label>
            <input
              type="date"
              value={dateTo}
              onChange={(event) => { setDateTo(event.target.value); resetToPage1(); }}
              className="h-9 rounded-xl border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
            />
          </div>

          <select
            value={sortBy}
            onChange={(event) => { setSortBy(event.target.value as SessionListQuery['sortBy']); resetToPage1(); }}
            className="h-9 rounded-xl border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none transition focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {SORT_OPTIONS.map((sortOption) => (
              <option key={sortOption.value} value={sortOption.value}>{sortOption.label}</option>
            ))}
          </select>

          <button
            title={sortOrder === 'desc' ? filters.sortDesc : filters.sortAsc}
            onClick={() => { setSortOrder((currentOrder) => currentOrder === 'desc' ? 'asc' : 'desc'); resetToPage1(); }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            <ArrowUpDown size={15} className={sortOrder === 'asc' ? 'rotate-180' : ''} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner size="lg" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 dark:bg-slate-800">
              <History size={28} className="text-gray-500 dark:text-slate-400" />
            </div>
            <p className="text-lg font-semibold text-gray-600 dark:text-slate-300">
              {debouncedSearch || dateFrom || dateTo ? filters.noResults : textData.history.empty}
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-gray-200 transition-all hover:ring-gray-300 dark:bg-slate-800 dark:ring-slate-700/50 dark:hover:bg-slate-800/80"
                >
                  {/* Status dot */}
                  <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT[session.status] ?? 'bg-gray-300 dark:bg-slate-600'}`} />

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <p className="truncate font-semibold text-gray-900 dark:text-white">{session.poll.title}</p>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[session.status] ?? ''}`}>
                        {STATUS_LABEL[session.status] ?? session.status}
                      </span>
                    </div>
                    <p className="mt-0.5 flex items-center gap-2 text-xs text-gray-600 dark:text-slate-300">
                      <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{session.pin}</span>
                      <span className="text-gray-400 dark:text-slate-600">·</span>
                      <Users size={11} className="inline text-gray-500 dark:text-slate-400" />
                      <span>{session._count.participants} учасників</span>
                      <span className="text-gray-400 dark:text-slate-600">·</span>
                      <span>{new Date(session.createdAt).toLocaleDateString('uk-UA')}</span>
                    </p>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    {session.status === 'FINISHED' && (
                      <Link
                        to={`/results/${session.pin}`}
                        className="flex items-center gap-1.5 rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-200 transition hover:bg-indigo-100 dark:bg-indigo-600/20 dark:text-indigo-400 dark:ring-indigo-500/30 dark:hover:bg-indigo-600/30 dark:hover:text-indigo-300"
                      >
                        <CheckCircle size={14} />
                        {textData.history.actionView}
                      </Link>
                    )}
                    {session.status === 'WAITING' && (
                      <button
                        onClick={() => navigate(`/lobby/${session.pin}`)}
                        className="flex items-center gap-1.5 rounded-xl bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-600 ring-1 ring-amber-500/30 transition hover:bg-amber-500/25 dark:text-amber-400"
                      >
                        <Clock size={14} />
                        {textData.history.actionOpenLobby}
                      </button>
                    )}
                    {session.status === 'ACTIVE' && (
                      <button
                        onClick={() => navigate(`/lobby/${session.pin}`)}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-600 ring-1 ring-emerald-500/30 transition hover:bg-emerald-500/25 dark:text-emerald-400"
                      >
                        <CheckCircle size={14} />
                        {textData.history.actionContinue}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
              onPageSizeChange={(newSize) => { setPageSize(newSize); setPage(1); }}
            />
          </>
        )}
      </main>
    </div>
  );
}
