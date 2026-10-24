import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CallButton } from "@/components/CallButton";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/brand/van-1400.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/35 lg:via-black/65 lg:to-transparent"
          aria-hidden
        />
      </div>

      <div className="site-container relative grid gap-8 pb-12 pt-10 md:pb-16 md:pt-14 lg:min-h-[min(88vh,820px)] lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-20 lg:pt-16">
        <div className="max-w-xl text-white">
          <h1 className="font-display text-[2.25rem] leading-[1.08] tracking-tight md:text-5xl lg:max-w-[22ch] lg:text-[3.5rem]">
            Waste removal &amp; house clearance across Greater Manchester
          </h1>
          <p className="mt-4 text-base text-zinc-200 md:text-lg">
            Fast quotes, tidy crews and responsible disposal for homes and
            businesses.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#quote"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-geek-lime px-8 py-3 text-center text-base font-extrabold uppercase tracking-wide text-black shadow-lg transition hover:bg-geek-lime-bright md:text-lg"
            >
              Get a free quote
            </Link>
            <CallButton variant="outline" label="Call now" showPhone={false} />
          </div>
        </div>

        <div className="relative z-10 lg:-mr-6 lg:translate-y-4 xl:-mr-10">
          <QuoteForm
            id="quote"
            className="shadow-2xl ring-1 ring-white/20"
            title="Get a free quote"
          />
        </div>
      </div>
    </section>
  );
}
