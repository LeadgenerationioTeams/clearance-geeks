import Link from "next/link";
import type { AreaDefinition } from "@/lib/areas";
import { serviceByTownSlugs } from "@/lib/areas";
import { services } from "@/lib/services";
import { getNeighbourhoodsForArea } from "@/lib/neighbourhoods";
import {
  clearanceProcess,
  heroBenefitHeadline,
  whyChooseUsForArea,
} from "@/lib/area-sales";
import { photosForTag, gallerySlice } from "@/lib/gallery";
import { JobPhoto } from "./JobPhoto";
import { VanBrandImage } from "./VanBrandImage";
import { QuoteForm } from "./QuoteForm";
import { RecyclingCentreBlock } from "./RecyclingCentreBlock";
import { lvCn } from "@/lib/light-van-page-theme";

export function AreaLanding({ area }: { area: AreaDefinition }) {
  const hoods = getNeighbourhoodsForArea(area.slug);
  const showServiceLinks = serviceByTownSlugs.includes(area.slug);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-widest ${lvCn(
                "text-zinc-700",
                "text-geek-lime",
              )}`}
            >
              {area.boroughLabel}
            </p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              {heroBenefitHeadline(area.name)}
            </h1>
            <p className="mt-4 text-lg text-zinc-700">{area.summary}</p>
            <div className="mt-6">
              <Link
                href="#quote"
                className="inline-flex min-h-12 items-center rounded-xl border-2 border-zinc-900 px-5 font-bold text-zinc-900"
              >
                Get a written quote
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <JobPhoto
              photo={photosForTag("house-clearance", 1)[0]}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <VanBrandImage sizes="(max-width: 1024px) 100vw, 50vw" caption={null} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-zinc-900">
          Why choose us in {area.name}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {whyChooseUsForArea(area.name).map((item) => (
            <li
              key={item}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-zinc-700 shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-zinc-900">How it works</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {clearanceProcess.map((step, index) => (
              <li
                key={step.step}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <JobPhoto
                  photo={gallerySlice(index, 1)[0]}
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="mb-4"
                />
                <span
                  className={`font-display text-4xl ${lvCn("text-[#111]", "text-geek-lime")}`}
                >
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-xl text-zinc-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-display text-3xl text-zinc-900">
              Clearance services in {area.name}
            </h2>
            <p className="mt-3 text-zinc-600">
              Select a service type — we confirm access and price before loading.
            </p>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={
                      showServiceLinks
                        ? `/areas/${area.slug}/${s.slug}`
                        : `/services/${s.slug}`
                    }
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 hover:border-geek-lime/50"
                  >
                    <span className="font-semibold text-zinc-900">{s.title}</span>
                    <span className={lvCn("text-[#111]", "text-geek-lime")}>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <JobPhoto photo={photosForTag("garden-waste", 1)[0]} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-zinc-900">
          Access, postcodes & local reference
        </h2>
        <p className="mt-4 max-w-3xl text-zinc-700">{area.accessNotes}</p>
        <p className="mt-4 text-sm text-zinc-500">
          Outward postcode districts for this page:{" "}
          {area.postcodeDistricts.join(", ")} — confirm your full postcode when
          booking.
        </p>
        <div className="mt-6 max-w-xl">
          <RecyclingCentreBlock areaSlug={area.slug} />
        </div>

        <h3 className="mt-10 font-display text-2xl text-zinc-900">
          Neighbourhood pages in {area.name}
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          Each link opens a focused page with access notes and cited landmarks
          where available.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hoods.map((h) => (
            <li key={h.slug}>
              <Link
                href={`/areas/${area.slug}/${h.slug}`}
                className="block rounded-xl border border-zinc-200 bg-white px-4 py-3 hover:border-geek-lime/40"
              >
                <span className="font-semibold text-zinc-900">{h.name}</span>
                <p className="mt-1 text-sm text-zinc-600 line-clamp-3">
                  {h.about}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2">
          {area.nearbyTowns.map((t) => (
            <Link
              key={t.slug}
              href={`/areas/${t.slug}`}
              className={`inline-flex min-h-11 items-center rounded-full border px-3 py-2 text-sm ${lvCn(
                "border-zinc-300 text-zinc-800 hover:border-zinc-500",
                "border-zinc-700 hover:border-geek-lime",
              )}`}
            >
              Nearby: {t.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-zinc-900">
            {area.name} FAQs
          </h2>
          <dl className="mt-6 space-y-6">
            {area.faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-zinc-900">{f.question}</dt>
                <dd className="mt-2 text-zinc-600">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-zinc-900">
              Request a quote for {area.name}
            </h2>
            <p className="mt-3 text-zinc-600">
              Postcode, photos and access notes are enough for a written quote
              before collection.
            </p>
            <VanBrandImage className="mt-6" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
