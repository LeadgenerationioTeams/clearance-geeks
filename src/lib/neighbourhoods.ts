import { areas, getArea, type AreaSlug } from "./areas";
import type { SourceRef } from "@/data/local-sources";

export interface NeighbourhoodDefinition {
  areaSlug: AreaSlug;
  slug: string;
  name: string;
  /** Factual description — no operational history claims. */
  about: string;
  accessNote: string;
  /** Named places only when listed in neighbourhoodSources with a citation. */
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

/** Landmarks cited from Wikipedia or official transport/council pages only. */
const neighbourhoodSources: Record<
  string,
  Pick<NeighbourhoodDefinition, "about" | "accessNote" | "landmarks" | "faqs">
> = {
  "stockport:edgeley": {
    about:
      "Edgeley is a district in Stockport, Greater Manchester. Edgeley Park is the home stadium of Stockport County F.C.",
    accessNote:
      "Major events can affect parking near Edgeley Park — share your preferred loading window.",
    landmarks: [
      {
        name: "Edgeley Park",
        source: {
          label: "Wikipedia — Edgeley Park",
          url: "https://en.wikipedia.org/wiki/Edgeley_Park",
        },
      },
    ],
    faqs: [
      {
        question: "Do you need my full postcode?",
        answer: "Yes — include SK postcode and any parking restrictions you know.",
      },
    ],
  },
  "manchester:city-centre": {
    about:
      "Manchester city centre is the central business and retail district of Manchester.",
    accessNote:
      "Provide building name, floor, lift dimensions and any loading-bay booking rules.",
    landmarks: [
      {
        name: "Piccadilly Gardens",
        source: {
          label: "Wikipedia — Piccadilly Gardens",
          url: "https://en.wikipedia.org/wiki/Piccadilly_Gardens",
        },
      },
    ],
    faqs: [
      {
        question: "Can you work with concierge teams?",
        answer:
          "Share concierge contact and lobby rules when you book — we follow building requirements.",
      },
    ],
  },
  "manchester:fallowfield": {
    about:
      "Fallowfield is a district in south Manchester, known for its parks and proximity to university campuses.",
    accessNote:
      "Terraced streets may have limited parking — note the nearest legal loading point.",
    landmarks: [
      {
        name: "Platt Fields Park",
        source: {
          label: "Wikipedia — Platt Fields Park",
          url: "https://en.wikipedia.org/wiki/Platt_Fields_Park",
        },
      },
    ],
    faqs: [
      {
        question: "What should students’ landlords send?",
        answer: "Item list, photos, postcode and access notes for the property.",
      },
    ],
  },
};

function defaultNeighbourhood(
  areaSlug: AreaSlug,
  name: string,
): NeighbourhoodDefinition {
  const area = getArea(areaSlug)!;
  const slug = slugifyNeighbourhood(name);
  const key = `${areaSlug}:${slug}`;
  const cited = neighbourhoodSources[key];
  if (cited) {
    return { areaSlug, slug, name, ...cited };
  }
  return {
    areaSlug,
    slug,
    name,
    about: `${name} is a neighbourhood within ${area.name} (${area.boroughLabel}).`,
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
