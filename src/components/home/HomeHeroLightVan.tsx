import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/config/site";
import { images } from "@/lib/media";
import {
  lightVanHeroDesktop,
  lightVanHeroMobile,
} from "@/lib/light-van-brand";

const vanAlt = images.clearanceGeeksVan.alt;

const ctaFocus =
  "focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]";

export function HomeHeroLightVan() {
  return (
    <section className="bg-[#F7F8F6] text-[#111]">
      <div className="site-container w-full py-6 md:py-8 lg:py-10">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-12">
          <figure
            className="order-1 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:hidden"
          >
            <Image
              src={lightVanHeroMobile.src}
              alt={vanAlt}
              width={lightVanHeroMobile.width}
              height={lightVanHeroMobile.height}
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-[70%_0%]"
            />
          </figure>

          <div className="order-2 flex min-h-0 flex-col gap-5 lg:order-1 lg:gap-6">
            <div className="max-w-xl shrink-0">
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

            <p className="lg:hidden">
              <Link
                href="#quote"
                className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-geek-lime px-8 py-3 text-base font-extrabold uppercase tracking-wide text-black shadow-[0_0_24px_rgba(139,230,0,0.35)] transition hover:bg-geek-lime-bright sm:w-auto ${ctaFocus}`}
              >
                Get a free quote
              </Link>
            </p>

            <div className="min-h-0 flex-1 lg:flex lg:flex-col">
              <QuoteForm
                id="quote"
                variant="hero"
                compactDesktop
                title="Get a free quote"
                className="lg:mt-0"
              />
            </div>
          </div>

          <figure
            className="relative order-1 hidden min-h-0 overflow-hidden rounded-2xl lg:order-2 lg:col-start-2 lg:block lg:min-h-full"
          >
            <Image
              src={lightVanHeroDesktop.src}
              alt={vanAlt}
              width={lightVanHeroDesktop.width}
              height={lightVanHeroDesktop.height}
              priority
              sizes="(min-width: 1024px) 50vw, 0px"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
