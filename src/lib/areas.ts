import { region, serviceAreas, type ServiceArea } from "@/config/site";

export type AreaSlug = string;

export interface AreaDefinition {
  slug: AreaSlug;
  name: string;
  boroughLabel: string;
  summary: string;
  accessNotes: string;
  neighbourhoods: string[];
  postcodeDistricts: string[];
  nearbyTowns: { slug: AreaSlug; label: string }[];
  faqs: { question: string; answer: string }[];
}

function buildAreaDefinition(area: ServiceArea): AreaDefinition {
  const others = serviceAreas.filter((a) => a.slug !== area.slug);

  return {
    slug: area.slug,
    name: area.name,
    boroughLabel: area.boroughLabel,
    summary:
      `Waste removal and house clearance in ${area.name}. Coverage, postcodes and access routes are confirmed when you request a quote.`,
    accessNotes:
      "Describe steps, parking restrictions, permits and whether a van can reach your door or alley. We confirm feasibility for your postcode before booking.",
    neighbourhoods: [],
    postcodeDistricts: ["PLACEHOLDER_POSTCODE_DISTRICT"],
    nearbyTowns: others.slice(0, 4).map((a) => ({
      slug: a.slug,
      label: a.name,
    })),
    faqs: [
      {
        question: "Which postcodes do you need?",
        answer:
          `Send your full postcode with the quote form so we can confirm coverage for ${area.name}.`,
      },
      {
        question: "What should I tell you about access?",
        answer:
          "Mention stairs, lifts, alley width, permit bays and any time windows required by a landlord or agent.",
      },
      {
        question: `Do you cover all of ${area.name}?`,
        answer:
          `We route jobs across ${region}. Your postcode and photos help us confirm we can reach you in ${area.name}.`,
      },
    ],
  };
}

/** Borough pages — generated from `serviceAreas` in `src/config/site.ts` only. */
export const areas: AreaDefinition[] = serviceAreas.map(buildAreaDefinition);

export const areaSlugs = areas.map((a) => a.slug);

/**
 * Area slugs that receive combined `/areas/{slug}/{service}` landing pages.
 * First two entries from config until Sam marks dedicated hubs in site config.
 */
export const serviceByTownSlugs: AreaSlug[] = serviceAreas.slice(0, 2).map(
  (a) => a.slug,
);

export function getArea(slug: string): AreaDefinition | undefined {
  return areas.find((a) => a.slug === slug);
}

export function serviceAreaIntro(areaName: string, serviceTitle: string): string {
  return `${serviceTitle} in ${areaName}. Share your postcode, photos and access details for a quote before collection.`;
}
