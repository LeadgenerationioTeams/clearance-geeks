/**
 * Single source of truth for company details.
 * Replace bracketed placeholders before go-live.
 */
export const company = {
  name: "[COMPANY NAME]",
  legalName: "The Clearance Geeks - Waste Removals",
  companyNumber: "[COMPANY NO]",
  address: "[ADDRESS]",
  phone: "[PHONE]",
  phoneTel: "tel:[PHONE]",
  email: "[EMAIL]",
  wasteCarrierLicence: "[WASTE CARRIER NO]",
  region: "Greater Manchester",
  defaultDescription:
    "Licensed waste removal and house clearance across Greater Manchester — Stockport, Manchester and surrounding boroughs. Fast quotes, tidy crews, responsible disposal.",
} as const;

/** Optional marketing data — leave null/empty; UI renders nothing when unset. */
export const todoMarketing = {
  googleRating: null as number | null,
  reviewCount: null as number | null,
  yearsTrading: null as number | null,
  jobsCompleted: null as number | null,
  awards: [] as string[],
} as const;

/** Set `NEXT_PUBLIC_SITE_URL` on Vercel; static default keeps prerender metadata valid. */
export const siteUrl = "https://www.example.com";
