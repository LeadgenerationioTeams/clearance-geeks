import { photosForServiceSlug } from "./gallery";
import type { SiteImage } from "./media";
import type { ServiceSlug } from "./services";

export function imageForService(slug: ServiceSlug): SiteImage {
  const photo = photosForServiceSlug(slug);
  return {
    src: photo.src,
    alt: photo.alt,
    credit: "On-site job photography",
    creditUrl: "/",
    illustrative: false,
  };
}
