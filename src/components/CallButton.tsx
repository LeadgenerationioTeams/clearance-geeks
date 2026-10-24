import { company, formatTelHref, isPlaceholderValue } from "@/config/site";
import { cn } from "@/lib/cn";

export function CallButton({
  className = "",
  label = "Tap to call",
}: {
  className?: string;
  label?: string;
}) {
  const href = isPlaceholderValue(company.phone)
    ? "#quote"
    : formatTelHref(company.phone);

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-lg bg-geek-lime px-5 py-2.5 text-center text-sm font-semibold text-geek-charcoal transition hover:bg-geek-lime-bright active:scale-[0.99]",
        className,
      )}
    >
      {label}
      {isPlaceholderValue(company.phone) ? "" : ` ${company.phone}`}
    </a>
  );
}
