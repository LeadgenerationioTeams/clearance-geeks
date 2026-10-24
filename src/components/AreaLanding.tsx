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
import { pickAreaImage, images } from "@/lib/media";
import { PageImage } from "./PageImage";
import { CallButton } from "./CallButton";
import { QuoteForm } from "./QuoteForm";
import { StickyMobileCta } from "./StickyMobileCta";

export function AreaLanding({ area }: { area: AreaDefinition }) {
  const hoods = getNeighbourhoodsForArea(area.slug);
  const showServiceLinks = serviceByTownSlugs.includes(area.slug);
  const heroImage = pickAreaImage(area.slug);

  return (
    <div className="pb-24 md:pb-10">
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-geek-lime">
              {area.boroughLabel}
            </p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {heroBenefitHeadline(area.name)}
            </h1>
            <p className="mt-4 text-lg text-zinc-300">{area.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CallButton />
              <Link
                href="#quote"
                className="inline-flex min-h-12 items-center rounded-xl border border-geek-lime px-5 font-bold text-geek-lime"
              >
                Get a written quote
              </Link>
            </div>
          </div>
          <PageImage image={heroImage} priority className="lg:mt-0" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-geek-lime">
          Why {area.name} households choose us
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {whyChooseUsForArea(area.name).map((item) => (
            <li
              key={item}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <CallButton className="text-sm" label="Call for a same-week slot" />
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-950/40 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-white">How it works</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {clearanceProcess.map((step) => (
              <li
                key={step.step}
                className="rounded-2xl border border-geek-lime/20 bg-black p-5"
              >
                <span className="font-display text-4xl text-geek-lime">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-xl text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-display text-3xl text-geek-lime">
              Clearance services in {area.name}
            </h2>
            <p className="mt-3 text-zinc-400">
              Pick a service — we will confirm access, parking and price before
              anything is loaded.
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
                    className="flex items-center justify-between rounded-xl border border-zinc-800 px-4 py-3 hover:border-geek-lime/50"
                  >
                    <span className="font-semibold text-white">{s.title}</span>
                    <span className="text-geek-lime">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <PageImage image={images.recycling} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-white">
          Local knowledge — streets, landmarks & parking
        </h2>
        <p className="mt-4 max-w-3xl text-zinc-300">{area.housingNotes}</p>
        <p className="mt-4 text-sm text-zinc-500">
          Postcodes we route daily: {area.samplePostcodes.join(", ")}
        </p>
        {area.hwrcName ? (
          <p className="mt-4 text-zinc-400">
            <strong className="text-zinc-200">{area.hwrcName}</strong>
            {area.hwrcNote ? ` — ${area.hwrcNote}` : null}
          </p>
        ) : null}
        {area.localParagraphs.map((p) => (
          <p key={p} className="mt-4 max-w-3xl text-zinc-400">{p}</p>
        ))}

        <h3 className="mt-10 font-display text-2xl text-geek-lime">
          Neighbourhoods we cover in {area.name}
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          Drill into your patch for parking notes, landmarks and typical jobs —
          each page links back here.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hoods.map((h) => (
            <li key={h.slug}>
              <Link
                href={`/areas/${area.slug}/${h.slug}`}
                className="block rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 hover:border-geek-lime/40"
              >
                <span className="font-semibold text-white">{h.name}</span>
                <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                  {h.intro}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 font-display text-2xl text-white">
          Typical jobs we see in {area.name}
        </h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
          {area.typicalJobs.map((j) => (
            <li key={j}>{j}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2">
          {area.nearbyTowns.map((t) => (
            <Link
              key={t.slug}
              href={`/areas/${t.slug}`}
              className="rounded-full border border-zinc-700 px-3 py-1 text-sm hover:border-geek-lime"
            >
              Nearby: {t.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-950/50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-geek-lime">
            {area.name} FAQs
          </h2>
          <dl className="mt-6 space-y-6">
            {area.faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-white">{f.question}</dt>
                <dd className="mt-2 text-zinc-400">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <CallButton />
          </div>
        </div>
      </section>

      <section
        id="quote"
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-white">
              Ready to clear in {area.name}?
            </h2>
            <p className="mt-3 text-zinc-400">
              Send your postcode and a photo — we reply with a price before the
              van rolls. No on-site haggling.
            </p>
            <PageImage image={images.vanStreet} className="mt-6" />
          </div>
          <QuoteForm />
        </div>
      </section>

      <StickyMobileCta />
    </div>
  );
}
