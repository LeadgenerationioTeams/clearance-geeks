export interface SiteImage {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
  illustrative?: boolean;
}

/**
 * Page imagery: real job photos from /gallery and fleet assets from /brand.
 * Alt text describes what is visible only (not a specific town).
 */
export const images = {
  heroClearance: {
    src: "/gallery/job-clearance-02.webp",
    alt: "Empty living room after house clearance",
    credit: "The Clearance Geeks",
    creditUrl: "/gallery",
    illustrative: false,
  },
  gardenWaste: {
    src: "/gallery/job-clearance-03.webp",
    alt: "Back garden with bare soil patch after structure removal",
    credit: "The Clearance Geeks",
    creditUrl: "/gallery",
    illustrative: false,
  },
  clearanceGeeksVan: {
    src: "/brand/van-1024.webp",
    alt:
      "The Clearance Geeks branded white van with black and neon green waste removals livery",
    credit: "The Clearance Geeks",
    creditUrl: "/brand/van-hero.webp",
    illustrative: false,
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
