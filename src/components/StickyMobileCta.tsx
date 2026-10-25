import Link from "next/link";
import { CallButton } from "./CallButton";
import { company, isPlaceholder } from "@/config/site";
import { cn } from "@/lib/cn";

function whatsAppHref(): string | null {
  if (isPlaceholder(company.phone)) return null;
  const digits = company.phone.replace(/\D/g, "");
  if (!digits) return null;
  const uk = digits.startsWith("0") ? `44${digits.slice(1)}` : digits;
  return `https://wa.me/${uk}`;
}

const stickyBarClass =
  "fixed bottom-0 left-0 right-0 z-40 border-t border-geek-lime/40 bg-black/95 p-3 backdrop-blur lg:hidden";

const quoteLinkClass =
  "sticky-call-link inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-geek-lime px-3 text-center text-sm font-extrabold uppercase tracking-wide text-black shadow-[0_0_24px_rgba(139,230,0,0.35)] hover:bg-geek-lime-bright";

export function StickyMobileCta() {
  const wa = whatsAppHref();
  const hasPhone = !isPlaceholder(company.phone);

  if (!hasPhone) {
    return (
      <div
        className={cn(stickyBarClass)}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <Link href="#quote" className={quoteLinkClass}>
          Get a quote
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cn(stickyBarClass)}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className={`grid gap-2 ${wa ? "grid-cols-2" : "grid-cols-1"}`}>
        <CallButton
          className={cn("sticky-call-link w-full px-3 text-sm lg:hidden")}
          label="Call"
          showPhone={false}
        />
        {wa ? (
          <a
            href={wa}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-geek-lime bg-transparent px-3 text-center text-sm font-extrabold uppercase tracking-wide text-geek-lime"
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}
