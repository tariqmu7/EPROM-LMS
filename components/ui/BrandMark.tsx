import Link from "next/link";

/** CSS-only EPROM logo lockup (blue wordmark + lime leaf accent). */
export function BrandMark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      <span className="brand-mark group-hover:shadow-[var(--shadow)] transition-shadow">
        EPROM
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-extrabold text-ink">Academy</span>
        <span className="block text-[10px] uppercase tracking-[0.12em] text-muted">
          Interactive Training
        </span>
      </span>
    </Link>
  );
}
