export default function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-16 w-16' }[size];
  return (
    <div
      className={`${sizeClass} animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600`}
      role="status"
      aria-label="Завантаження"
    />
  );
}
