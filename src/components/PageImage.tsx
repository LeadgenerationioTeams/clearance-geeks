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
  return (
    <figure className={`overflow-hidden rounded-2xl border border-zinc-800 ${className}`}>
      <div className="relative aspect-[16/10] w-full bg-zinc-900">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      {image.credit && image.creditUrl !== "/" ? (
        <figcaption className="px-3 py-2 text-sm text-zinc-500">
          {image.illustrative ? "Illustrative — " : "Photo: "}
          <a
            href={image.creditUrl}
            className="inline-flex min-h-[44px] items-center text-geek-lime underline py-2"
            rel="noopener noreferrer"
            target="_blank"
          >
            {image.credit}
          </a>
        </figcaption>
      ) : image.credit ? (
        <figcaption className="px-3 py-2 text-sm text-zinc-500">{image.credit}</figcaption>
      ) : null}
    </figure>
  );
}
