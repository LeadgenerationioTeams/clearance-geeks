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
      className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-geek-lime px-6 py-3 text-center text-lg font-extrabold uppercase tracking-wide text-black shadow-[0_0_24px_rgba(139,230,0,0.45)] transition hover:scale-[1.02] hover:bg-geek-lime-bright active:scale-[0.98] ${className}`}
    >
      {label}
      {company.phone.startsWith("[") ? "" : ` ${company.phone}`}
    </a>
  );
}
