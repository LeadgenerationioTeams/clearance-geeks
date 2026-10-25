import type { AreaSlug } from "@/lib/areas";
import { getRecyclingCentreForArea } from "@/lib/areas";
import { lvCn, lvPageClasses } from "@/lib/light-van-page-theme";

export function RecyclingCentreBlock({ areaSlug }: { areaSlug: AreaSlug }) {
  const centre = getRecyclingCentreForArea(areaSlug);
  if (!centre) return null;

  return (
    <div
      className={lvCn(
        "rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700",
        "rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400",
      )}
    >
      <h3 className={lvCn("font-semibold text-[#111]", "font-semibold text-white")}>
        Public recycling centre (reference)
      </h3>
      <p className="mt-2">
        <strong className={lvCn("text-[#111]", "text-zinc-200")}>
          {centre.name}
        </strong>
        <br />
        {centre.address}
      </p>
      <p className={lvCn("mt-2 text-sm text-zinc-600", "mt-2 text-sm text-zinc-500")}>
        {centre.servesNotes}
      </p>
      <p className="mt-2 text-sm">
        Source:{" "}
        <a
          href={centre.source.url}
          className={lvPageClasses.link()}
          rel="noopener noreferrer"
          target="_blank"
        >
          {centre.source.label}
        </a>
      </p>
    </div>
  );
}
