import Link from "next/link";
import { LogoLockup } from "./LogoLockup";
import { CallButton } from "./CallButton";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-geek-lime/20 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <LogoLockup />
        <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-200 lg:flex">
          <Link href="/services" className="hover:text-geek-lime">
            Services
          </Link>
          <Link href="/areas" className="hover:text-geek-lime">
            Areas
          </Link>
          <details className="relative group">
            <summary className="cursor-pointer list-none hover:text-geek-lime">
              Browse
            </summary>
            <div className="absolute right-0 mt-2 hidden w-64 rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl group-open:block">
              <p className="text-xs uppercase text-zinc-500">Services</p>
              <ul className="mt-1 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="block rounded px-2 py-1 hover:bg-zinc-900"
                    >
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs uppercase text-zinc-500">Areas</p>
              <ul className="mt-1 max-h-40 space-y-1 overflow-y-auto">
                {areas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/areas/${a.slug}`}
                      className="block rounded px-2 py-1 hover:bg-zinc-900"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </nav>
        <CallButton className="hidden sm:inline-flex text-sm px-4 py-2 min-h-10" />
        <CallButton className="sm:hidden text-xs px-3 py-2 min-h-10" label="Call" />
      </div>
    </header>
  );
}
