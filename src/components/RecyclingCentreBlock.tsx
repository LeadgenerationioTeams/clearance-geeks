import type { AreaSlug } from "@/lib/areas";
import { getRecyclingCentreForArea } from "@/lib/areas";

export function RecyclingCentreBlock({ areaSlug }: { areaSlug: AreaSlug }) {
  const centre = getRecyclingCentreForArea(areaSlug);
  if (!centre) return null;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
      <h3 className="font-semibold text-white">Public recycling centre (reference)</h3>
      <p className="mt-2">
        <strong className="text-zinc-200">{centre.name}</strong>
        <br />
        {centre.address}
      </p>
      <p className="mt-2 text-sm text-zinc-500">{centre.servesNotes}</p>
      <p className="mt-2 text-sm">
        Source:{" "}
        <a
          href={centre.source.url}
          className="inline-flex min-h-[44px] items-center text-geek-lime underline py-2"
          rel="noopener noreferrer"
          target="_blank"
        >
          {centre.source.label}
        </a>
      </p>
    </div>
  );
}
