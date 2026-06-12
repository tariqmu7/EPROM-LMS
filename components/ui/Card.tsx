import { ReactNode } from "react";

export function Card({
  children,
  className = "",
  accentBar,
}: {
  children: ReactNode;
  className?: string;
  /** optional hex for a left brand stripe */
  accentBar?: string;
}) {
  return (
    <div
      className={`relative rounded-[6px] bg-panel border border-[var(--border)] shadow-[var(--shadow)] ${className}`}
    >
      {accentBar && (
        <span
          className="absolute left-0 top-0 h-full w-1 rounded-l-[6px]"
          style={{ background: accentBar }}
        />
      )}
      {children}
    </div>
  );
}
