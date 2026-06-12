"use client";

import { useState } from "react";
import { QuizBlock as QuizBlockT } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function QuizBlock({
  block,
  onScore,
}: {
  block: QuizBlockT;
  onScore?: (correct: number, total: number) => void;
}) {
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = block.questions.length;
  const correct = block.questions.filter(
    (q) => picked[q.id] === q.answer
  ).length;
  const allAnswered = block.questions.every((q) => picked[q.id] !== undefined);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {block.questions.map((q, qi) => (
        <div
          key={q.id}
          className="rounded-[8px] border border-[var(--border)] bg-white p-5"
        >
          <p className="font-semibold text-ink">
            <span className="mr-2 font-mono text-muted">{qi + 1}.</span>
            {q.prompt}
          </p>
          <div className="mt-3 grid gap-2">
            {q.options.map((opt, oi) => {
              const chosen = picked[q.id] === oi;
              const isCorrect = oi === q.answer;
              let cls =
                "border-[var(--border)] hover:border-eprom-blue hover:bg-accent-soft";
              if (submitted) {
                if (isCorrect) cls = "border-green bg-[#eef7df]";
                else if (chosen) cls = "border-red bg-[#fdecec]";
                else cls = "border-[var(--border)] opacity-70";
              } else if (chosen) {
                cls = "border-eprom-blue bg-accent-soft";
              }
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setPicked((p) => ({ ...p, [q.id]: oi }))}
                  className={`flex items-center gap-3 rounded-[6px] border-2 px-4 py-2.5 text-left text-sm transition-colors ${cls}`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                      chosen ? "border-eprom-blue text-eprom-blue" : "border-[var(--border-bright)] text-muted"
                    }`}
                  >
                    {String.fromCharCode(65 + oi)}
                  </span>
                  <span className="text-ink">{opt}</span>
                  {submitted && isCorrect && <span className="ml-auto text-green">✔</span>}
                  {submitted && chosen && !isCorrect && (
                    <span className="ml-auto text-red">✕</span>
                  )}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="mt-3 rounded-[6px] bg-panel-2 p-3 text-[13px] text-muted">
              <strong className="text-ink">Why:</strong> {q.explanation}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <Button
          disabled={!allAnswered}
          onClick={() => {
            setSubmitted(true);
            onScore?.(correct, total);
          }}
        >
          Submit answers
        </Button>
      ) : (
        <div className="flex items-center gap-4 rounded-[8px] bg-accent-soft p-4">
          <span className="font-mono text-3xl font-extrabold text-eprom-blue">
            {correct}/{total}
          </span>
          <span className="text-sm text-ink">
            {correct === total
              ? "Perfect — you can move on with confidence."
              : "Review the explanations above, then continue."}
          </span>
        </div>
      )}
    </div>
  );
}
