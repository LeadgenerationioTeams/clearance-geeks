import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServicePriceCompare } from "@/components/bin-booking/PriceCompare";
import {
  BIN_BOOKING_SERVICES,
  binBookingConfig,
} from "@/config/bin-booking";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { limeButtonOnLightClass } from "@/lib/lime-button";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Bin & bag collection booking",
  description:
    `Book and pay online for extra bin and bag collections across ${siteConfig.serviceAreas.region}. One-off visits or subscribe and save 15% on recurring bag and bin emptying.`,
  path: "/services/bin-collection-booking",
});

const faqs = [
  {
    q: "What do you collect?",
    a: "Overflowing or contaminated wheelie bins, extra bags the council will not take, large bins where agreed, plus single beds and mattresses as booked.",
  },
  {
    q: "What is excluded?",
    a: "Hazardous waste, asbestos, clinical waste, fuel, chemicals and similar materials are excluded. Ask us if you are unsure about paint tins or gas bottles.",
  },
  {
    q: "How do subscriptions work?",
    a: "Choose weekly, fortnightly or monthly collections for bags and standard or large bin empties. You save 15% versus the one-off price. Pause or cancel any time through the secure Stripe customer portal.",
  },
  {
    q: "Which areas are covered?",
    a: "Greater Manchester including Tameside, Stockport, Manchester and surrounding boroughs. Enter your postcode in the booking form to confirm.",
  },
  {
    q: "Are the prices final?",
    a: "Yes. The prices on each service card are what you pay. You will see the full total before paying.",
  },
];

export default function BinCollectionBookingPage() {
  return (
    <div className="section-pad bg-zinc-50">
      <div className="site-container max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Bin & bag booking" },
          ]}
        />
        <p className="mt-4 inline-block rounded-full bg-geek-lime/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-900">
          {binBookingConfig.subscriptionHeadline}
        </p>
        <h1 className="mt-4 font-display text-4xl text-zinc-900 md:text-5xl">
          Book bin & bag collections online
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-700">
          When the council cannot take extra bags, wrong waste in the wrong bin, or an overflowing wheelie bin,
          book a paid collection across {siteConfig.serviceAreas.region} and pay securely online.
        </p>
        <Link
          href="/services/bin-collection-booking/book"
          className={cn(
            "mt-8 inline-flex min-h-12 items-center justify-center rounded-xl px-8 text-sm font-extrabold uppercase tracking-wide",
            limeButtonOnLightClass,
          )}
        >
          Start booking
        </Link>

        <section className="mt-14" aria-labelledby="booking-services">
          <h2 id="booking-services" className="font-display text-3xl text-zinc-900">
            Services & prices
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {BIN_BOOKING_SERVICES.map((svc) => (
              <li
                key={svc.id}
                className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display text-xl text-zinc-900">{svc.name}</h3>
                <p className="mt-2 text-sm text-zinc-600">{svc.shortDescription}</p>
                <div className="mt-4 flex-1">
                  <ServicePriceCompare serviceId={svc.id} />
                </div>
                {svc.subscriptionEligible ? (
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-geek-lime">
                    {binBookingConfig.subscriptionHeadline}
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-zinc-500">One-off booking only</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="booking-faq">
          <h2 id="booking-faq" className="font-display text-3xl text-zinc-900">
            FAQs
          </h2>
          <dl className="mt-6 space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-zinc-900">{item.q}</dt>
                <dd className="mt-2 text-sm text-zinc-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}