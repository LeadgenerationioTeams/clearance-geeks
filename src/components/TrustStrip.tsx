import { siteConfig } from "@/config/site";

const items = [
  "Written quotes before we load",
  "Tidy, respectful crews",
  "Recycling where facilities allow",
  `${siteConfig.serviceAreas.region} coverage`,
];

export function TrustStrip() {
  return (
    <div className="border-b border-zinc-200 bg-zinc-100">
      <ul
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-zinc-700"
      >
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="text-geek-lime" aria-hidden>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
