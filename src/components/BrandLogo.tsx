import Image from "next/image";
import Link from "next/link";

/** Sam's cargo-panel crop — public/brand/logo-master.png (from brand/logo-crop.png). */
export const LOGO_WIDTH = 1024;
export const LOGO_HEIGHT = 732;

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
  if (variant === "hero") {
    const hero = (
      <div
        className={`inline-block max-w-full rounded-xl bg-geek-charcoal p-3 shadow-sm ${className}`}
      >
        <Image
          src="/brand/logo-hero-lockup-1x.webp"
          alt="The Clearance Geeks — Waste Removals"
          width={320}
          height={Math.round(320 * (LOGO_HEIGHT / LOGO_WIDTH))}
          className="h-auto w-[280px] max-w-full object-contain sm:w-[320px]"
          priority
          unoptimized
        />
      </div>
    );
    return linked ? (
      <Link href="/" className="inline-block">
        {hero}
        <span className="sr-only">The Clearance Geeks — Waste Removals</span>
      </Link>
    ) : (
      hero
    );
  }

  const img = (
    <span
      className={`inline-flex items-center rounded-lg bg-geek-charcoal px-2 py-1.5 ${className}`}
    >
      <Image
        src="/brand/logo-lockup.webp"
        alt="The Clearance Geeks — Waste Removals"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="h-9 w-auto max-w-[min(100%,200px)] object-contain object-left sm:h-10"
        priority
        unoptimized
      />
    </span>
  );

  if (!linked) return img;

  return (
    <Link href="/" className="inline-block shrink-0">
      {img}
      <span className="sr-only">The Clearance Geeks — Waste Removals</span>
    </Link>
  );
}
