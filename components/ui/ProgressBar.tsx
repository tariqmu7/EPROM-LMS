export function ProgressBar({
  value,
  className = "",
}: {
  /** 0..100 */
  value: number;
  className?: string;
}) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-[var(--border)] ${className}`}
    >
      <div
        className="h-full rounded-full brand-grad transition-[width] duration-300 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
