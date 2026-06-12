import { ContentBlock as ContentBlockT } from "@/lib/types";
import { Diagram } from "./Diagram";

export function ContentBlock({ block }: { block: ContentBlockT }) {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <div>
        <div className="space-y-4 text-[15px] leading-relaxed text-ink">
          {block.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {block.bullets && (
          <ul className="mt-6 space-y-3">
            {block.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-[6px] bg-panel-2 p-3"
              >
                <span className="text-lg leading-none">{b.icon ?? "•"}</span>
                <span className="text-sm text-ink">{b.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {block.image && (
        <figure className="rounded-[8px] border border-[var(--border)] bg-white p-5">
          {block.image.src.startsWith("diagram:") ? (
            <Diagram id={block.image.src} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.image.src} alt={block.image.caption ?? ""} className="w-full rounded" />
          )}
          {block.image.caption && (
            <figcaption className="mt-3 text-center text-[13px] text-muted">
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
}
