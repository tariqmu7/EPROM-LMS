"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Course, BlockType } from "@/lib/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { ContentBlock } from "@/components/blocks/ContentBlock";
import { VideoBlock } from "@/components/blocks/VideoBlock";
import { QuizBlock } from "@/components/blocks/QuizBlock";
import { TaskBlock } from "@/components/blocks/TaskBlock";
import { SimulationBlock } from "@/components/blocks/SimulationBlock";
import { SummaryBlock } from "@/components/blocks/SummaryBlock";
import {
  markBlockComplete,
  markCourseDone,
  saveQuizScore,
  getCourseProgress,
} from "@/lib/progress";

// 3D blocks use three.js → load client-only to avoid SSR/WebGL issues.
const Model3DBlock = dynamic(
  () => import("@/components/blocks/Model3DBlock").then((m) => m.Model3DBlock),
  { ssr: false, loading: () => <ViewerSkeleton label="Loading 3D model…" /> }
);
const PanoramaBlock = dynamic(
  () => import("@/components/blocks/PanoramaBlock").then((m) => m.PanoramaBlock),
  { ssr: false, loading: () => <ViewerSkeleton label="Loading 360° scene…" /> }
);

function ViewerSkeleton({ label }: { label: string }) {
  return (
    <div className="flex h-[440px] items-center justify-center rounded-[8px] border border-[var(--border)] bg-panel-2 text-muted">
      {label}
    </div>
  );
}

const blockIcon: Record<BlockType, string> = {
  content: "📖",
  video: "🎬",
  model3d: "🧊",
  panorama: "🌐",
  simulation: "🎛",
  quiz: "✅",
  task: "🛠",
  summary: "🏁",
};

export function LessonPlayer({ course }: { course: Course }) {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [quiz, setQuiz] = useState<{ correct: number; total: number } | undefined>();

  const total = course.blocks.length;
  const block = course.blocks[index];

  // hydrate prior progress
  useEffect(() => {
    const p = getCourseProgress(course.slug);
    setCompleted(p.completedBlocks);
    if (p.quizScore !== undefined && p.quizTotal !== undefined) {
      setQuiz({ correct: p.quizScore, total: p.quizTotal });
    }
  }, [course.slug]);

  // mark each visited block complete
  useEffect(() => {
    markBlockComplete(course.slug, block.id);
    setCompleted((c) => (c.includes(block.id) ? c : [...c, block.id]));
    if (block.type === "summary") markCourseDone(course.slug);
  }, [course.slug, block.id, block.type]);

  const pct = Math.round(((index + 1) / total) * 100);

  function go(to: number) {
    setIndex(Math.max(0, Math.min(total - 1, to)));
  }

  return (
    <div className="flex h-[calc(100vh-4rem-3px)] flex-col bg-bg">
      {/* top bar */}
      <div className="flex items-center gap-4 border-b border-[var(--border)] bg-white px-5 py-2.5">
        <Link
          href={`/course/${course.slug}`}
          className="text-sm text-muted hover:text-eprom-blue"
        >
          ✕ Exit
        </Link>
        <div className="flex-1">
          <ProgressBar value={pct} />
        </div>
        <span className="font-mono text-xs text-muted">
          {index + 1} / {total}
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* slide rail */}
        <aside className="thin-scroll hidden w-64 shrink-0 overflow-y-auto border-r border-[var(--border)] bg-white p-3 md:block">
          <p className="px-2 py-2 text-[11px] font-bold uppercase tracking-wide text-muted">
            {course.title}
          </p>
          <ol className="space-y-1">
            {course.blocks.map((b, i) => {
              const done = completed.includes(b.id);
              const current = i === index;
              return (
                <li key={b.id}>
                  <button
                    onClick={() => go(i)}
                    className={`flex w-full items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-left text-sm transition-colors ${
                      current
                        ? "bg-accent-soft font-semibold text-eprom-blue"
                        : "text-ink hover:bg-panel-2"
                    }`}
                  >
                    <span className="text-base">{blockIcon[b.type]}</span>
                    <span className="flex-1 leading-tight">{b.title}</span>
                    {done && !current && <span className="text-green">✔</span>}
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* stage */}
        <section className="thin-scroll flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-5 py-8 md:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {block.eyebrow && (
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-eprom-blue">
                    {block.eyebrow}
                  </p>
                )}
                <h2 className="mt-1 mb-6 text-3xl font-extrabold leading-tight text-ink">
                  {block.title}
                </h2>

                {"description" in block && block.description && (
                  <p className="mb-6 max-w-3xl text-muted">{block.description}</p>
                )}

                {block.type === "content" && <ContentBlock block={block} />}
                {block.type === "video" && <VideoBlock block={block} />}
                {block.type === "model3d" && <Model3DBlock block={block} />}
                {block.type === "panorama" && <PanoramaBlock block={block} />}
                {block.type === "simulation" && <SimulationBlock block={block} />}
                {block.type === "task" && <TaskBlock block={block} />}
                {block.type === "quiz" && (
                  <QuizBlock
                    block={block}
                    onScore={(correct, t) => {
                      setQuiz({ correct, total: t });
                      saveQuizScore(course.slug, correct, t);
                    }}
                  />
                )}
                {block.type === "summary" && (
                  <SummaryBlock
                    block={block}
                    courseTitle={course.title}
                    quiz={quiz}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* bottom nav */}
      <div className="flex items-center justify-between border-t border-[var(--border)] bg-white px-5 py-3">
        <Button variant="ghost" onClick={() => go(index - 1)} disabled={index === 0}>
          ← Previous
        </Button>
        <span className="hidden text-sm text-muted sm:block">{block.title}</span>
        {index < total - 1 ? (
          <Button onClick={() => go(index + 1)}>Next →</Button>
        ) : (
          <Link href="/catalog">
            <Button variant="accent">Finish ✓</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
