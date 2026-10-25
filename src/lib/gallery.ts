import type { ServiceSlug } from "./services";

export interface JobPhoto {
  id: string;
  src: string;
  alt: string;
  /** Neutral gallery line — describes what is visible only */
  caption: string;
  tags: Array<
    | "house-clearance"
    | "garden-waste"
    | "before-after"
    | "loaded"
    | "general"
  >;
}

export const jobPhotos: JobPhoto[] = [
  {
    id: "clearance-01",
    src: "/gallery/job-clearance-01.webp",
    alt: "Empty bedroom with bare floor after clearance",
    caption: "Bedroom cleared of furniture and old carpet, showing bare subfloor.",
    tags: ["house-clearance"],
  },
  {
    id: "clearance-02",
    src: "/gallery/job-clearance-02.webp",
    alt: "Empty living room after house clearance",
    caption: "Living room emptied with floor coverings removed.",
    tags: ["house-clearance"],
  },
  {
    id: "clearance-03",
    src: "/gallery/job-clearance-03.webp",
    alt: "Back garden with bare soil patch after structure removal",
    caption: "Rear garden area cleared after removing a shed base and debris.",
    tags: ["garden-waste", "general"],
  },
  {
    id: "8035",
    src: "/gallery/job-IMG_8035jpg.webp",
    alt: "Mattresses and fridge-freezers on a driveway",
    caption: "Bulky items — mattresses and white goods — ready for collection.",
    tags: ["general"],
  },
  {
    id: "8036",
    src: "/gallery/job-IMG_8036jpg.webp",
    alt: "Paving slabs, pallet and bagged waste on a driveway",
    caption: "Builders-style waste: slabs, pallet and bagged rubble on a driveway.",
    tags: ["general"],
  },
  {
    id: "7851",
    src: "/gallery/job-IMG_7851jpg.webp",
    alt: "Appliances, suitcases and boxes in a storage room",
    caption: "Household goods and appliances gathered in a basement store room.",
    tags: ["house-clearance", "loaded"],
  },
  {
    id: "7786",
    src: "/gallery/job-IMG_7786jpg.webp",
    alt: "Rows of filled black waste bags beside a house",
    caption: "Bagged general waste stacked outside a property.",
    tags: ["general"],
  },
  {
    id: "7586",
    src: "/gallery/job-IMG_7586jpg.webp",
    alt: "Bulk bags of commercial flooring and cardboard waste",
    caption: "Commercial waste in bulk bags — flooring samples and cardboard.",
    tags: ["general"],
  },
  {
    id: "live-0",
    src: "/gallery/job-7630877058834484502_live_0jpg.webp",
    alt: "Mixed junk in a narrow side passage",
    caption: "Mixed household waste in a side passage — cardboard and metal frames.",
    tags: ["general"],
  },
  {
    id: "live-1",
    src: "/gallery/job-7630877058834484502_live_1jpg.webp",
    alt: "Narrow side passage with soil and leaves on the ground",
    caption: "Side passage with soil and leaves after waste was removed.",
    tags: ["garden-waste", "general"],
  },
  {
    id: "8173",
    src: "/gallery/job-IMG_8173jpg.webp",
    alt: "Cluttered garage with furniture and appliances",
    caption: "Garage clearance — furniture, appliances and bagged rubbish.",
    tags: ["house-clearance", "general"],
  },
  {
    id: "8183",
    src: "/gallery/job-IMG_8183jpg.webp",
    alt: "Rolled old carpets in a room being renovated",
    caption: "Old carpets and underlay rolled up during a renovation strip-out.",
    tags: ["house-clearance"],
  },
  {
    id: "8153",
    src: "/gallery/job-IMG_8153jpg.webp",
    alt: "Old sofas and garden furniture on a patio",
    caption: "Worn sofas and garden furniture cleared from a brick patio.",
    tags: ["general", "garden-waste"],
  },
  {
    id: "7723",
    src: "/gallery/job-IMG_7723jpg.webp",
    alt: "Mattress and TV box on a lawn",
    caption: "Mattress and large TV packaging waiting for collection on a lawn.",
    tags: ["general"],
  },
];

const photoById = new Map(jobPhotos.map((p) => [p.id, p]));

export function getJobPhoto(id: string): JobPhoto {
  const photo = photoById.get(id);
  if (!photo) throw new Error(`Unknown job photo: ${id}`);
  return photo;
}

/** One distinct, relevant photo per service card on the home page. */
export const homeServicePhotoIds: Record<ServiceSlug, string> = {
  "house-clearance": "clearance-01",
  "garden-waste": "clearance-03",
  "office-commercial-clearance": "7586",
  "general-junk-rubbish-removal": "7786",
  "builders-waste": "8036",
  "single-items": "8035",
};

export function photosForServiceSlug(slug: string): JobPhoto {
  const id = homeServicePhotoIds[slug as ServiceSlug];
  return id ? getJobPhoto(id) : jobPhotos[0];
}

export function photosForTag(tag: JobPhoto["tags"][number], limit = 4): JobPhoto[] {
  return jobPhotos.filter((p) => p.tags.includes(tag)).slice(0, limit);
}

export function gallerySlice(start = 0, count = 8): JobPhoto[] {
  return jobPhotos.slice(start, start + count);
}

/** Home gallery — varied jobs, no duplicate IDs. */
export const homeGalleryPhotoIds = [
  "clearance-02",
  "8035",
  "8036",
  "8173",
  "7723",
  "8153",
  "7851",
  "live-0",
  "8183",
  "7586",
] as const;

export function homeGalleryPhotos(): JobPhoto[] {
  return homeGalleryPhotoIds.map(getJobPhoto);
}
