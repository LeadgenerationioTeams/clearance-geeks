import { CallButton } from "./CallButton";
import { company } from "@/lib/company";

function whatsAppHref(): string | null {
  if (company.phone.startsWith("[")) return null;
  const digits = company.phone.replace(/\D/g, "");
  if (!digits) return null;
  const uk = digits.startsWith("0") ? `44${digits.slice(1)}` : digits;
  return `https://wa.me/${uk}`;
}

export function StickyMobileCta() {
  const wa = whatsAppHref();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 p-3 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className={`grid gap-2 ${wa ? "grid-cols-2" : "grid-cols-1"}`}>
        <CallButton className="w-full text-sm px-3" label="Call" />
        {wa ? (
          <a
            href={wa}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-geek-charcoal bg-transparent px-3 text-center text-sm font-semibold text-geek-charcoal"
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
