export interface JobPhoto {
  id: string;
  /** WebP in /public/gallery */
  src: string;
  alt: string;
  tags: Array<
    | "house-clearance"
    | "garden-waste"
    | "before-after"
    | "loaded"
    | "general"
  >;
}

/** Real clearance job photography (C1-branded vans excluded). */
export const jobPhotos: JobPhoto[] = [
  {
    id: "clearance-01",
    src: "/gallery/job-clearance-01.webp",
    alt: "House clearance items stacked in a room before collection",
    tags: ["house-clearance", "before-after"],
  },
  {
    id: "clearance-02",
    src: "/gallery/job-clearance-02.webp",
    alt: "Furniture and household items ready for waste removal",
    tags: ["house-clearance", "general"],
  },
  {
    id: "clearance-03",
    src: "/gallery/job-clearance-03.webp",
    alt: "Mixed junk and bags cleared from a property",
    tags: ["general", "before-after"],
  },
  {
    id: "8035",
    src: "/gallery/job-IMG_8035jpg.webp",
    alt: "Garden waste and green waste piled for collection",
    tags: ["garden-waste"],
  },
  {
    id: "8036",
    src: "/gallery/job-IMG_8036jpg.webp",
    alt: "Branches and garden cuttings loaded for removal",
    tags: ["garden-waste"],
  },
  {
    id: "7851",
    src: "/gallery/job-IMG_7851jpg.webp",
    alt: "Household clearance load in a van bay (branding not shown)",
    tags: ["loaded", "house-clearance"],
  },
  {
    id: "7786",
    src: "/gallery/job-IMG_7786jpg.webp",
    alt: "Bulky items and furniture during a house clearance",
    tags: ["house-clearance"],
  },
  {
    id: "7585",
    src: "/gallery/job-IMG_7585jpg.webp",
    alt: "Room before clearance with furniture and boxes",
    tags: ["before-after", "house-clearance"],
  },
  {
    id: "7586",
    src: "/gallery/job-IMG_7586jpg.webp",
    alt: "Same clearance after items removed",
    tags: ["before-after", "house-clearance"],
  },
  {
    id: "live-0",
    src: "/gallery/job-7630877058834484502_live_0jpg.webp",
    alt: "Clearance in progress — items sorted for loading",
    tags: ["general", "before-after"],
  },
  {
    id: "live-1",
    src: "/gallery/job-7630877058834484502_live_1jpg.webp",
    alt: "Property after rubbish and furniture removed",
    tags: ["before-after", "house-clearance"],
  },
  {
    id: "8173",
    src: "/gallery/job-IMG_8173jpg.webp",
    alt: "Mixed waste and rubble ready for collection",
    tags: ["general", "loaded"],
  },
  {
    id: "8183",
    src: "/gallery/job-IMG_8183jpg.webp",
    alt: "Loaded clearance items secured in the vehicle",
    tags: ["loaded"],
  },
  {
    id: "8153",
    src: "/gallery/job-IMG_8153jpg.webp",
    alt: "Garden and outdoor waste cleared from a driveway",
    tags: ["garden-waste", "general"],
  },
  {
    id: "7723",
    src: "/gallery/job-IMG_7723jpg.webp",
    alt: "Office and household items during a commercial clearance",
    tags: ["general", "house-clearance"],
  },
];

export function photosForTag(tag: JobPhoto["tags"][number], limit = 4): JobPhoto[] {
  return jobPhotos.filter((p) => p.tags.includes(tag)).slice(0, limit);
}

export function photosForServiceSlug(slug: string): JobPhoto {
  const map: Record<string, JobPhoto["tags"][number]> = {
    "house-clearance": "house-clearance",
    "garden-waste": "garden-waste",
    "office-commercial-clearance": "general",
    "general-junk-rubbish-removal": "general",
    "builders-waste": "loaded",
    "single-items": "general",
  };
  const tag = map[slug] ?? "general";
  return photosForTag(tag, 1)[0] ?? jobPhotos[0];
}

export function gallerySlice(start = 0, count = 8): JobPhoto[] {
  return jobPhotos.slice(start, start + count);
}
