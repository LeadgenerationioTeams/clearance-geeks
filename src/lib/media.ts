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
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Living room interior with sofa and side table (stock photo)",
    credit: "Unsplash — Spacejoy",
    creditUrl: "https://unsplash.com/photos/MP0IUfwrn0A",
  },
  gardenWaste: {
    src: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1600&q=80",
    alt: "Green leaves on a wooden surface (stock photo)",
    credit: "Unsplash — Gary Barnes",
    creditUrl: "https://unsplash.com/photos/green-leaves-on-brown-wooden-table-6231",
  },
  officeClearance: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    alt: "Open-plan office interior with desks (stock photo)",
    credit: "Unsplash",
    creditUrl: "https://unsplash.com/photos/photo-1497366216548-37526070297c",
  },
  buildersRubble: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
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
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    alt: "Abstract texture of crumpled light material (stock photo)",
    credit: "Unsplash — Pawel Czerwinski",
    creditUrl: "https://unsplash.com/photos/white-and-brown-cardboard-box-1581578731548",
  },
  brandedSplash: {
    src: "/brand/logo-lockup.webp",
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
