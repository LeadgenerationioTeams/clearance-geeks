export type HomeHeroVariant = "default" | "light-van";

/**
 * Selects the home page hero layout.
 * Set NEXT_PUBLIC_HOME_HERO=light-van on a preview or deployment to try the light van hero.
 */
export function resolveHomeHeroVariant(): HomeHeroVariant {
  const raw = process.env.NEXT_PUBLIC_HOME_HERO?.trim().toLowerCase();
  if (raw === "light-van" || raw === "light") return "light-van";
  if (raw === "default" || raw === "dark") return "default";
  const ref = process.env.VERCEL_GIT_COMMIT_REF;
  if (ref === "cursor/cg-light-van-hero-2b91" || ref === "cursor/cg-light-van-hero") {
    return "light-van";
  }
  return "default";
}
