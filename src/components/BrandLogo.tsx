import Image from "next/image";
import Link from "next/link";

/** Photographic extract from brand/van-sam.png (cargo panel wordmark). */
const LOCKUP_WIDTH = 1044;
const LOCKUP_HEIGHT = 1524;

type Variant = "header" | "hero";

export function BrandLogo({
  variant = "header",
  linked = true,
  className = "",
}: {
  variant?: Variant;
  linked?: boolean;
  className?: string;
}) {
  const src =
    variant === "hero"
      ? "/brand/logo-hero-lockup.webp"
      : "/brand/logo-lockup.webp";

  const sizeClass =
    variant === "hero"
      ? "h-[min(280px,42vw)] w-auto max-w-full sm:h-[280px]"
      : "h-12 w-auto max-w-[min(100%,280px)]";

  const img = (
    <Image
      src={src}
      alt="The Clearance Geeks — Waste Removals"
      width={LOCKUP_WIDTH}
      height={LOCKUP_HEIGHT}
      className={`object-contain object-left ${sizeClass} ${className}`}
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
