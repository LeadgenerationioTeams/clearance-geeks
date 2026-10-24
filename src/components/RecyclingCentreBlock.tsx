import type { AreaSlug } from "@/lib/areas";

/**
 * Public recycling centre references are hidden until Sam confirms service areas
 * and optional recycling-centre mappings in site config.
 * TODO(Sam): Wire verified council recycling references per area when confirmed.
 */
export function RecyclingCentreBlock({
  areaSlug: _areaSlug,
}: {
  areaSlug: AreaSlug;
}) {
  void _areaSlug;
  return null;
}
