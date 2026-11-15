import { BinBookingWizard } from "@/components/bin-booking/BinBookingWizard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book bin or bag collection",
  description:
    "Choose services, dates or a subscription, enter your Greater Manchester postcode and pay with Stripe Checkout.",
  path: "/services/bin-collection-booking/book",
});

export default function BinBookingFlowPage() {
  return (
    <div className="section-pad bg-white">
      <div className="site-container max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Bin booking", href: "/services/bin-collection-booking" },
            { label: "Book" },
          ]}
        />
        <h1 className="mt-4 font-display text-3xl text-zinc-900 md:text-4xl">
          Book your collection
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
          Mobile-friendly flow — add services, pick dates or subscribe, then pay on Stripe (test mode on preview deploys).
        </p>
        <div className="mt-10">
          <BinBookingWizard />
        </div>
      </div>
    </div>
  );
}