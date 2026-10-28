"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { company, hasCallablePhone, quoteHrefForPath, siteConfig } from "@/config/site";
import { focusVisibleOnDarkClass } from "@/lib/focus-visible";

const footerLinkClass = `inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 hover:text-geek-lime ${focusVisibleOnDarkClass}`;

export function SiteFooter() {
  const pathname = usePathname();
  const quoteHref = quoteHrefForPath(pathname);

  return (
    <footer
      className="mt-auto border-t border-zinc-800 bg-black pb-[calc(88px+var(--cookie-bar-h,0px))] text-sm text-zinc-400 lg:pb-[var(--cookie-bar-h,0px)]"
    >
      <div className="site-container section-pad grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-geek-lime">{company.legalName}</p>
          <p className="mt-3 break-words text-zinc-400">{company.address}</p>
          {hasCallablePhone() ? <p className="mt-2">{company.phone}</p> : null}
          <p className="break-all">{company.email}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2">
            <li>Reg: {company.companyNumber}</li>
            <li>Waste carrier: {company.wasteCarrierLicence}</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-1 space-y-0">
            <li>
              <Link href={quoteHref} className={footerLinkClass}>
                Get a quote
              </Link>
            </li>
            <li>
              <Link href="/services" className={footerLinkClass}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/areas" className={footerLinkClass}>
                Areas we cover
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Legal</p>
          <ul className="mt-1 space-y-0">
            <li>
              <Link href="/privacy" className={footerLinkClass}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className={footerLinkClass}>
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/terms" className={footerLinkClass}>
                Terms
              </Link>
            </li>
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </div>
      </div>
      <div className="site-container border-t border-zinc-800 py-6 text-sm text-zinc-400">
        <p>© 2026 {company.name}.</p>
        <p className="mt-2 max-w-3xl text-zinc-400">
          {siteConfig.compliance.wasteCarrierNote}
        </p>
      </div>
    </footer>
  );
}
