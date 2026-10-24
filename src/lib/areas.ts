import type { RecyclingCentreKey } from "@/data/local-sources";
import { recyclingCentres } from "@/data/local-sources";
import {
  siteConfig,
  type AreaSlug,
  type ServiceAreaEntry,
} from "@/config/site";

export type { AreaSlug };

export interface AreaDefinition {
  slug: AreaSlug;
  name: string;
  boroughLabel: string;
  summary: string;
  accessNotes: string;
  neighbourhoods: string[];
  postcodeDistricts: string[];
  recyclingCentreKey?: RecyclingCentreKey;
  nearbyTowns: { slug: AreaSlug; label: string }[];
  faqs: { question: string; answer: string }[];
}

function areaLabelForSlug(slug: AreaSlug): string {
  return (
    siteConfig.serviceAreas.entries.find((entry) => entry.slug === slug)?.name ??
    slug
  );
}

function genericFaqs(areaName: string): AreaDefinition["faqs"] {
  return [
    {
      question: "Which postcodes do you need?",
      answer:
        `Send your full postcode with the quote form so we can confirm coverage within ${areaName}.`,
    },
    {
      question: "What should I tell you about access?",
      answer:
        "Mention stairs, lifts, alley width, permit bays and any time windows required by a landlord or agent.",
    },
  ];
}

function mapEntryToArea(entry: ServiceAreaEntry): AreaDefinition {
  return {
    slug: entry.slug,
    name: entry.name,
    boroughLabel: entry.boroughLabel,
    summary: entry.summary,
    accessNotes: entry.accessNotes,
    neighbourhoods: [...entry.neighbourhoods],
    postcodeDistricts: [...entry.postcodeDistricts],
    recyclingCentreKey: entry.recyclingCentreKey,
    nearbyTowns: entry.nearbySlugs.map((slug) => ({
      slug,
      label: areaLabelForSlug(slug),
    })),
    faqs: genericFaqs(entry.name),
  };
}

export const areas: AreaDefinition[] = siteConfig.serviceAreas.entries.map(
  mapEntryToArea,
);

export const serviceByTownSlugs: AreaSlug[] = [
  ...siteConfig.serviceAreas.hubSlugs,
];

export const areaSlugs = areas.map((a) => a.slug);

export function getArea(slug: string): AreaDefinition | undefined {
  return areas.find((a) => a.slug === slug);
}

export function getRecyclingCentreForArea(slug: AreaSlug) {
  const area = getArea(slug);
  if (!area?.recyclingCentreKey) return undefined;
  return recyclingCentres[area.recyclingCentreKey];
}

export function serviceAreaIntro(areaName: string, serviceTitle: string): string {
  return `${serviceTitle} in ${areaName}. Share your postcode, photos and access details for a quote before collection.`;
}
