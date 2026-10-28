import Image from "next/image";
import type { JobPhoto as JobPhotoType } from "@/lib/gallery";

export function JobPhoto({
  photo,
  priority,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  photo: JobPhotoType;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 ${className}`}>
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </div>
    </figure>
  );
}
