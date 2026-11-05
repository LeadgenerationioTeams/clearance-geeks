import type { RecyclingCentreKey } from "@/data/local-sources";
import { recyclingCentres } from "@/data/local-sources";
import {
  serviceAreaEntries,
  serviceAreaHubSlugs,
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

function areaLabelForSlug(slug: string): string {
  return serviceAreaEntries.find((entry) => entry.slug === slug)?.name ?? slug;
}

function mapEntryToArea(entry: ServiceAreaEntry): AreaDefinition {
  return {
    slug: entry.slug as AreaSlug,
    name: entry.name,
    boroughLabel: entry.boroughLabel,
    summary: entry.summary,
    accessNotes: entry.accessNotes,
    neighbourhoods: [...entry.neighbourhoods],
    postcodeDistricts: [...entry.postcodeDistricts],
    recyclingCentreKey: entry.recyclingCentreKey,
    nearbyTowns: entry.nearbySlugs.map((slug) => ({
      slug: slug as AreaSlug,
      label: areaLabelForSlug(slug),
    })),
    faqs: [...entry.faqs],
  };
}

export const areas: AreaDefinition[] = serviceAreaEntries.map(mapEntryToArea);

export const serviceByTownSlugs: AreaSlug[] = [...serviceAreaHubSlugs];

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
