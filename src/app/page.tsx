import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CallButton } from "@/components/CallButton";
import { TodoStats } from "@/components/TodoStats";
import { VanBrandImage } from "@/components/VanBrandImage";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { BrandLogo } from "@/components/BrandLogo";
import { TrustStrip } from "@/components/TrustStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { PhotoGallery } from "@/components/PhotoGallery";
import { services } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Waste removal & house clearance Greater Manchester",
  description:
    "The Clearance Geeks collect rubbish, house clearances, garden waste and trade waste across Stockport, Manchester and Greater Manchester.",
  path: "/",
});

const checklist = [
  "Full house clearances",
  "Garden clearance",
  "Office & commercial",
  "All types of waste",
];

const faq = [
  {
    q: "What areas do you cover?",
    a: "Greater Manchester including Stockport, Manchester and surrounding boroughs. See our areas page for towns and neighbourhoods.",
  },
  {
    q: "How do I get a price?",
    a: "Call us or send the quote form with your postcode and a short description. Photos help us size the job.",
  },
  {
    q: "Do you take single items?",
    a: "Yes — sofas, fridges, mattresses and small loads are all fine.",
  },
];

export default function HomePage() {
  return (
    <div className="pb-24 md:pb-10">
      <TrustStrip />

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:pt-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <BrandLogo variant="hero" linked={false} />
              <h1 className="mt-4 font-display text-4xl leading-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Waste removal &amp; house clearance across Greater Manchester
              </h1>
              <p className="mt-4 max-w-xl text-lg text-zinc-700">
                Fast quotes, tidy crews and responsible disposal for homes and
                businesses — from Stockport terraces to Manchester city flats.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CallButton />
                <Link
                  href="#quote"
                  className="text-center text-sm font-semibold text-zinc-800 underline decoration-geek-lime decoration-2 underline-offset-4"
                >
                  Or request a quote online
                </Link>
              </div>
              <TodoStats />
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-800"
                  >
                    <span
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-geek-lime text-xs text-black"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:sticky lg:top-24">
              <QuoteForm />
            </div>
          </div>

          <VanBrandImage
            priority
            className="mt-10 border-zinc-200"
            sizes="(max-width: 1024px) 100vw, 1152px"
            caption="Our Clearance Geeks fleet van — same mascot and colours as the logo above."
          />
        </div>
      </section>

      <HowItWorks />
      <PhotoGallery />

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-zinc-900 sm:text-4xl">
            What we clear
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-geek-lime/60 hover:shadow-md"
              >
                <p className="font-display text-xl text-zinc-900 group-hover:text-geek-lime">
                  {s.title}
                </p>
                <p className="mt-2 text-sm text-zinc-600 line-clamp-3">
                  {s.intro}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-zinc-600">
            Covering{" "}
            <Link href="/areas/stockport" className="font-semibold text-zinc-900 underline decoration-geek-lime">
              Stockport
            </Link>
            ,{" "}
            <Link href="/areas/manchester" className="font-semibold text-zinc-900 underline decoration-geek-lime">
              Manchester
            </Link>{" "}
            and{" "}
            <Link href="/areas" className="font-semibold text-zinc-900 underline decoration-geek-lime">
              surrounding boroughs
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl text-zinc-900">Common questions</h2>
          <dl className="mt-8 space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-zinc-900">{item.q}</dt>
                <dd className="mt-1 text-sm text-zinc-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <StickyMobileCta />
    </div>
  );
}
