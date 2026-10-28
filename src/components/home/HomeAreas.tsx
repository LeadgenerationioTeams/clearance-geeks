import Link from "next/link";
import { areas } from "@/lib/areas";
import { focusVisibleOnLightClass } from "@/lib/focus-visible";

export function HomeAreas() {
  return (
    <section className="section-pad bg-zinc-50">
      <div className="site-container">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl text-zinc-900 md:text-4xl">
            Areas we cover
          </h2>
          <p className="mt-3 text-zinc-600">
            Borough pages with local access notes and neighbourhood links.
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/areas/${a.slug}`}
                className={`inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-geek-lime hover:text-zinc-900 ${focusVisibleOnLightClass}`}
              >
                {a.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/areas"
              className={`inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 ${focusVisibleOnLightClass}`}
            >
              All areas →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
