import Link from "next/link";
import { LogoLockup } from "./LogoLockup";
import { CallButton, PhoneLink } from "./CallButton";

const links = [
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#gallery", label: "Gallery" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="site-container flex items-center justify-between gap-4 py-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8">
        <LogoLockup className="shrink-0" />
        <nav
          className="hidden items-center justify-center gap-8 text-sm font-semibold text-zinc-200 lg:flex"
          aria-label="Main"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-geek-lime">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <PhoneLink className="hidden text-sm md:inline" />
          <CallButton
            className="hidden min-h-11 px-4 py-2 text-sm sm:inline-flex"
            label="Call"
            showPhone={false}
          />
          <CallButton
            className="sm:hidden min-h-10 px-3 text-xs"
            label="Call"
            showPhone={false}
          />
        </div>
      </div>
    </header>
  );
}
