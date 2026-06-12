"use client";

import { useState, useMemo } from "react";
import { TaskBlock as TaskBlockT } from "@/lib/types";
import { Button } from "@/components/ui/Button";

// Deterministic shuffle so SSR/CSR match and the demo is repeatable.
function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  // fixed permutation seed by index parity — good enough to look mixed
  const order = [...a.keys()].sort(
    (x, y) => ((x * 7 + 3) % a.length) - ((y * 7 + 3) % a.length)
  );
  return order.map((i) => a[i]);
}

export function TaskBlock({ block }: { block: TaskBlockT }) {
  const initial = useMemo(
    () => shuffled(block.steps.map((s, i) => ({ id: i, text: s }))),
    [block.steps]
  );
  const [items, setItems] = useState(initial);
  const [checked, setChecked] = useState(false);

  const isCorrect = items.every((it, i) => it.id === i);

  function move(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    setItems(next);
    setChecked(false);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-5 rounded-[8px] border-l-4 border-eprom-blue bg-accent-soft p-4 text-sm text-ink">
        {block.scenario}
      </p>

      <ol className="space-y-2.5">
        {items.map((it, i) => {
          const correctSpot = checked && it.id === i;
          const wrongSpot = checked && it.id !== i;
          return (
            <li
              key={it.id}
              className={`flex items-center gap-3 rounded-[6px] border-2 bg-white p-3 transition-colors ${
                correctSpot
                  ? "border-green"
                  : wrongSpot
                  ? "border-red"
                  : "border-[var(--border)]"
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-eprom-blue font-mono text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="flex-1 text-sm text-ink">{it.text}</span>
              <div className="flex flex-col">
                <button
                  aria-label="Move up"
                  onClick={() => move(i, -1)}
                  className="px-2 text-muted hover:text-eprom-blue"
                >
                  ▲
                </button>
                <button
                  aria-label="Move down"
                  onClick={() => move(i, 1)}
                  className="px-2 text-muted hover:text-eprom-blue"
                >
                  ▼
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex items-center gap-4">
        <Button onClick={() => setChecked(true)}>Check sequence</Button>
        {checked &&
          (isCorrect ? (
            <span className="text-sm font-semibold text-green">
              ✔ {block.successMessage}
            </span>
          ) : (
            <span className="text-sm font-semibold text-red">
              Not quite — adjust the highlighted steps and check again.
            </span>
          ))}
      </div>
    </div>
  );
}
