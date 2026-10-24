import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CallButton } from "@/components/CallButton";
import { TodoStats } from "@/components/TodoStats";
import { VanBrandImage } from "@/components/VanBrandImage";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { services } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Waste removal & house clearance Greater Manchester",
  description:
    "The Clearance Geeks collect rubbish, house clearances, garden waste and trade waste across Stockport, Manchester and Greater Manchester.",
  path: "/",
});

const checklist = [
  "Single items",
  "Full house clearances",
  "Garden clearance",
  "Office & commercial",
  "All types of waste",
];

const trustPoints = [
  "Licensed waste carrier — details in the footer",
  "Written quotes before we load",
  "Responsible disposal and recycling where possible",
  "Same branded van and uniformed crew",
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
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:pt-12">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <p className="font-display text-xl text-geek-lime sm:text-2xl">THE</p>
              <h1 className="font-display text-5xl leading-none text-zinc-900 sm:text-6xl lg:text-7xl">
                CLEARANCE
                <span className="block text-geek-lime drop-shadow-[2px_2px_0_#000]">
                  GEEKS
                </span>
              </h1>
              <p className="mt-3 inline-block rounded-md bg-geek-lime px-3 py-1 text-sm font-bold uppercase tracking-widest text-black">
                Waste removals
              </p>
              <p className="mt-5 max-w-xl text-lg text-zinc-700">
                Licensed waste collection and clearance for homes and businesses
                across Greater Manchester — from Stockport terraces to Manchester
                city flats. You will see our green-and-black van on the drive.
              </p>
              <div className="mt-6 hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center lg:flex">
                <CallButton />
                <Link
                  href="#quote"
                  className="text-center text-sm font-semibold text-zinc-800 underline decoration-geek-lime decoration-2 underline-offset-4"
                >
                  Or request a quote online
                </Link>
              </div>
              <TodoStats />
              <ul className="mt-8 space-y-2">
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
            <div className="order-1 space-y-6 lg:order-2">
              <QuoteForm />
              <VanBrandImage priority sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:hidden">
            <CallButton className="w-full" />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-100 py-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2 lg:items-center">
          <VanBrandImage
            caption={null}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="border-zinc-300"
          />
          <div>
            <h2 className="font-display text-3xl text-zinc-900 sm:text-4xl">
              Trust the van you book
            </h2>
            <p className="mt-3 text-zinc-700">
              Our livery matches the logo on this site — mascot, neon green and
              black. No mystery white vans: what you see online is what pulls up
              outside.
            </p>
            <ul className="mt-6 space-y-3">
              {trustPoints.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-zinc-800">
                  <span className="text-geek-lime" aria-hidden>●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
