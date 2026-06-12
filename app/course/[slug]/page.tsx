import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { getCourse, courses } from "@/lib/courses";
import { BlockType } from "@/lib/types";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

const blockMeta: Record<BlockType, { icon: string; label: string }> = {
  content: { icon: "📖", label: "Reading" },
  video: { icon: "🎬", label: "Video" },
  model3d: { icon: "🧊", label: "3D model" },
  panorama: { icon: "🌐", label: "360° site visit" },
  simulation: { icon: "🎛", label: "Live simulation" },
  quiz: { icon: "✅", label: "Quiz" },
  task: { icon: "🛠", label: "Hands-on task" },
  summary: { icon: "🏁", label: "Summary" },
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <Link href="/catalog" className="text-sm text-muted hover:text-eprom-blue">
        ← Back to catalog
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Main */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{course.category}</Badge>
            <Badge tone="neutral">{course.level}</Badge>
            <Badge tone="lime">Interactive demo</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink">
            {course.title}
          </h1>
          <p className="mt-2 text-lg text-muted">{course.subtitle}</p>
          <p className="mt-5 max-w-2xl text-muted">{course.summary}</p>

          {/* Outcomes */}
          <h2 className="mt-10 text-lg font-bold text-ink">What you&apos;ll be able to do</h2>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {course.outcomes.map((o) => (
              <li key={o} className="flex gap-2.5 text-sm text-ink">
                <span className="mt-0.5 text-eprom-lime">✔</span>
                {o}
              </li>
            ))}
          </ul>

          {/* Syllabus */}
          <h2 className="mt-10 text-lg font-bold text-ink">Lesson contents</h2>
          <div className="mt-3 overflow-hidden rounded-[6px] border border-[var(--border)]">
            {course.blocks.map((b, i) => {
              const m = blockMeta[b.type];
              return (
                <div
                  key={b.id}
                  className="flex items-center gap-4 border-b border-[var(--border)] bg-white px-4 py-3 last:border-b-0"
                >
                  <span className="font-mono text-sm text-muted w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg">{m.icon}</span>
                  <span className="flex-1 font-medium text-ink">{b.title}</span>
                  <Badge tone="neutral">{m.label}</Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <Card accentBar={course.accent} className="sticky top-24 p-6">
            <div className="aspect-video w-full rounded-[6px] brand-grad opacity-90 flex items-center justify-center text-white">
              <span className="text-5xl">🛢</span>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Duration</dt>
                <dd className="font-semibold text-ink">{course.durationMin} min</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Level</dt>
                <dd className="font-semibold text-ink">{course.level}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Interactions</dt>
                <dd className="font-semibold text-ink">{course.blocks.length} steps</dd>
              </div>
            </dl>

            <div className="mt-5 rounded-[6px] bg-panel-2 p-3 text-[13px] text-muted">
              <p className="font-semibold text-ink">Replaces today&apos;s materials:</p>
              <ul className="mt-1 list-disc pl-4">
                {course.replaces.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>

            <ButtonLink
              href={`/learn/${course.slug}`}
              size="lg"
              className="mt-5 w-full"
            >
              Start lesson →
            </ButtonLink>
          </Card>
        </aside>
      </div>
    </div>
  );
}
