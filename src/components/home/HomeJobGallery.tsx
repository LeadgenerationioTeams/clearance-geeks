import Image from "next/image";
import { homeGalleryPhotos } from "@/lib/gallery";

export function HomeJobGallery() {
  const featured = homeGalleryPhotos();

  return (
    <section id="gallery" className="section-pad bg-white">
      <div className="site-container">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl text-zinc-900 md:text-4xl">
            Recent jobs
          </h2>
          <p className="mt-3 text-zinc-600">
            Real clearance work across Greater Manchester — not stock photography.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((photo, i) => (
            <li key={photo.id}>
              <figure className="overflow-hidden rounded-xl bg-zinc-100 shadow-md ring-1 ring-zinc-200/80">
                <div className="relative aspect-[4/3] w-full min-h-[12rem]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="eager"
                    priority={i < 6}
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-zinc-700">
                  {photo.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
