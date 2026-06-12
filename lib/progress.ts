// localStorage-backed progress + quiz scoring. No backend needed for the demo.

const KEY = "eprom-academy-progress-v1";

interface ProgressShape {
  // courseSlug -> { completedBlocks: string[], quizScore?: number, done?: boolean }
  [slug: string]: {
    completedBlocks: string[];
    quizScore?: number;
    quizTotal?: number;
    done?: boolean;
  };
}

function read(): ProgressShape {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function write(data: ProgressShape) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getCourseProgress(slug: string) {
  return read()[slug] ?? { completedBlocks: [] };
}

export function markBlockComplete(slug: string, blockId: string) {
  const data = read();
  const cur = data[slug] ?? { completedBlocks: [] };
  if (!cur.completedBlocks.includes(blockId)) {
    cur.completedBlocks = [...cur.completedBlocks, blockId];
  }
  data[slug] = cur;
  write(data);
}

export function saveQuizScore(slug: string, score: number, total: number) {
  const data = read();
  const cur = data[slug] ?? { completedBlocks: [] };
  cur.quizScore = score;
  cur.quizTotal = total;
  data[slug] = cur;
  write(data);
}

export function markCourseDone(slug: string) {
  const data = read();
  const cur = data[slug] ?? { completedBlocks: [] };
  cur.done = true;
  data[slug] = cur;
  write(data);
}

export function resetCourse(slug: string) {
  const data = read();
  delete data[slug];
  write(data);
}
