import { VideoBlock as VideoBlockT } from "@/lib/types";

export function VideoBlock({ block }: { block: VideoBlockT }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-[8px] border border-[var(--border)] bg-black shadow-[var(--shadow)]">
        <div className="aspect-video w-full">
          {block.youtubeId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}`}
              title={block.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : block.src ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video className="h-full w-full" src={block.src} poster={block.poster} controls />
          ) : null}
        </div>
      </div>
      {block.description && (
        <p className="mt-4 text-sm text-muted">{block.description}</p>
      )}
    </div>
  );
}
