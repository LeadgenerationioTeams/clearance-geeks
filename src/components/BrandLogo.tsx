import Image from "next/image";
import Link from "next/link";

type Variant = "header" | "hero";

const src = "/brand/logo-lockup.svg";

export function BrandLogo({
  variant = "header",
  linked = true,
  className = "",
}: {
  variant?: Variant;
  linked?: boolean;
  className?: string;
}) {
  const sizes =
    variant === "hero"
      ? "min-h-[120px] w-full max-w-xl sm:min-h-[160px] sm:max-w-2xl"
      : "h-11 w-[min(100%,220px)] sm:h-11 sm:w-[240px]";

  const img = (
    <Image
      src={src}
      alt="The Clearance Geeks — Waste Removals"
      width={420}
      height={96}
      className={`object-contain object-left ${sizes} ${className}`}
      priority={variant === "hero"}
      unoptimized
    />
  );

  if (!linked) return img;

  return (
    <Link href="/" className={`inline-block ${variant === "hero" ? "mb-2" : ""}`}>
      {img}
      <span className="sr-only">The Clearance Geeks — Waste Removals</span>
    </Link>
  );
}
