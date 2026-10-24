const VAN_WIDTH = 1206;
const VAN_HEIGHT = 1010;

const srcSet = [
  "/brand/van-480.webp 480w",
  "/brand/van-768.webp 768w",
  "/brand/van-1024.webp 1024w",
  "/brand/van-1400.webp 1400w",
].join(", ");

const defaultAlt =
  "The Clearance Geeks branded white van with black and neon green waste removals livery and geek mascot";

export function VanBrandImage({
  priority,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px",
  caption = "Our branded clearance van — same livery you will see on collection day.",
}: {
  priority?: boolean;
  className?: string;
  sizes?: string;
  caption?: string | null;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm ${className}`}
    >
      <picture>
        <source type="image/webp" srcSet={srcSet} sizes={sizes} />
        <img
          src="/brand/van-1024.webp"
          srcSet={srcSet}
          sizes={sizes}
          width={VAN_WIDTH}
          height={VAN_HEIGHT}
          alt={defaultAlt}
          className="block h-auto w-full object-contain"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
      {caption ? (
        <figcaption className="px-3 py-2 text-xs text-zinc-600">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
