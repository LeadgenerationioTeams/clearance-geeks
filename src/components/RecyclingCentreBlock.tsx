import type { AreaSlug } from "@/lib/areas";
import { getRecyclingCentreForArea } from "@/lib/areas";

export function RecyclingCentreBlock({ areaSlug }: { areaSlug: AreaSlug }) {
  const centre = getRecyclingCentreForArea(areaSlug);
  if (!centre) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
      <h3 className="font-semibold text-geek-charcoal">
        Public recycling centre (reference)
      </h3>
      <p className="mt-2">
        <strong className="text-geek-charcoal">{centre.name}</strong>
        <br />
        {centre.address}
      </p>
      <p className="mt-2 text-xs text-zinc-500">{centre.servesNotes}</p>
      <p className="mt-2 text-xs">
        Source:{" "}
        <a
          href={centre.source.url}
          className="font-medium text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4"
          rel="noopener noreferrer"
          target="_blank"
        >
          {centre.source.label}
        </a>
      </p>
    </div>
  );
}
