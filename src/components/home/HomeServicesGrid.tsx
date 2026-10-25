import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";
import { photosForServiceSlug } from "@/lib/gallery";

export function HomeServicesGrid() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl text-zinc-900 md:text-4xl">
            What we clear
          </h2>
          <p className="mt-3 text-zinc-600">
            House clearances, garden waste, office strip-outs and more — priced
            before we load.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const photo = photosForServiceSlug(s.slug);
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="home-service-card-link group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-zinc-200/80 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl text-zinc-900 group-hover:text-geek-lime">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                      {s.intro}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
