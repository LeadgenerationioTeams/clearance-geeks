export type HomeHeroVariant = "default" | "light-van";

const LIGHT_VAN_REF_PREFIX = "cursor/cg-light-van-hero";

/**
 * Selects the home page hero layout.
 *
 * **Light van hero is on automatically** for Vercel previews on branch
 * `cursor/cg-light-van-hero-2b91` (no env var required).
 *
 * **Elsewhere**, set at build time:
 * `NEXT_PUBLIC_HOME_HERO=light-van`
 *
 * Force the original dark hero: `NEXT_PUBLIC_HOME_HERO=default`
 */
export function resolveHomeHeroVariant(): HomeHeroVariant {
  const raw = process.env.NEXT_PUBLIC_HOME_HERO?.trim().toLowerCase();
  if (raw === "default" || raw === "dark") return "default";
  if (raw === "light-van" || raw === "light") return "light-van";

  const ref = process.env.VERCEL_GIT_COMMIT_REF ?? "";
  if (ref.startsWith(LIGHT_VAN_REF_PREFIX)) {
    return "light-van";
  }

  return "default";
}

export function isLightVanExperience(): boolean {
  return resolveHomeHeroVariant() === "light-van";
}
