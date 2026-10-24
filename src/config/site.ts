/**
 * Central business configuration for The Clearance Geeks.
 * Replace every value containing `PLACEHOLDER_` before go-live.
 * TODO(Sam): Work through each block below and swap in confirmed details.
 */

export type ServiceArea = {
  slug: string;
  name: string;
  boroughLabel: string;
};

/**
 * TODO(Sam): Replace with confirmed service areas (unique slug + display name + borough label per row).
 * Add or remove entries as needed — area pages and hub lists are generated from this array only.
 */
export const PLACEHOLDER_SERVICE_AREAS: readonly ServiceArea[] = [
  {
    slug: "placeholder-service-area-1",
    name: "PLACEHOLDER_SERVICE_AREA_1",
    boroughLabel: "PLACEHOLDER_BOROUGH_LABEL_1",
  },
  {
    slug: "placeholder-service-area-2",
    name: "PLACEHOLDER_SERVICE_AREA_2",
    boroughLabel: "PLACEHOLDER_BOROUGH_LABEL_2",
  },
  {
    slug: "placeholder-service-area-3",
    name: "PLACEHOLDER_SERVICE_AREA_3",
    boroughLabel: "PLACEHOLDER_BOROUGH_LABEL_3",
  },
];

/** Active service areas — swap `PLACEHOLDER_SERVICE_AREAS` for confirmed data in one place. */
export const serviceAreas: readonly ServiceArea[] = PLACEHOLDER_SERVICE_AREAS;

/** TODO(Sam): Primary operating region label (e.g. county or combined authority name). */
export const region = "PLACEHOLDER_REGION";

/** TODO(Sam): Trading / customer-facing brand name. */
export const brandName = "The Clearance Geeks";

/** TODO(Sam): Public site domain (hostname only, no https://). */
export const siteDomain = "PLACEHOLDER_DOMAIN";

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
  defaultDescription: buildDefaultDescription(),
};

export function buildDefaultDescription(): string {
  return `Waste removal and house clearance in ${region}. Service areas include ${formatServiceAreasCommaList()}. Fast quotes, tidy crews, responsible disposal.`;
}

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
