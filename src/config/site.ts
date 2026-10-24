/**
 * Central site & business configuration — swap this file to update the whole site.
 * Search for PLACEHOLDER_ and TODO(Sam) before go-live.
 */

import type { RecyclingCentreKey } from "@/data/local-sources";

/** True when a value is still a Sam placeholder (not live contact data). */
export function isPlaceholder(value: string): boolean {
  return value.includes("PLACEHOLDER_") || value.startsWith("[");
}

const SERVICE_AREA_COUNT = 12;

function padAreaIndex(index: number): string {
  return String(index).padStart(2, "0");
}

/** // TODO(Sam): Confirm slug, labels, neighbourhoods and postcodes for each area. */
function createServiceAreaEntry(index: number) {
  const n = padAreaIndex(index);
  const slug = `placeholder-area-${n}`;
  const next = (offset: number) =>
    `placeholder-area-${padAreaIndex(((index - 1 + offset) % SERVICE_AREA_COUNT) + 1)}`;

  return {
    slug,
    name: `PLACEHOLDER_AREA_NAME_${n}`,
    boroughLabel: `PLACEHOLDER_AREA_BOROUGH_${n}`,
    summary: `PLACEHOLDER_AREA_SUMMARY_${n}`,
    accessNotes: `PLACEHOLDER_AREA_ACCESS_NOTES_${n}`,
    neighbourhoods: [
      `PLACEHOLDER_NEIGHBOURHOOD_${n}_A`,
      `PLACEHOLDER_NEIGHBOURHOOD_${n}_B`,
    ],
    postcodeDistricts: [`PLACEHOLDER_POSTCODE_DISTRICT_${n}`],
    recyclingCentreKey: `placeholderCentre${n}` as RecyclingCentreKey,
    nearbySlugs: [next(1), next(2), next(3)] as const,
  };
}

export const serviceAreaEntries = Array.from(
  { length: SERVICE_AREA_COUNT },
  (_, i) => createServiceAreaEntry(i + 1),
);

export const siteConfig = {
  /** Public site origin (no trailing slash). */
  domain: {
    // TODO(Sam): Set production domain (also set NEXT_PUBLIC_SITE_URL on Vercel).
    url: "https://PLACEHOLDER_DOMAIN",
  },

  company: {
    // TODO(Sam): Trading / brand name shown in footer and short copy.
    tradingName: "PLACEHOLDER_TRADING_NAME",
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

  serviceAreas: {
    // TODO(Sam): Confirm primary region label used in headlines, schema and legal copy.
    region: "PLACEHOLDER_SERVICE_REGION",
    // TODO(Sam): One-line coverage blurb for metadata, hero subcopy and llms.txt.
    summary: "PLACEHOLDER_SERVICE_AREAS_SUMMARY",
    /** Display names for hubs, trust bar and list copy — one per `serviceAreaEntries` row. */
    locations: serviceAreaEntries.map((entry) => entry.name),
    entries: serviceAreaEntries,
    /** Area slugs used for service × area landing links (first two entries until Sam confirms hubs). */
    // TODO(Sam): Set hub slugs for primary service-area cross-links.
    hubSlugs: [
      serviceAreaEntries[0]!.slug,
      serviceAreaEntries[1]!.slug,
    ] as const,
  },

  marketing: {
    // TODO(Sam): Default meta description sitewide (avoid naming unconfirmed towns).
    defaultDescription: "PLACEHOLDER_DEFAULT_META_DESCRIPTION",
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

export function getServiceAreaBySlug(slug: string) {
  return siteConfig.serviceAreas.entries.find((entry) => entry.slug === slug);
}

export function telHref(phone: string = siteConfig.company.phone): string {
  if (isPlaceholder(phone)) return "#quote";
  return `tel:${phone.replace(/\s/g, "")}`;
}

export type ServiceAreaEntry = (typeof serviceAreaEntries)[number];
export type AreaSlug = ServiceAreaEntry["slug"];
