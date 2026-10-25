import { resolveHomeHeroVariant } from "@/lib/home-hero";
import { HomeHero } from "./HomeHero";
import { HomeHeroLightVan } from "./HomeHeroLightVan";

export function HomeHeroSection() {
  if (resolveHomeHeroVariant() === "light-van") {
    return <HomeHeroLightVan />;
  }
  return <HomeHero />;
}
