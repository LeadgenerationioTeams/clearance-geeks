import Link from "next/link";
import { company } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-black text-sm text-zinc-400">
      <div className="site-container section-pad grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-geek-lime">{company.legalName}</p>
          <p className="mt-3 text-zinc-400">{company.address}</p>
          <p className="mt-2">{company.phone}</p>
          <p>{company.email}</p>
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
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/services" className="hover:text-geek-lime">
                Services
              </Link>
            </li>
            <li>
              <Link href="/areas" className="hover:text-geek-lime">
                Areas we cover
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Legal</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/privacy" className="hover:text-geek-lime">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-geek-lime">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-geek-lime">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="site-container border-t border-zinc-800 py-6 text-xs text-zinc-600">
        © 2026 {company.name}. Carrier registration details above when confirmed.
      </p>
    </footer>
  );
}
