import Link from "next/link";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { company, siteConfig } from "@/config/site";

const footerLinkClass =
  "inline-flex min-h-11 items-center hover:text-geek-lime";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto border-t border-zinc-800 bg-black text-sm text-zinc-400">
      <div className="site-container section-pad grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-geek-lime">{company.legalName}</p>
          <p className="mt-3 break-words text-zinc-400">{company.address}</p>
          <p className="mt-2">{company.phone}</p>
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
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
      </div>
      <div className="site-container border-t border-zinc-800 py-6 text-xs text-zinc-400">
        <p>© 2026 {company.name}.</p>
        <p className="mt-2 max-w-3xl text-zinc-400">
          {siteConfig.compliance.wasteCarrierNote}
        </p>
      </div>
    </footer>
  );
}
