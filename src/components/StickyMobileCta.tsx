import { CallButton } from "./CallButton";
import { company, hasCallablePhone } from "@/config/site";
import { cn } from "@/lib/cn";
import { focusVisibleOnDarkClass } from "@/lib/focus-visible";
import { limeButtonOnLightClass } from "@/lib/lime-button";

function whatsAppHref(): string | null {
  if (!hasCallablePhone()) return null;
  const digits = company.phone.replace(/\D/g, "");
  if (!digits) return null;
  const uk = digits.startsWith("0") ? `44${digits.slice(1)}` : digits;
  return `https://wa.me/${uk}`;
}

export function StickyMobileCta() {
  const wa = whatsAppHref();

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-geek-lime/40 bg-black/95 p-3 backdrop-blur lg:hidden",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className={`grid gap-2 ${wa ? "grid-cols-2" : "grid-cols-1"}`}>
        {hasCallablePhone() ? (
          <CallButton
            className={cn(
              "w-full px-3 text-sm lg:hidden",
              focusVisibleOnDarkClass,
            )}
            label="Call"
            showPhone={false}
          />
        ) : (
          <a
            href="#quote"
            className={cn(
              "inline-flex min-h-12 w-full items-center justify-center rounded-xl px-3 text-center text-sm font-extrabold uppercase tracking-wide lg:hidden",
              limeButtonOnLightClass,
            )}
          >
            Get a quote
          </a>
        )}
        {wa ? (
          <a
            href={wa}
            className={cn(
              "inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-geek-lime bg-transparent px-3 text-center text-sm font-extrabold uppercase tracking-wide text-geek-lime",
              focusVisibleOnDarkClass,
            )}
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
