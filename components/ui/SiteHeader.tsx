import { BrandMark } from "./BrandMark";
import { ButtonLink } from "./Button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <BrandMark />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          <a href="/" className="hover:text-eprom-blue transition-colors">
            Home
          </a>
          <a href="/catalog" className="hover:text-eprom-blue transition-colors">
            Courses
          </a>
          <a
            href="/course/centrifugal-pump-ops"
            className="hover:text-eprom-blue transition-colors"
          >
            Demo Course
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/catalog" variant="secondary" size="sm">
            Browse catalog
          </ButtonLink>
        </div>
      </div>
      <div className="h-[3px] w-full brand-grad" />
    </header>
  );
}
