import Link from "next/link";
import type { AreaDefinition } from "@/lib/areas";
import type { NeighbourhoodDefinition } from "@/lib/neighbourhoods";
import { serviceByTownSlugs } from "@/lib/areas";
import { services } from "@/lib/services";
import {
  clearanceProcess,
  whyChooseUsForArea,
} from "@/lib/area-sales";
import { areaPageImage, images } from "@/lib/media";
import { PageImage } from "./PageImage";
import { QuoteForm } from "./QuoteForm";
import { Breadcrumbs } from "./Breadcrumbs";
import { RecyclingCentreBlock } from "./RecyclingCentreBlock";

export function NeighbourhoodLanding({
  area,
  hood,
}: {
  area: AreaDefinition;
  hood: NeighbourhoodDefinition;
}) {
  const showServiceLinks = serviceByTownSlugs.includes(area.slug);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Areas", href: "/areas" },
            { label: area.name, href: `/areas/${area.slug}` },
            { label: hood.name },
          ]}
        />
      </div>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-display text-4xl text-geek-lime sm:text-5xl">
            Waste removal — {hood.name}, {area.name}
          </h1>
          <p className="mt-4 text-lg text-zinc-300">{hood.about}</p>
          <p className="mt-3 text-zinc-400">{hood.accessNote}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="#quote"
              className="inline-flex min-h-11 items-center rounded-xl bg-geek-lime px-5 font-bold text-black"
            >
              Get a quote
            </Link>
            <Link
              href={`/areas/${area.slug}`}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-zinc-400 underline"
            >
              All of {area.name}
            </Link>
          </div>
        </div>
        <PageImage image={areaPageImage()} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-white">Why choose us</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {whyChooseUsForArea(area.name).map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-950/40 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl text-white">How it works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {clearanceProcess.map((s) => (
              <li key={s.step} className="rounded-xl border border-zinc-800 p-4">
                <span className="text-geek-lime font-display text-2xl">
                  {s.step}
                </span>
                <p className="mt-2 font-semibold text-white">{s.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-geek-lime">Local reference</h2>
        {hood.landmarks.length ? (
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            {hood.landmarks.map((l) => (
              <li key={l.name}>
                {l.name} —{" "}
                <a
                  href={l.source.url}
                  className="text-geek-lime underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {l.source.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">
            No third-party landmark citations on this page yet — use your postcode
            and access notes when you enquire.
          </p>
        )}
        <div className="mt-6 max-w-xl">
          <RecyclingCentreBlock areaSlug={area.slug} />
        </div>
        <PageImage image={images.gardenWaste} className="mt-8 max-w-xl" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-white">Services</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={
                  showServiceLinks
                    ? `/areas/${area.slug}/${s.slug}`
                    : `/services/${s.slug}`
                }
                className="text-geek-lime underline"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-geek-lime">FAQs</h2>
        <dl className="mt-4 space-y-4">
          {hood.faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-white">{f.question}</dt>
              <dd className="mt-1 text-zinc-400">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="quote" className="mx-auto max-w-6xl px-4 py-10">
        <QuoteForm />
      </section>
    </div>
  );
}
