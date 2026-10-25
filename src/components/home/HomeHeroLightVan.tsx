import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/config/site";
import { limeButtonOnLightClass } from "@/lib/lime-button";
import { images } from "@/lib/media";

const vanAlt = images.clearanceGeeksVan.alt;

const VAN_WIDTH = 1206;
const VAN_HEIGHT = 1010;

/** 1440 desktop frame — full column width, ~470px tall at ~564px (819:686). */
const DESKTOP_VAN_FRAME_WIDTH = 819;
const DESKTOP_VAN_FRAME_HEIGHT = 686;

export function HomeHeroLightVan() {
  return (
    <section className="bg-[#F7F8F6] text-[#111]">
      <div className="site-container w-full py-6 md:py-8 lg:pt-9 lg:pb-2">
        <div className="flex flex-col gap-6 lg:gap-2">
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

          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10">
            <div className="flex max-w-xl flex-col gap-5 lg:gap-1.5">
              <div>
                <h1
                  className="font-display text-[2.125rem] leading-[2.375rem] tracking-tight sm:text-[2.25rem] sm:leading-[2.5rem] lg:max-w-[22ch] lg:text-[3.5rem] lg:leading-[3.625rem]"
                >
                  Waste removal &amp; house clearance across{" "}
                  <span
                    className="underline decoration-geek-lime decoration-[3px] underline-offset-[6px]"
                  >
                    {siteConfig.serviceAreas.region}
                  </span>
                </h1>
                <p className="mt-3 text-base text-[#111]/80 md:mt-4 lg:mt-6 md:text-lg">
                  Fast quotes, tidy crews and responsible disposal for homes and
                  businesses.
                </p>
              </div>

              <p className="lg:hidden">
                <Link
                  href="#quote"
                  className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl px-8 py-3 text-base font-extrabold uppercase tracking-wide shadow-[0_0_24px_rgba(139,230,0,0.35)] sm:w-auto ${limeButtonOnLightClass}`}
                >
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

            <figure
              className="relative hidden aspect-[819/686] w-full self-start overflow-hidden rounded-2xl lg:block"
            >
              <Image
                src="/brand/van-1400.webp"
                alt={vanAlt}
                width={DESKTOP_VAN_FRAME_WIDTH}
                height={DESKTOP_VAN_FRAME_HEIGHT}
                priority
                sizes="(min-width: 1024px) 50vw, 0px"
                className="h-full w-full object-cover object-[60%_50%]"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
