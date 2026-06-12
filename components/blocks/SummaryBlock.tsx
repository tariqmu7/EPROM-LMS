"use client";

import Link from "next/link";
import { SummaryBlock as SummaryBlockT } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";

export function SummaryBlock({
  block,
  courseTitle,
  quiz,
}: {
  block: SummaryBlockT;
  courseTitle: string;
  quiz?: { correct: number; total: number };
}) {
  const pct = quiz ? Math.round((quiz.correct / quiz.total) * 100) : null;
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full brand-grad text-3xl text-white">
        ✓
      </div>
      <h3 className="mt-5 text-2xl font-extrabold text-ink">{block.title}</h3>
      <p className="mt-1 text-muted">{courseTitle}</p>

      {pct !== null && (
        <div className="mt-6 inline-flex items-center gap-3 rounded-[8px] border border-[var(--border)] bg-white px-6 py-4">
          <span className="font-mono text-4xl font-extrabold text-eprom-blue">{pct}%</span>
          <span className="text-left text-sm text-muted">
            Knowledge check
            <br />
            {quiz!.correct} of {quiz!.total} correct
          </span>
        </div>
      )}

      <div className="mt-8 rounded-[8px] border border-[var(--border)] bg-white p-6 text-left">
        <p className="text-[11px] font-bold uppercase tracking-wide text-eprom-blue">
          You can now
        </p>
        <ul className="mt-3 space-y-2.5">
          {block.outcomes.map((o) => (
            <li key={o} className="flex gap-2.5 text-sm text-ink">
              <span className="text-eprom-lime">✔</span>
              {o}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/catalog" size="lg">
          Back to catalog
        </ButtonLink>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-3 text-sm font-semibold text-muted hover:text-eprom-blue"
        >
          Finish demo
        </Link>
      </div>
    </div>
  );
}
