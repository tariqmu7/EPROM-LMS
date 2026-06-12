import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { centrifugalPumpCourse, catalogStubs } from "@/lib/courses";

const all = [
  { ...centrifugalPumpCourse, playable: true },
  ...catalogStubs.map((s) => ({ ...s, outcomes: [], playable: false })),
];

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-eprom-blue">
          Catalog
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-ink">Training courses</h1>
        <p className="mt-2 max-w-2xl text-muted">
          One course is fully interactive in this prototype. The rest show how the
          platform scales across EPROM&apos;s training domain.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {all.map((c) => {
          const inner = (
            <Card
              accentBar={c.accent}
              className={`flex h-full flex-col p-6 transition-transform ${
                c.playable ? "hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]" : "opacity-90"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <Badge tone="blue">{c.category}</Badge>
                {c.playable ? (
                  <Badge tone="lime">Interactive demo</Badge>
                ) : (
                  <Badge tone="neutral">Preview</Badge>
                )}
              </div>
              <h3 className="text-xl font-bold leading-snug text-ink">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">{c.subtitle}</p>
              <p className="mt-3 flex-1 text-sm text-muted">{c.summary}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.replaces.map((r) => (
                  <span
                    key={r}
                    className="rounded-[4px] bg-panel-2 px-2 py-0.5 text-[11px] text-muted"
                  >
                    replaces: {r}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm">
                <span className="text-muted">
                  {c.level} · {c.durationMin} min
                </span>
                <span
                  className={`font-semibold ${
                    c.playable ? "text-eprom-blue" : "text-muted"
                  }`}
                >
                  {c.playable ? "Open →" : "Coming soon"}
                </span>
              </div>
            </Card>
          );
          return c.playable ? (
            <Link key={c.slug} href={`/course/${c.slug}`} className="block h-full">
              {inner}
            </Link>
          ) : (
            <div key={c.slug} className="h-full cursor-not-allowed">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
