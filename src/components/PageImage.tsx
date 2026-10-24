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
  const isLocal = image.src.startsWith("/");

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
          unoptimized={isLocal}
        />
      </div>
      <figcaption className="px-3 py-2 text-xs text-zinc-500">
        Photo:{" "}
        <a
          href={image.creditUrl}
          className="text-geek-lime underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {image.credit}
        </a>
      </figcaption>
    </figure>
  );
}
