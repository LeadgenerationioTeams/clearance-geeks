import Link from "next/link";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { company, isPlaceholder, siteConfig } from "@/config/site";

const footerLinkClass =
  "inline-flex min-h-11 items-center hover:text-geek-lime";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto border-t border-zinc-800 bg-black text-base text-zinc-400 sm:text-sm">
      <div className="site-container section-pad grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0">
          <p className="font-display text-xl text-geek-lime break-words [overflow-wrap:anywhere]">{company.legalName}</p>
          <p className="mt-3 break-words [overflow-wrap:anywhere] text-zinc-400">{company.address}</p>
          {!isPlaceholder(company.phone) ? (
            <p className="mt-2 break-words [overflow-wrap:anywhere]">{company.phone}</p>
          ) : null}
          <p className="break-all [overflow-wrap:anywhere]">{company.email}</p>
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2">
            <li className="break-words [overflow-wrap:anywhere]">Reg: {company.companyNumber}</li>
            <li className="break-words [overflow-wrap:anywhere]">Waste carrier: {company.wasteCarrierLicence}</li>
          </ul>
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-1 space-y-0">
            <li>
              <Link href="#quote" className={footerLinkClass}>
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
        <div className="min-w-0">
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
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
      </div>
      <div className="site-container border-t border-zinc-800 py-6 text-base sm:text-sm text-zinc-400">
        <p className="break-words [overflow-wrap:anywhere]">© 2026 {company.name}.</p>
        <p className="mt-2 max-w-3xl text-zinc-400 break-words [overflow-wrap:anywhere]">
          {siteConfig.compliance.wasteCarrierNote}
        </p>
      </div>
    </footer>
  );
}
