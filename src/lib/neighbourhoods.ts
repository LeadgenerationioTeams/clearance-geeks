import { areas, getArea, type AreaSlug } from "./areas";
import type { SourceRef } from "@/data/local-sources";

export interface NeighbourhoodDefinition {
  areaSlug: AreaSlug;
  slug: string;
  name: string;
  /** Factual description — no operational history claims. */
  about: string;
  accessNote: string;
  landmarks: { name: string; source: SourceRef }[];
  faqs: { question: string; answer: string }[];
}

export function slugifyNeighbourhood(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function defaultNeighbourhood(
  areaSlug: AreaSlug,
  name: string,
): NeighbourhoodDefinition {
  const area = getArea(areaSlug)!;
  const slug = slugifyNeighbourhood(name);
  return {
    areaSlug,
    slug,
    name,
    about: `PLACEHOLDER_NEIGHBOURHOOD_ABOUT — ${name} within ${area.name} (${area.boroughLabel}).`,
    accessNote:
      "Tell us about parking, steps and how far items are from where a van can stop.",
    landmarks: [],
    faqs: [
      {
        question: `Do you cover ${name}?`,
        answer: `Include your full postcode — we confirm coverage within ${area.name}.`,
      },
    ],
  };
}

export const neighbourhoods: NeighbourhoodDefinition[] = areas.flatMap((area) =>
  area.neighbourhoods.map((n) => defaultNeighbourhood(area.slug, n)),
);

export function getNeighbourhood(
  areaSlug: string,
  neighbourhoodSlug: string,
): NeighbourhoodDefinition | undefined {
  return neighbourhoods.find(
    (n) => n.areaSlug === areaSlug && n.slug === neighbourhoodSlug,
  );
}

export function getNeighbourhoodsForArea(areaSlug: AreaSlug) {
  return neighbourhoods.filter((n) => n.areaSlug === areaSlug);
}
