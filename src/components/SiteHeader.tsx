import Link from "next/link";
import { LogoLockup } from "./LogoLockup";
import { CallButton } from "./CallButton";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-geek-charcoal">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <LogoLockup />
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-300 lg:flex">
          <Link href="/services" className="min-h-11 inline-flex items-center hover:text-geek-lime">
            Services
          </Link>
          <Link href="/areas" className="min-h-11 inline-flex items-center hover:text-geek-lime">
            Areas
          </Link>
          <details className="relative group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center hover:text-geek-lime">
              Browse
            </summary>
            <div className="absolute right-0 mt-1 hidden w-64 rounded-xl border border-zinc-700 bg-geek-charcoal p-3 shadow-xl group-open:block">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Services
              </p>
              <ul className="mt-1 space-y-1 text-zinc-200">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="block rounded px-2 py-2 hover:bg-white/5 hover:text-geek-lime"
                    >
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Areas
              </p>
              <ul className="mt-1 max-h-40 space-y-1 overflow-y-auto text-zinc-200">
                {areas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/areas/${a.slug}`}
                      className="block rounded px-2 py-2 hover:bg-white/5 hover:text-geek-lime"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </nav>
        <CallButton className="hidden sm:inline-flex text-sm px-4 py-2.5 min-h-11" />
        <CallButton className="sm:hidden text-sm px-3 py-2.5 min-h-11" label="Call" />
      </div>
    </header>
  );
}
