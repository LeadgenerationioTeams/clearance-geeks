import type { AreaSlug } from "./areas";

export interface NeighbourhoodDefinition {
  areaSlug: AreaSlug;
  slug: string;
  name: string;
  about: string;
  accessNote: string;
  landmarks: { name: string; source: { label: string; url: string } }[];
  faqs: { question: string; answer: string }[];
}

/**
 * Neighbourhood pages are disabled until Sam adds confirmed areas and neighbourhoods in site config.
 * TODO(Sam): When ready, extend `src/config/site.ts` with neighbourhood data and build entries here.
 */
export const neighbourhoods: NeighbourhoodDefinition[] = [];

export function getNeighbourhood(): NeighbourhoodDefinition | undefined {
  return undefined;
}

export function getNeighbourhoodsForArea(_areaSlug: AreaSlug) {
  return neighbourhoods.filter((n) => n.areaSlug === _areaSlug);
}
