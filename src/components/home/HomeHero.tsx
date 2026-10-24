import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CallButton } from "@/components/CallButton";
import { siteConfig } from "@/config/site";

const vanAlt =
  "The Clearance Geeks branded white van with black and neon green waste removals livery and geek mascot";

export function HomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-zinc-950 lg:flex lg:min-h-[min(calc(100dvh-4rem),720px)] lg:items-center"
    >
      <Image
        src="/brand/van-1400.webp"
        alt={vanAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_42%] sm:object-[68%_40%] lg:object-[58%_38%]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/75 to-zinc-950/78 lg:bg-gradient-to-r lg:from-zinc-950/92 lg:via-zinc-950/78 lg:to-zinc-950/45"
        aria-hidden
      />
      <div className="site-container relative z-10 w-full pb-10 pt-8 md:pb-12 md:pt-10 lg:pb-6 lg:pt-5">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-5">
          <div className="max-w-xl text-white">
            <h1 className="font-display text-[2.25rem] leading-[1.08] tracking-tight md:text-5xl lg:max-w-[22ch] lg:text-[3.5rem]">
              Waste removal &amp; house clearance across{" "}
              {siteConfig.serviceAreas.region}
            </h1>
            <p className="mt-4 text-base text-zinc-200 md:text-lg">
              Fast quotes, tidy crews and responsible disposal for homes and
              businesses.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href="#quote"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-geek-lime px-8 py-3 text-center text-base font-extrabold uppercase tracking-wide text-black shadow-lg transition hover:bg-geek-lime-bright md:text-lg"
              >
                Get a free quote
              </Link>
              <CallButton variant="outline" label="Call now" showPhone={false} />
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <QuoteForm
              id="quote"
              compactDesktop
              className="shadow-2xl ring-1 ring-white/10"
              title="Get a free quote"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
