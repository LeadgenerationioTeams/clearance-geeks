import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/config/site";

const vanAlt =
  "The Clearance Geeks branded white van with black and neon green waste removals livery and geek mascot";

export function HomeHero() {
  return (
    <section
      className="home-hero relative isolate overflow-x-hidden overflow-y-visible bg-zinc-950 lg:flex lg:min-h-[min(calc(100dvh-4rem),720px)] lg:items-center"
    >
      <Image
        src="/brand/van-1400.webp"
        alt={vanAlt}
        fill
        priority
        fetchPriority="high"
        decoding="sync"
        sizes="100vw"
        className="object-cover object-[72%_42%] sm:object-[68%_40%] lg:object-[58%_38%]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/75 to-zinc-950/78 lg:bg-gradient-to-r lg:from-zinc-950/92 lg:via-zinc-950/78 lg:to-zinc-950/45"
        aria-hidden
      />
      <div className="site-container relative z-10 w-full pb-[calc(2rem+var(--cookie-consent-bar-height))] pt-6 md:pb-[calc(2.5rem+var(--cookie-consent-bar-height))] md:pt-8 lg:pb-[calc(1.5rem+var(--cookie-consent-bar-height))] lg:pt-5">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-5">
          <div className="max-w-xl text-white">
            <h1 className="font-display text-[2rem] leading-[1.08] tracking-tight sm:text-[2.25rem] md:text-5xl lg:max-w-[22ch] lg:text-[3.5rem]">
              Waste removal &amp; house clearance across{" "}
              {siteConfig.serviceAreas.region}
            </h1>
            <p className="mt-3 text-base text-zinc-200 md:mt-4 md:text-lg">
              Fast quotes, tidy crews and responsible disposal for homes and
              businesses.
            </p>
          </div>

          <div className="hero-quote-panel overflow-visible p-[3px] lg:sticky lg:top-24">
            <QuoteForm id="quote" variant="hero" title="Get a free quote" />
          </div>
        </div>
      </div>
    </section>
  );
}
