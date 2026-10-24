import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CallButton } from "@/components/CallButton";
import { VanBrandImage } from "@/components/VanBrandImage";
import { siteConfig } from "@/config/site";

export function HomeHero() {
  return (
    <section className="bg-zinc-950">
      <div className="site-container pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="max-w-xl text-white">
            <h1 className="font-display text-[2.25rem] leading-[1.08] tracking-tight md:text-5xl lg:max-w-[22ch] lg:text-[3.5rem]">
              Waste removal &amp; house clearance across{" "}
              {siteConfig.serviceAreas.region}
            </h1>
            <p className="mt-4 text-base text-zinc-300 md:text-lg">
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

            <VanBrandImage
              priority
              caption={null}
              sizes="(max-width: 1024px) 100vw, 520px"
              className="mt-8 border-white/10 bg-black ring-1 ring-white/10"
            />
          </div>

          <div className="lg:sticky lg:top-24">
            <QuoteForm
              id="quote"
              className="shadow-2xl ring-1 ring-white/10"
              title="Get a free quote"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
