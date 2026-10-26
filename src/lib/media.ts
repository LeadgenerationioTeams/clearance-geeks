export interface SiteImage {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
  illustrative?: boolean;
}

/**
 * Stock photos: alt text describes the photo only (not a specific town).
 * Van and logo assets are derived from brand/van-sam.png (Clearance Geeks fleet).
 */
export const images = {
  heroClearance: {
    src: "/images/hero-clearance.webp",
    alt: "Living room interior with sofa and side table (stock photo)",
    credit: "Unsplash — Spacejoy",
    creditUrl: "https://unsplash.com/photos/MP0IUfwrn0A",
  },
  gardenWaste: {
    src: "/images/garden-waste.webp",
    alt: "Green leaves on a wooden surface (stock photo)",
    credit: "Unsplash — Gary Barnes",
    creditUrl: "https://unsplash.com/photos/green-leaves-on-brown-wooden-table-6231",
  },
  officeClearance: {
    src: "/images/office-clearance.webp",
    alt: "Open-plan office interior with desks (stock photo)",
    credit: "Unsplash",
    creditUrl: "https://unsplash.com/photos/photo-1497366216548-37526070297c",
  },
  buildersRubble: {
    src: "/images/builders-rubble.webp",
    alt: "Construction site with crane (stock photo)",
    credit: "Unsplash — Ricardo Gomez Angel",
    creditUrl: "https://unsplash.com/photos/yellow-crane-under-blue-sky-1504307651254",
  },
  clearanceGeeksVan: {
    src: "/brand/van-1024.webp",
    alt:
      "The Clearance Geeks branded white van with black and neon green waste removals livery",
    credit: "The Clearance Geeks",
    creditUrl: "/brand/van-hero.webp",
    illustrative: false,
  },
  recycling: {
    src: "/images/recycling.webp",
    alt: "Abstract texture of crumpled light material (stock photo)",
    credit: "Unsplash — Pawel Czerwinski",
    creditUrl: "https://unsplash.com/photos/white-and-brown-cardboard-box-1581578731548",
  },
  brandedSplash: {
    src: "/brand/logo-master.png",
    alt: "The Clearance Geeks logo with geek mascot and wordmark from our van livery",
    credit: "Extracted from fleet van photography",
    creditUrl: "/brand/van-hero.webp",
    illustrative: true,
  },
} satisfies Record<string, SiteImage>;

/** Branded van photo for area and service trust sections. */
export function areaPageImage(): SiteImage {
  return images.clearanceGeeksVan;
}
