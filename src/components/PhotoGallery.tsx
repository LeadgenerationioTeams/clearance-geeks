import { siteConfig } from "@/config/site";
import { gallerySlice } from "@/lib/gallery";
import { JobPhoto } from "./JobPhoto";

export function PhotoGallery({
  title = "Recent clearance work",
  count = 8,
}: {
  title?: string;
  count?: number;
}) {
  const photos = gallerySlice(0, count);

  return (
    <section className="border-t border-zinc-200 bg-zinc-50 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl text-zinc-900 sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
          Real jobs from our crews — house clearances, garden waste and bulky
          collections across {siteConfig.serviceAreas.region}.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo) => (
            <JobPhoto
              key={photo.id}
              photo={photo}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
