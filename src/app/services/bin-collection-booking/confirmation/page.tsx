import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBooking } from "@/lib/bin-booking/store";
import { formatMoney } from "@/lib/bin-booking/pricing";
import { getBinBookingService } from "@/config/bin-booking";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { limeButtonOnLightClass } from "@/lib/lime-button";
import { ManageSubscriptionPortal } from "@/components/bin-booking/ManageSubscriptionPortal";

export const metadata = buildMetadata({
  title: "Booking confirmed",
  description: "Thank you — your bin or bag collection booking is confirmed.",
  path: "/services/bin-collection-booking/confirmation",
});

type PageProps = {
  searchParams: Promise<{ booking?: string; session_id?: string }>;
};

export default async function BinBookingConfirmationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const bookingId = params.booking;
  const booking = bookingId ? await getBooking(bookingId) : null;

  return (
    <div className="section-pad bg-zinc-50">
      <div className="site-container max-w-2xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Bin booking", href: "/services/bin-collection-booking" },
            { label: "Confirmation" },
          ]}
        />
        <h1 className="mt-4 font-display text-4xl text-zinc-900">Thank you</h1>
        {!booking ? (
          <p className="mt-4 text-zinc-700">
            We could not find this booking reference. If you have just paid, wait a moment and refresh,
            or contact us with your email confirmation from Stripe.
          </p>
        ) : (
          <>
            <p className="mt-4 text-zinc-700">
              Your booking reference is{" "}
              <span className="font-mono text-sm">{booking.id}</span>. We will be in touch before your
              first collection if we need access details.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {booking.lines.map((line) => {
                const svc = getBinBookingService(line.serviceId);
                return (
                  <li key={line.serviceId}>
                    {svc?.name ?? line.serviceId} × {line.quantity}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm font-semibold text-zinc-900">
              Total paid: {formatMoney(booking.totals.incVatTotalPence)}
            </p>
            {booking.schedule.bookingType === "subscription" ? (
              <div className="mt-6">
                <ManageSubscriptionPortal bookingId={booking.id} />
              </div>
            ) : null}
          </>
        )}
        <Link
          href="/"
          className={cn(
            "mt-10 inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-sm font-extrabold uppercase tracking-wide",
            limeButtonOnLightClass,
          )}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}