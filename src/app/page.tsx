import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CallButton } from "@/components/CallButton";
import { VanBrandImage } from "@/components/VanBrandImage";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { TrustStrip } from "@/components/TrustStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { PhotoGallery } from "@/components/PhotoGallery";
import { JobPhoto } from "@/components/JobPhoto";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { photosForServiceSlug } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";
import {
  brandName,
  buildDefaultDescription,
  company,
  complianceCopy,
  formatServiceAreasCommaList,
  region,
} from "@/config/site";

export const metadata = buildMetadata({
  title: `Waste removal & house clearance — ${region}`,
  description: buildDefaultDescription(),
  path: "/",
});

const heroTrust = [
  "Written quotes before we load",
  "Single items through to full house clearances",
  "Responsible disposal — recycling where facilities allow",
];

const trustDetails = [
  {
    title: "Written quotes",
    body:
      "You agree a price before we load. If the job changes on site, we discuss it with you first — no surprise extras.",
  },
  {
    title: "Waste transfer notes",
    body:
      "Commercial and trade customers can request waste transfer documentation when required. Mention it at booking.",
  },
  {
    title: "Recycling & disposal",
    body:
      "We segregate reusable and recyclable material where facilities allow. Hazardous waste types are excluded — ask if unsure.",
  },
];

export default function HomePage() {
  const areaList = formatServiceAreasCommaList();

  const faq = [
    {
      q: "What areas do you cover?",
      a: `We work across ${region}, including ${areaList}. See our areas page for borough pages.`,
    },
    {
      q: "How do I get a price?",
      a: "Call us or send the quote form with your postcode and a short description. Photos help us size the job.",
    },
    {
      q: "Do you take single items?",
      a: "Yes — sofas, fridges, mattresses and small loads are all fine when access and parking allow.",
    },
  ];

  return (
    <div className="pb-24 md:pb-12">
      <TrustStrip />

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                  {brandName} — {region}
                </p>
                <h1 className="mt-3 font-display text-3xl leading-tight text-geek-charcoal sm:text-4xl lg:text-5xl">
                  Waste removal &amp; house clearance across {region}
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600">
                  Fast quotes, tidy crews and responsible disposal for homes and
                  businesses across our service areas.
                </p>
              </div>

              <ul className="space-y-3">
                {heroTrust.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 sm:text-base"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-geek-lime/40 text-xs text-geek-lime"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <CallButton />
                <Link
                  href="#quote"
                  className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4"
                >
                  Or request a quote online
                </Link>
              </div>

              <VanBrandImage
                priority
                className="max-w-md border-zinc-200"
                sizes="(max-width: 1024px) 90vw, 400px"
                caption="Our branded clearance van — same livery you will see on collection day."
              />
            </div>

            <div className="lg:sticky lg:top-24">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="border-t border-zinc-200 bg-zinc-50 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl text-geek-charcoal sm:text-3xl">
            What we clear
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">
            House clearances, garden waste, office strip-outs, builders&apos;
            waste, general junk and single-item collections.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const photo = photosForServiceSlug(s.slug);
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md"
                >
                  <JobPhoto
                    photo={photo}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rounded-none border-0 shadow-none"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-display text-lg text-geek-charcoal group-hover:text-zinc-700">
                      {s.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                      {s.intro}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-geek-charcoal decoration-geek-lime decoration-2 underline-offset-4 group-hover:underline">
                      View service
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl text-geek-charcoal sm:text-3xl">
            Areas we cover
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">
            Coverage across {region}: {areaList}.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="flex min-h-11 items-center rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-geek-charcoal transition hover:border-zinc-300 hover:bg-white"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-600">
            <Link
              href="/areas"
              className="font-semibold text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4"
            >
              Browse all area pages
            </Link>
          </p>
        </div>
      </section>

      <PhotoGallery />

      <section className="border-t border-zinc-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl text-geek-charcoal sm:text-3xl">
            How we work with you
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {trustDetails.map((item) => (
              <div
                key={item.title}
                className="border-t-2 border-geek-lime pt-4"
              >
                <h3 className="font-display text-lg text-geek-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-zinc-500">
            {company.legalName} — {complianceCopy.wasteCarrierNote}
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-2xl text-geek-charcoal sm:text-3xl">
            Common questions
          </h2>
          <dl className="mt-8 space-y-8">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-geek-charcoal">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <StickyMobileCta />
    </div>
  );
}
