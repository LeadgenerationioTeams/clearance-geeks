import Link from "next/link";
import { LogoLockup } from "./LogoLockup";
import { CallButton } from "./CallButton";
import { cn } from "@/lib/cn";
import { resolveHomeHeroVariant } from "@/lib/home-hero";

const links = [
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#gallery", label: "Gallery" },
];

export function SiteHeader() {
  const lightVan = resolveHomeHeroVariant() === "light-van";

  const navLinkClass = cn(
    "inline-flex min-h-11 items-center px-1",
    lightVan
      ? "text-[#111] hover:text-[#111] hover:underline"
      : "text-zinc-200 hover:text-geek-lime",
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        lightVan
          ? "border-b border-[#E6E8E3] bg-white"
          : "border-b border-white/10 bg-black/95 backdrop-blur-md",
      )}
    >
      <div className="site-container flex items-center justify-between gap-4 py-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8">
        {lightVan ? (
          <div className="shrink-0 rounded-lg bg-black p-1.5">
            <LogoLockup className="[&_img]:h-10 [&_img]:max-w-[min(100%,280px)]" />
          </div>
        ) : (
          <LogoLockup className="shrink-0" />
        )}
        <nav
          className={cn(
            "hidden items-center justify-center gap-6 text-sm font-semibold lg:flex",
            lightVan ? "text-[#111]" : "text-zinc-200",
          )}
          aria-label="Main"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={navLinkClass}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end">
          <CallButton
            className={cn(
              "hidden min-h-11 px-4 py-2 text-sm lg:inline-flex",
            )}
            label="Call"
            showPhone={false}
          />
        </div>
      </div>
    </header>
  );
}
