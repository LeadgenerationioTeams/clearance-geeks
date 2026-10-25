import Link from "next/link";
import { focusVisibleOnLightClass } from "@/lib/focus-visible";

export function HomeCtaBand() {
  return (
    <section className="bg-geek-lime">
      <div className="site-container flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-16">
        <div>
          <h2 className="font-display text-3xl text-black md:text-4xl">
            Ready for a free quote?
          </h2>
          <p className="mt-2 max-w-xl text-base text-black/80 md:text-lg">
            Send photos and your postcode — we will confirm price before we load.
          </p>
        </div>
        <Link
          href="#quote"
          className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-black px-8 py-3 text-center font-bold text-white hover:bg-zinc-900 sm:w-auto ${focusVisibleOnLightClass}`}
        >
          Get a free quote
        </Link>
      </div>
    </section>
  );
}
