import Image from "next/image";
import { jobPhotos } from "@/lib/gallery";

const captions: Record<string, string> = {
  "clearance-01": "House clearance — before collection",
  "7585": "Room cleared — before",
  "7586": "Same job — after",
  "live-1": "Property cleared",
  "8035": "Garden waste removal",
  "8173": "Mixed load ready to go",
  "7851": "Loaded for responsible disposal",
  "7786": "Bulky furniture clearance",
};

export function HomeJobGallery() {
  const featured = jobPhotos.filter((p) =>
    [
      "clearance-01",
      "7585",
      "7586",
      "live-1",
      "8035",
      "8173",
      "7851",
      "7786",
      "live-0",
    ].includes(p.id),
  );

  return (
    <section id="gallery" className="section-pad bg-white">
      <div className="site-container">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl text-zinc-900 md:text-4xl">
            Before &amp; after / recent jobs
          </h2>
          <p className="mt-3 text-zinc-600">
            Real clearance work across Greater Manchester — not stock photography.
          </p>
        </div>
        <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {featured.map((photo, i) => (
            <li
              key={photo.id}
              className={`mb-4 break-inside-avoid ${i % 5 === 0 ? "sm:col-span-1" : ""}`}
            >
              <figure className="overflow-hidden rounded-xl bg-zinc-100 shadow-md ring-1 ring-zinc-200/80">
                <div
                  className={`relative w-full ${i % 4 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-zinc-700">
                  {captions[photo.id] ?? photo.alt}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
