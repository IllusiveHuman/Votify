import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pollsApi, sessionsApi } from '../../services/api';
import textData from '../../locales/ua.json';
import type { PollListItem, PollListQuery } from '../../types/api';
import Spinner from '../../components/Spinner';
import OrganizerNav from '../../components/OrganizerNav';
import Pagination from '../../components/Pagination';
import { Pencil, Trash2, Play, FileText, Plus, ArrowUpDown, Copy, Lock } from 'lucide-react';

const filters = textData.filters;

const SORT_OPTIONS: { value: PollListQuery['sortBy']; label: string }[] = [
  { value: 'createdAt', label: filters.sortByDate },
  { value: 'questions', label: filters.sortByQuestions },
  { value: 'sessions',  label: filters.sortBySessions },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const [polls, setPolls]         = useState<PollListItem[]>([]);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]     = useState(true);
  const [launching, setLaunching]     = useState<string | null>(null);
  const [duplicating, setDuplicating] = useState<string | null>(null);

  const [search, setSearch]       = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [dateFrom, setDateFrom]   = useState('');
  const [dateTo, setDateTo]       = useState('');
  const [sortBy, setSortBy]       = useState<PollListQuery['sortBy']>('createdAt');
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
    pollsApi
      .list({ search: debouncedSearch || undefined, dateFrom: dateFrom || undefined, dateTo: dateTo || undefined, sortBy, sortOrder, page, pageSize })
      .then((response) => {
        setPolls(response.data);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch, dateFrom, dateTo, sortBy, sortOrder, page, pageSize]);

  function resetToPage1() { setPage(1); }

  async function handleDuplicate(id: string) {
    setDuplicating(id);
    try {
      const response = await pollsApi.duplicate(id);
      const newPoll: PollListItem = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        progressionMode: response.data.progressionMode,
        createdAt: response.data.createdAt,
        _count: { questions: response.data.questions.length, sessions: 0 },
      };
      setPolls((current) => [newPoll, ...current]);
      setTotal((prev) => prev + 1);
    } finally {
      setDuplicating(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(textData.dashboard.confirmDelete)) return;
    try {
      await pollsApi.remove(id);
      setPolls((currentPolls) => currentPolls.filter((poll) => poll.id !== id));
      setTotal((prevTotal) => prevTotal - 1);
    } catch {
      alert('Не вдалося видалити опитування. Спробуйте ще раз.');
    }
  }

  async function handleLaunch(poll: PollListItem) {
    setLaunching(poll.id);
    try {
      const mode = poll.progressionMode ?? 'AUTO';
      const sessionResponse = await sessionsApi.create({ pollId: poll.id, progressionMode: mode });
      navigate(`/lobby/${sessionResponse.data.pin}`, { state: { progressionMode: mode } });
    } finally {
      setLaunching(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <OrganizerNav />

      <main className="mx-auto max-w-4xl px-4 py-10">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{textData.dashboard.title}</h1>
            {!loading && (
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">
                {total === 0 ? 'Жодного опитування' : `${total} опитуван${total === 1 ? 'ня' : 'ь'}`}
              </p>
            )}
          </div>
          <Link
            to="/builder/new"
            className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 active:scale-[.98] dark:shadow-indigo-900/50"
          >
            <Plus size={16} />
            {textData.dashboard.createNew}
          </Link>
        </div>

        {/* Filter bar */}
        <div className="mb-4 flex flex-wrap items-end gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder={filters.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-9 min-w-[180px] flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-800 placeholder-gray-400 outline-none ring-0 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
          />

          {/* Date from */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-600 dark:text-slate-300">{filters.dateFrom}</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => { setDateFrom(event.target.value); resetToPage1(); }}
              className="h-9 rounded-xl border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
            />
          </div>

          {/* Date to */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-600 dark:text-slate-300">{filters.dateTo}</label>
            <input
              type="date"
              value={dateTo}
              onChange={(event) => { setDateTo(event.target.value); resetToPage1(); }}
              className="h-9 rounded-xl border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
            />
          </div>

          {/* Sort by */}
          <select
            value={sortBy}
            onChange={(event) => { setSortBy(event.target.value as PollListQuery['sortBy']); resetToPage1(); }}
            className="h-9 rounded-xl border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none transition focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {SORT_OPTIONS.map((sortOption) => (
              <option key={sortOption.value} value={sortOption.value}>{sortOption.label}</option>
            ))}
          </select>

          {/* Sort direction toggle */}
          <button
            title={sortOrder === 'desc' ? filters.sortDesc : filters.sortAsc}
            onClick={() => { setSortOrder((currentOrder) => currentOrder === 'desc' ? 'asc' : 'desc'); resetToPage1(); }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            <ArrowUpDown size={15} className={sortOrder === 'asc' ? 'rotate-180' : ''} />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner size="lg" />
          </div>
        ) : polls.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 dark:bg-slate-800">
              <FileText size={28} className="text-gray-400 dark:text-slate-400" />
            </div>
            <p className="text-lg font-semibold text-gray-600 dark:text-slate-300">
              {debouncedSearch || dateFrom || dateTo ? filters.noResults : textData.dashboard.empty}
            </p>
            {!debouncedSearch && !dateFrom && !dateTo && (
              <Link to="/builder/new" className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                Створити перше опитування →
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5">
              {polls.map((poll, index) => (
                <div
                  key={poll.id}
                  className="group flex items-center gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-gray-200 transition-all hover:ring-indigo-300 dark:bg-slate-800 dark:ring-slate-700/50 dark:hover:ring-indigo-500/40"
                >
                  {/* Index badge */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-bold text-indigo-600 dark:bg-slate-700 dark:text-indigo-400">
                    {(page - 1) * pageSize + index + 1}
                  </div>

                  {/* Poll info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900 dark:text-white">{poll.title}</p>
                    <p className="mt-0.5 flex items-center gap-2 text-xs text-gray-600 dark:text-slate-300">
                      <span>{poll._count.questions} {textData.dashboard.colQuestions.toLowerCase()}</span>
                      <span className="text-gray-400 dark:text-slate-600">·</span>
                      <span>{poll._count.sessions} {textData.dashboard.colSessions.toLowerCase()}</span>
                      <span className="text-gray-400 dark:text-slate-600">·</span>
                      <span>{new Date(poll.createdAt).toLocaleDateString('uk-UA')}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {poll._count.sessions > 0 ? (
                      <span
                        title={textData.dashboard.editLockedTooltip}
                        className="cursor-not-allowed rounded-xl p-2.5 text-gray-300 dark:text-slate-600"
                      >
                        <Lock size={16} />
                      </span>
                    ) : (
                      <Link
                        to={`/builder/${poll.id}`}
                        title={textData.dashboard.actionEdit}
                        className="rounded-xl p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
                      >
                        <Pencil size={16} />
                      </Link>
                    )}
                    <button
                      onClick={() => handleDuplicate(poll.id)}
                      disabled={duplicating === poll.id}
                      title={textData.dashboard.actionDuplicate}
                      className="rounded-xl p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
                    >
                      {duplicating === poll.id ? <Spinner size="sm" /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(poll.id)}
                      title={textData.dashboard.actionDelete}
                      className="rounded-xl p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-red-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => handleLaunch(poll)}
                      disabled={launching === poll.id}
                      className="ml-2 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500 active:scale-[.97] disabled:opacity-50 dark:shadow-indigo-900/40"
                    >
                      {launching === poll.id ? <Spinner size="sm" /> : <Play size={14} fill="currentColor" />}
                      {textData.dashboard.actionLaunch}
                    </button>
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
