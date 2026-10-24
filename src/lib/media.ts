export interface SiteImage {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
  illustrative?: boolean;
}

/**
 * Stock photos: alt text describes the photo only (not a specific town).
 * Brand SVG is illustrative artwork — not a photograph of a job site.
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
  vanStreet: {
    src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80",
    alt: "White van on a city street (stock photo)",
    credit: "Unsplash — CHUTTERSNAP",
    creditUrl: "https://unsplash.com/photos/white-van-on-road-1519003722824",
  },
  recycling: {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    alt: "Abstract texture of crumpled light material (stock photo)",
    credit: "Unsplash — Pawel Czerwinski",
    creditUrl: "https://unsplash.com/photos/white-and-brown-cardboard-box-1581578731548",
  },
  brandedSplash: {
    src: "/logo-clearance-geeks.svg",
    alt: "Illustrative The Clearance Geeks logo on black",
    credit: "Illustrative brand artwork (see brand reference)",
    creditUrl: "/brand-van-reference.png",
    illustrative: true,
  },
} satisfies Record<string, SiteImage>;

/** Same neutral stock photo for all area pages — not location-specific. */
export function areaPageImage(): SiteImage {
  return images.vanStreet;
}
