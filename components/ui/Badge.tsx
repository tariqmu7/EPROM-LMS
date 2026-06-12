import { ReactNode } from "react";

type Tone = "blue" | "lime" | "neutral" | "amber";

const tones: Record<Tone, string> = {
  blue: "bg-accent-soft text-eprom-blue",
  lime: "bg-[#eef7df] text-green",
  neutral: "bg-panel-2 text-muted",
  amber: "bg-[#fdf0db] text-amber",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
