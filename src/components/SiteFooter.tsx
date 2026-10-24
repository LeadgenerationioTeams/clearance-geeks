import Link from "next/link";
import { company } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-geek-charcoal py-12 text-sm text-zinc-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-base text-white">{company.legalName}</p>
          <p className="mt-3 leading-relaxed">{company.address}</p>
          <p className="mt-2">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-geek-lime">
              {company.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${company.email}`} className="hover:text-geek-lime">
              {company.email}
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2 leading-relaxed">
            <li>Reg: {company.companyNumber}</li>
            <li>Waste carrier: {company.wasteCarrierLicence}</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/services" className="inline-flex min-h-11 items-center hover:text-geek-lime">
                Services
              </Link>
            </li>
            <li>
              <Link href="/areas" className="inline-flex min-h-11 items-center hover:text-geek-lime">
                Areas we cover
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Legal</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-geek-lime">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="inline-flex min-h-11 items-center hover:text-geek-lime">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-geek-lime">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-8 text-xs text-zinc-500">
        © 2026 {company.name}. Carrier registration details above when confirmed.
      </p>
    </footer>
  );
}
