import Image from "next/image";
import type { SiteImage } from "@/lib/media";

export function PageImage({
  image,
  priority,
  className = "",
}: {
  image: SiteImage;
  priority?: boolean;
  className?: string;
}) {
  const creditHref =
    image.creditUrl.startsWith("http://") ||
    image.creditUrl.startsWith("https://")
      ? image.creditUrl
      : null;

  return (
    <figure className={`overflow-hidden rounded-2xl border border-zinc-800 ${className}`}>
      <div className="relative aspect-[16/10] w-full bg-zinc-900">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, min(50vw, 36rem)"
          priority={priority}
        />
      </div>
      {image.credit ? (
        <figcaption className="px-3 py-2 text-base text-zinc-500">
          {image.illustrative ? "Illustrative — " : "Photo: "}
          {creditHref ? (
            <a
              href={creditHref}
              className="text-geek-lime underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {image.credit}
            </a>
          ) : (
            image.credit
          )}
        </figcaption>
      ) : null}
    </figure>
  );
}
