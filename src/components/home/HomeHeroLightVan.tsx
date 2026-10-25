import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/config/site";
import { images } from "@/lib/media";
import { LightVanDesktopVan } from "./LightVanDesktopVan";

const vanAlt = images.clearanceGeeksVan.alt;

const VAN_WIDTH = 1206;
const VAN_HEIGHT = 1010;

const ctaClass =
  "inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#111] bg-geek-lime px-8 py-3 text-base font-extrabold uppercase tracking-wide text-[#111] shadow-[0_0_24px_rgba(139,230,0,0.35)] transition hover:bg-geek-lime-bright sm:w-auto focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]";

export function HomeHeroLightVan() {
  return (
    <section className="bg-[#F7F8F6] text-[#111]">
      <div className="site-container w-full py-6 md:py-8 lg:py-6">
        <div className="flex flex-col gap-6 lg:gap-6">
          <figure
            className="aspect-[16/13] w-full overflow-hidden rounded-2xl lg:hidden"
          >
            <Image
              src="/brand/van-1400.webp"
              alt={vanAlt}
              width={VAN_WIDTH}
              height={VAN_HEIGHT}
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-[70%_0%]"
            />
          </figure>

          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:gap-y-5">
            <div
              id="hero-light-copy"
              className="max-w-xl lg:col-start-1 lg:row-start-1"
            >
              <h1
                className="font-display text-[2.125rem] leading-[2.375rem] tracking-tight sm:text-[2.25rem] sm:leading-[2.5rem] lg:max-w-[22ch] lg:text-[3.5rem] lg:leading-[3.75rem]"
              >
                Waste removal &amp; house clearance across{" "}
                <span
                  className="underline decoration-geek-lime decoration-[3px] underline-offset-[6px]"
                >
                  {siteConfig.serviceAreas.region}
                </span>
              </h1>
              <p className="mt-3 text-base text-[#111]/80 md:mt-4 md:text-lg">
                Fast quotes, tidy crews and responsible disposal for homes and
                businesses.
              </p>
            </div>

            <div className="lg:col-start-2 lg:row-start-1">
              <LightVanDesktopVan copyId="hero-light-copy" alt={vanAlt} />
            </div>

            <div className="flex flex-col gap-5 lg:col-start-1 lg:row-start-2">
              <p className="lg:hidden">
                <Link href="#quote" className={ctaClass}>
                  Get a free quote
                </Link>
              </p>

              <QuoteForm
                id="quote"
                variant="hero"
                compactDesktop
                title="Get a free quote"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
