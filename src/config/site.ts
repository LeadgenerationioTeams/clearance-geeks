/**
 * Central business configuration for The Clearance Geeks.
 * Replace every value containing `PLACEHOLDER_` before go-live.
 * TODO(Sam): Work through each block below and swap in confirmed details.
 */

export type ServiceArea = {
  slug: string;
  name: string;
};

const serviceAreasList: ServiceArea[] = [
  { slug: "stockport", name: "Stockport" },
  { slug: "manchester", name: "Manchester" },
  { slug: "salford", name: "Salford" },
  { slug: "trafford", name: "Trafford" },
  { slug: "tameside", name: "Tameside" },
  { slug: "oldham", name: "Oldham" },
  { slug: "bolton", name: "Bolton" },
  { slug: "bury", name: "Bury" },
  { slug: "rochdale", name: "Rochdale" },
  { slug: "wigan", name: "Wigan" },
  { slug: "cheadle", name: "Cheadle" },
  { slug: "didsbury", name: "Didsbury" },
];

/** TODO(Sam): Public site domain (hostname only, no https://). */
export const siteDomain = "PLACEHOLDER_DOMAIN";

/** TODO(Sam): Trading / customer-facing brand name. */
export const brandName = "The Clearance Geeks";

/** TODO(Sam): Full legal entity name (Companies House). */
export const legalName = "PLACEHOLDER_LEGAL_NAME";

/** TODO(Sam): Companies House registration number. */
export const companyNumber = "PLACEHOLDER_COMPANY_NUMBER";

/** TODO(Sam): Registered office address (as shown on Companies House). */
export const registeredAddress = "PLACEHOLDER_REGISTERED_ADDRESS";

/** TODO(Sam): Environment Agency waste carrier registration number. */
export const wasteCarrierLicence = "PLACEHOLDER_WASTE_CARRIER_LICENCE";

/** TODO(Sam): Primary phone number for enquiries (UK format). */
export const phone = "PLACEHOLDER_PHONE";

/** TODO(Sam): Primary email for enquiries and data protection contact. */
export const email = "PLACEHOLDER_EMAIL";

/** Primary operating region label (used in copy and schema). */
export const region = "Greater Manchester";

/** Default SEO / schema description when pages do not override. */
export const defaultDescription =
  "Waste removal and house clearance across Greater Manchester — Stockport, Manchester and surrounding boroughs. Fast quotes, tidy crews, responsible disposal.";

/** Boroughs and towns covered — keep in sync with area pages under `/areas`. */
export const serviceAreas: readonly ServiceArea[] = serviceAreasList;

/** Service lines for llms.txt and similar summaries (includes single items). */
export const servicesListed: readonly string[] = [
  "House clearance",
  "Garden waste removal",
  "Office and commercial clearance",
  "General junk and rubbish removal",
  "Builders' waste",
  "Single item collections",
];

/** Optional marketing stats — leave null/empty; UI renders nothing when unset. */
export const todoMarketing = {
  googleRating: null as number | null,
  reviewCount: null as number | null,
  yearsTrading: null as number | null,
  jobsCompleted: null as number | null,
  awards: [] as string[],
};

/** Compliance copy surfaced on the site (not legal advice). */
export const complianceCopy = {
  wasteCarrierNote:
    "Waste is collected under an Environment Agency waste carrier registration. Registration number shown in the footer when confirmed.",
  quoteDisclaimer:
    "Online quotes are indicative until confirmed in writing. Access, parking and waste type can affect the final price.",
  recyclingNote:
    "We segregate reusable and recyclable material where local facilities allow. Some waste types are excluded — ask if unsure.",
};

/**
 * @deprecated Use named exports from this module. Kept for a stable `company` shape in components.
 */
export const company = {
  name: brandName,
  legalName,
  companyNumber,
  address: registeredAddress,
  phone,
  email,
  wasteCarrierLicence,
  region,
  defaultDescription,
};

export function isPlaceholderValue(value: string): boolean {
  return value.includes("PLACEHOLDER");
}

/** Canonical HTTPS origin for metadata and JSON-LD when env is unset. */
export function defaultSiteOrigin(): string {
  if (isPlaceholderValue(siteDomain)) {
    return "https://www.example.com";
  }
  const host = siteDomain.startsWith("www.") ? siteDomain : `www.${siteDomain}`;
  return `https://${host}`;
}

export function formatServiceAreasCommaList(): string {
  return serviceAreas.map((a) => a.name).join(", ");
}

export function formatTelHref(rawPhone: string): string {
  return `tel:${rawPhone.replace(/\s/g, "")}`;
}
