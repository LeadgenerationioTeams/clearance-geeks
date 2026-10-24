/**
 * Central site & business configuration — swap this file to update the whole site.
 * Search for PLACEHOLDER_ and TODO(Sam) before go-live.
 */

/** True when a value is still a Sam placeholder (not live contact data). */
export function isPlaceholder(value: string): boolean {
  return value.includes("PLACEHOLDER_") || value.startsWith("[");
}

export const siteConfig = {
  /** Public site origin (no trailing slash). */
  domain: {
    // TODO(Sam): Set production domain (also set NEXT_PUBLIC_SITE_URL on Vercel).
    url: "https://PLACEHOLDER_DOMAIN",
  },

  company: {
    /** Public brand name — used in titles and marketing (not the registered legal entity). */
    tradingName: "Clearance Geeks",
    // TODO(Sam): Full legal entity name for contracts, metadata and policies.
    legalName: "PLACEHOLDER_LEGAL_NAME",
    // TODO(Sam): Companies House number.
    companyNumber: "PLACEHOLDER_COMPANY_NUMBER",
    registeredAddress: {
      // TODO(Sam): Registered office — one line per field.
      line1: "PLACEHOLDER_REGISTERED_ADDRESS_LINE_1",
      line2: "PLACEHOLDER_REGISTERED_ADDRESS_LINE_2",
      city: "PLACEHOLDER_REGISTERED_ADDRESS_CITY",
      postcode: "PLACEHOLDER_REGISTERED_ADDRESS_POSTCODE",
      country: "United Kingdom",
    },
    // TODO(Sam): Environment Agency waste carrier registration (upper tier if applicable).
    wasteCarrierLicence: "PLACEHOLDER_WASTE_CARRIER_LICENCE",
    // TODO(Sam): Customer-facing phone (display format).
    phone: "PLACEHOLDER_PHONE",
    // TODO(Sam): Customer-facing email.
    email: "PLACEHOLDER_EMAIL",
  },

  // Confirmed by Sam 24 Oct 2026
  serviceAreas: {
    region: "Greater Manchester",
    summary:
      "Waste removal and house clearance across Greater Manchester — Stockport, Manchester and surrounding boroughs.",
    /** Keep in sync with `src/lib/areas.ts`. */
    locations: [
      "Stockport",
      "Manchester",
      "Salford",
      "Trafford",
      "Tameside",
      "Oldham",
      "Bolton",
      "Bury",
      "Rochdale",
      "Wigan",
      "Cheadle",
      "Didsbury",
    ] as const,
    /** Primary hubs for service × area cross-links (`src/lib/areas.ts` serviceByTownSlugs). */
    hubSlugs: ["stockport", "manchester"] as const,
  },

  marketing: {
    defaultDescription:
      "Waste removal and house clearance across Greater Manchester — Stockport, Manchester and surrounding boroughs. Fast quotes, tidy crews, responsible disposal.",
  },
} as const;

/** Optional marketing stats — leave null; UI renders nothing when unset. */
export const todoMarketing = {
  googleRating: null as number | null,
  reviewCount: null as number | null,
  yearsTrading: null as number | null,
  jobsCompleted: null as number | null,
  awards: [] as string[],
} as const;

export function formatRegisteredAddress(): string {
  const a = siteConfig.company.registeredAddress;
  return [a.line1, a.line2, a.city, a.postcode, a.country]
    .filter(Boolean)
    .join(", ");
}

/** Flat `company` object for legacy imports — derived from `siteConfig`. */
export const company = {
  name: siteConfig.company.tradingName,
  legalName: siteConfig.company.legalName,
  companyNumber: siteConfig.company.companyNumber,
  address: formatRegisteredAddress(),
  phone: siteConfig.company.phone,
  phoneTel: isPlaceholder(siteConfig.company.phone)
    ? "tel:PLACEHOLDER_PHONE"
    : `tel:${siteConfig.company.phone.replace(/\s/g, "")}`,
  email: siteConfig.company.email,
  wasteCarrierLicence: siteConfig.company.wasteCarrierLicence,
  region: siteConfig.serviceAreas.region,
  defaultDescription: siteConfig.marketing.defaultDescription,
} as const;

/** Static default; prefer `resolveSiteUrl()` on the server when env is set. */
export const siteUrl = siteConfig.domain.url;

export function serviceAreasListText(): string {
  return siteConfig.serviceAreas.locations.join(", ");
}

export function telHref(phone: string = siteConfig.company.phone): string {
  if (isPlaceholder(phone)) return "#quote";
  return `tel:${phone.replace(/\s/g, "")}`;
}
