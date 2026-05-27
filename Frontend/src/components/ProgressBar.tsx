interface Props {
  percent: number; // 0–100
  animated?: boolean;
}

export default function ProgressBar({ percent, animated = true }: Props) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-indigo-100">
      <div
        className={`h-full rounded-full bg-indigo-600 ${animated ? 'transition-all duration-1000 ease-linear' : ''}`}
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  );
}
