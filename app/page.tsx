import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { centrifugalPumpCourse } from "@/lib/courses";

const features = [
  {
    icon: "🖥",
    title: "Interactive slides",
    body: "Themed, self-paced lessons replace static PowerPoint and PDF — with built-in checks for understanding.",
  },
  {
    icon: "🎬",
    title: "Embedded video",
    body: "Process animations and field footage stream right inside the lesson flow.",
  },
  {
    icon: "🧊",
    title: "3D equipment",
    body: "Orbit, zoom and click hotspots on real equipment — see inside a pump without opening one.",
  },
  {
    icon: "🌐",
    title: "360° virtual site visits",
    body: "Walk a plant area from your desk. No transport, PPE or permit-to-work required.",
  },
  {
    icon: "🎛",
    title: "Live simulation",
    body: "Change operating conditions and watch performance respond in real time — safe to fail.",
  },
  {
    icon: "✅",
    title: "Quizzes & hands-on tasks",
    body: "Assess and certify. Progress and scores are tracked per learner.",
  },
];

export default function Home() {
  const c = centrifugalPumpCourse;
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-grad opacity-[0.06]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <div className="max-w-3xl">
            <Badge tone="lime" className="mb-5">
              Committed to Energy · Built on Trust
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink md:text-6xl">
              Learn from EPROM's{" "}
              <span className="brand-grad-text">most experienced</span> engineers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              EPROM Academy captures decades of plant know-how from our best
              field engineers and turns it into hands-on, interactive training —
              so every new hire learns the way the experts actually work.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`/course/${c.slug}`} size="lg">
                Launch the demo course →
              </ButtonLink>
              <ButtonLink href="/catalog" variant="secondary" size="lg">
                Browse the catalog
              </ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-muted">
              <span>
                <strong className="font-mono text-ink">3</strong> formats replaced
              </span>
              <span>
                <strong className="font-mono text-ink">8</strong> interaction types
              </span>
              <span>
                <strong className="font-mono text-ink">0</strong> permits required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → solution strip */}
      <section className="border-y border-[var(--border)] bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-[var(--border)] md:grid-cols-3">
          {[
            { from: "Static PowerPoint decks", to: "Interactive, self-paced lessons" },
            { from: "PDF maintenance manuals", to: "3D models you can explore" },
            { from: "Costly half-day site visits", to: "360° virtual walk-downs" },
          ].map((x) => (
            <div key={x.from} className="bg-white p-7">
              <p className="text-sm text-muted line-through decoration-red/60">
                {x.from}
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">→ {x.to}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-eprom-blue">
            One platform
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink">
            Everything a trainee needs, in a single flow
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[6px] bg-accent-soft text-xl">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mb-20 max-w-7xl px-5">
        <Card accentBar="#8cc63f" className="overflow-hidden">
          <div className="flex flex-col items-start justify-between gap-6 p-9 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-extrabold text-ink">
                See it live: {c.title}
              </h3>
              <p className="mt-1.5 max-w-2xl text-muted">{c.summary}</p>
            </div>
            <ButtonLink href={`/course/${c.slug}`} size="lg" className="shrink-0">
              Start the demo →
            </ButtonLink>
          </div>
        </Card>
      </section>
    </div>
  );
}
