import Link from "next/link";
import { CallButton } from "@/components/CallButton";

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
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="#quote"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-black px-8 py-3 text-center font-bold text-white hover:bg-zinc-900"
          >
            Get a free quote
          </Link>
          <CallButton
            variant="outline-dark"
            label="Call now"
            showPhone={false}
            className="border-black text-black hover:bg-black/10"
          />
        </div>
      </div>
    </section>
  );
}
