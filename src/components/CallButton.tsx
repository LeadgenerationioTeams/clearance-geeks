import { company } from "@/lib/company";

export function CallButton({
  className = "",
  label = "Tap to call",
}: {
  className?: string;
  label?: string;
}) {
  const href = company.phone.startsWith("[")
    ? "#quote"
    : `tel:${company.phone.replace(/\s/g, "")}`;

  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg bg-geek-lime px-5 py-2.5 text-center text-sm font-semibold text-geek-charcoal transition hover:bg-geek-lime-bright active:scale-[0.99] ${className}`}
    >
      {label}
      {company.phone.startsWith("[") ? "" : ` ${company.phone}`}
    </a>
  );
}
