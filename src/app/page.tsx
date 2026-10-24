import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { SplashBackground } from "@/components/SplashBackground";
import { CallButton } from "@/components/CallButton";
import { TodoStats } from "@/components/TodoStats";
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

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <SplashBackground />
      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-geek-lime font-display text-xl sm:text-2xl -rotate-2 w-fit">
              THE
            </p>
            <h1 className="font-display text-5xl leading-none text-white drop-shadow-[3px_3px_0_#000] sm:text-7xl">
              CLEARANCE
              <span className="block text-geek-lime">GEEKS</span>
            </h1>
            <p className="mt-4 inline-block rounded-md bg-geek-lime px-3 py-1 text-sm font-bold uppercase tracking-widest text-black">
              Waste removals
            </p>
            <p className="mt-6 max-w-xl text-lg text-zinc-300">
              Licensed waste collection and clearance for homes and businesses
              across Greater Manchester — from Stockport terraces to Manchester
              city flats. Big green van energy, tidy crews, responsible disposal.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CallButton />
              <Link
                href="#quote"
                className="text-center text-sm font-semibold text-geek-lime underline"
              >
                Or request a quote online
              </Link>
            </div>
            <TodoStats />
            <ul className="mt-8 space-y-2">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white"
                >
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-geek-lime text-xs text-black"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-950/50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-geek-lime sm:text-4xl">
            What we clear
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-zinc-800 bg-black p-5 transition hover:border-geek-lime/60"
              >
                <p className="font-display text-xl text-white group-hover:text-geek-lime">
                  {s.title}
                </p>
                <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
                  {s.intro}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-zinc-500">
            Covering{" "}
            <Link href="/areas/stockport" className="text-geek-lime underline">
              Stockport
            </Link>
            ,{" "}
            <Link href="/areas/manchester" className="text-geek-lime underline">
              Manchester
            </Link>{" "}
            and{" "}
            <Link href="/areas" className="text-geek-lime underline">
              surrounding boroughs
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
