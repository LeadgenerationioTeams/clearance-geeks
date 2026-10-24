import { images, type SiteImage } from "./media";
import type { ServiceSlug } from "./services";

export function imageForService(slug: ServiceSlug): SiteImage {
  const map: Record<ServiceSlug, SiteImage> = {
    "house-clearance": images.heroClearance,
    "garden-waste": images.gardenWaste,
    "office-commercial-clearance": images.officeClearance,
    "general-junk-rubbish-removal": images.recycling,
    "builders-waste": images.buildersRubble,
    "single-items": images.clearanceGeeksVan,
  };
  return map[slug];
}
