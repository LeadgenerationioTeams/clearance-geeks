export interface SiteImage {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
}

/** Licensed remote images — Unsplash License / Wikimedia CC where noted. */
export const images = {
  heroClearance: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Furniture and household items ready for clearance from a living room",
    credit: "Unsplash — Spacejoy",
    creditUrl: "https://unsplash.com/photos/MP0IUfwrn0A",
  },
  gardenWaste: {
    src: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1600&q=80",
    alt: "Garden waste and cut branches piled beside a green lawn",
    credit: "Unsplash — Gary Barnes",
    creditUrl: "https://unsplash.com/photos/green-leaves-on-brown-wooden-table-6231",
  },
  officeClearance: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    alt: "Empty modern office space with desks and chairs",
    credit: "Unsplash — Unsplash+",
    creditUrl: "https://unsplash.com/photos/business-people-in-office-1497366216548",
  },
  buildersRubble: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    alt: "Construction rubble and materials on a building site",
    credit: "Unsplash — Ricardo Gomez Angel",
    creditUrl: "https://unsplash.com/photos/yellow-crane-under-blue-sky-1504307651254",
  },
  vanStreet: {
    src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80",
    alt: "White delivery van on a city street — illustrative of collection runs",
    credit: "Unsplash — CHUTTERSNAP",
    creditUrl: "https://unsplash.com/photos/white-van-on-road-1519003722824",
  },
  manchesterSkyline: {
    src: "https://images.unsplash.com/photo-1605600659873-4e5ade5a0b8c?auto=format&fit=crop&w=1600&q=80",
    alt: "Manchester city skyline with modern towers",
    credit: "Unsplash — Ryan Tang",
    creditUrl: "https://unsplash.com/photos/city-buildings-under-cloudy-sky-1605600659873",
  },
  terracedHouses: {
    src: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
    alt: "Row of brick terraced houses on a UK street",
    credit: "Unsplash — Daniel von Appen",
    creditUrl: "https://unsplash.com/photos/row-of-houses-1460317442991",
  },
  recycling: {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    alt: "Sorted waste and recycling bags ready for collection",
    credit: "Unsplash — Pawel Czerwinski",
    creditUrl: "https://unsplash.com/photos/white-and-brown-cardboard-box-1581578731548",
  },
  brandedSplash: {
    src: "/logo-clearance-geeks.svg",
    alt: "The Clearance Geeks neon green waste removals logo on black",
    credit: "The Clearance Geeks brand artwork",
    creditUrl: "/brand-van-reference.png",
  },
} satisfies Record<string, SiteImage>;

export function pickAreaImage(areaSlug: string): SiteImage {
  const map: Record<string, SiteImage> = {
    manchester: images.manchesterSkyline,
    salford: images.terracedHouses,
    stockport: images.terracedHouses,
    didsbury: images.terracedHouses,
  };
  return map[areaSlug] ?? images.vanStreet;
}
