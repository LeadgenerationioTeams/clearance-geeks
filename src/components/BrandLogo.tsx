import Image from "next/image";
import Link from "next/link";
import { focusVisibleOnDarkClass } from "@/lib/focus-visible";
import { resolveHomeHeroVariant } from "@/lib/home-hero";
import { lightVanHeaderLogo } from "@/lib/light-van-brand";

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
        className={`inline-block max-w-full rounded-2xl bg-black p-4 shadow-md ${className}`}
      >
        <Image
          src="/brand/logo-hero-lockup-1x.webp"
          alt="The Clearance Geeks — Waste Removals"
          width={360}
          height={Math.round(360 * (LOGO_HEIGHT / LOGO_WIDTH))}
          className="h-auto w-[360px] max-w-full object-contain"
          priority
          unoptimized
        />
      </div>
    );
    return linked ? (
      <Link
        href="/"
        className={`inline-block rounded-sm ${focusVisibleOnDarkClass}`}
      >
        {hero}
        <span className="sr-only">The Clearance Geeks — Waste Removals</span>
      </Link>
    ) : (
      hero
    );
  }

  const lightVan = resolveHomeHeroVariant() === "light-van";
  const img = (
    <Image
      src={lightVan ? lightVanHeaderLogo.src : "/brand/logo-lockup.webp"}
      alt="The Clearance Geeks — Waste Removals"
      width={lightVan ? lightVanHeaderLogo.width : LOGO_WIDTH}
      height={lightVan ? lightVanHeaderLogo.height : LOGO_HEIGHT}
      className={`h-14 w-auto max-w-[min(100%,360px)] object-contain object-left ${className}`}
      priority
      unoptimized
    />
  );

  if (!linked) return img;

  return (
    <Link
      href="/"
      className={`inline-block rounded-lg ${focusVisibleOnDarkClass}`}
    >
      {img}
      <span className="sr-only">The Clearance Geeks — Waste Removals</span>
    </Link>
  );
}
