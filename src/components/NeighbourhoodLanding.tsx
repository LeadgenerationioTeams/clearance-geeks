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
import { CallButton } from "./CallButton";
import { QuoteForm } from "./QuoteForm";
import { StickyMobileCta } from "./StickyMobileCta";
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
    <div className="pb-24 md:pb-10">
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
          <h1 className="font-display text-3xl text-geek-charcoal sm:text-4xl">
            Waste removal — {hood.name}, {area.name}
          </h1>
          <p className="mt-4 text-lg text-zinc-600">{hood.about}</p>
          <p className="mt-3 text-zinc-500">{hood.accessNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton />
            <Link
              href={`/areas/${area.slug}`}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-zinc-600 underline decoration-geek-lime decoration-2 underline-offset-4"
            >
              All of {area.name}
            </Link>
          </div>
        </div>
        <PageImage image={areaPageImage()} priority />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-geek-charcoal">Why choose us</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {whyChooseUsForArea(area.name).map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-600"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl text-geek-charcoal">How it works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {clearanceProcess.map((s) => (
              <li
                key={s.step}
                className="rounded-xl border border-zinc-200 bg-white p-4"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-geek-lime">
                  Step {s.step}
                </span>
                <p className="mt-2 font-semibold text-geek-charcoal">{s.title}</p>
                <p className="mt-1 text-sm text-zinc-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-geek-charcoal">Local reference</h2>
        {hood.landmarks.length ? (
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {hood.landmarks.map((l) => (
              <li key={l.name}>
                {l.name} —{" "}
                <a
                  href={l.source.url}
                  className="font-medium text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4"
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
        <h2 className="font-display text-2xl text-geek-charcoal">Services</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={
                  showServiceLinks
                    ? `/areas/${area.slug}/${s.slug}`
                    : `/services/${s.slug}`
                }
                className="inline-flex min-h-11 items-center font-medium text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <CallButton label="Call for a quote" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl text-geek-charcoal">FAQs</h2>
        <dl className="mt-4 space-y-4">
          {hood.faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-geek-charcoal">{f.question}</dt>
              <dd className="mt-1 text-zinc-600">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <QuoteForm />
      </section>

      <StickyMobileCta />
    </div>
  );
}
