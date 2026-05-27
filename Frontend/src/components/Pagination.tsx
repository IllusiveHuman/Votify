import textData from '../locales/ua.json';

const filters = textData.filters;

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({ page, totalPages, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  if (totalPages <= 1 && total <= PAGE_SIZE_OPTIONS[0]) return null;

  const pages = buildPageRange(page, totalPages);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      {/* Page size selector */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
        <span>{total} записів</span>
        <span className="text-gray-400 dark:text-slate-600">·</span>
        <select
          value={pageSize}
          onChange={(event) => { onPageSizeChange(Number(event.target.value)); onPageChange(1); }}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {PAGE_SIZE_OPTIONS.map((sizeOption) => (
            <option key={sizeOption} value={sizeOption}>{sizeOption} {filters.perPage}</option>
          ))}
        </select>
      </div>

      {/* Page buttons */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <PageBtn disabled={page <= 1} onClick={() => onPageChange(page - 1)}>‹</PageBtn>
          {pages.map((pageItem, pageIndex) =>
            pageItem === '…' ? (
              <span key={`ellipsis-${pageIndex}`} className="px-1 text-gray-500 dark:text-slate-400">…</span>
            ) : (
              <PageBtn key={pageItem} active={pageItem === page} onClick={() => onPageChange(pageItem as number)}>{pageItem}</PageBtn>
            ),
          )}
          <PageBtn disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>›</PageBtn>
        </div>
      )}
    </div>
  );
}

function PageBtn({ children, onClick, active, disabled }: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[32px] rounded-lg px-2 py-1 text-sm font-medium transition
        ${active
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700'}
        ${disabled ? 'pointer-events-none opacity-40' : ''}`}
    >
      {children}
    </button>
  );
}

function buildPageRange(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const range: (number | '…')[] = [];
  const addPage = (pageNum: number) => { if (!range.includes(pageNum)) range.push(pageNum); };

  addPage(1);
  if (current > 3) range.push('…');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) addPage(i);
  if (current < total - 2) range.push('…');
  addPage(total);

  return range;
}
