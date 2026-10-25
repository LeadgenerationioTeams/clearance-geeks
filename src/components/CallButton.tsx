import { company, isPlaceholder, telHref } from "@/config/site";
import { cn } from "@/lib/cn";

export function CallButton({
  className = "",
  label = "Tap to call",
  variant = "primary",
  showPhone = true,
}: {
  className?: string;
  label?: string;
  variant?: "primary" | "outline" | "outline-dark";
  showPhone?: boolean;
}) {
  const href = telHref(company.phone);

  const base =
    "inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-center text-base font-bold transition md:text-lg";

  const styles =
    variant === "outline"
      ? `${base} border-2 border-white bg-transparent text-white hover:bg-white/10`
      : variant === "outline-dark"
        ? `${base} border-2 border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-100`
        : `${base} border border-[#111] bg-geek-lime font-extrabold uppercase tracking-wide text-[#111] shadow-[0_0_24px_rgba(139,230,0,0.35)] hover:bg-geek-lime-bright`;

  const phoneSuffix =
    showPhone && !isPlaceholder(company.phone) ? ` ${company.phone}` : "";

  return (
    <a href={href} className={cn(styles, className)}>
      {label}
      {variant === "primary" ? phoneSuffix : null}
    </a>
  );
}
