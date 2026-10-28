import type { ReactNode } from "react";
import { hubAreaName, siteConfig } from "@/config/site";

function Icon({ children }: { children: ReactNode }) {
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-geek-lime/30 bg-geek-lime/10 text-geek-lime"
      aria-hidden
    >
      {children}
    </span>
  );
}

const trustItems = (
  region: string,
  regionSub: string,
) => [
  {
    title: "Written quotes",
    body: "Price agreed before we load",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    title: "Tidy crews",
    body: "Respectful in homes & offices",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  {
    title: "Responsible disposal",
    body: "Recycling where facilities allow",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 19H4a1 1 0 01-1-1V8a1 1 0 011-1h3M7 19h10M7 19l-2-5m12 5l2-5M17 7V5a1 1 0 00-1-1h-4a1 1 0 00-1 1v2" />
      </svg>
    ),
  },
  {
    title: region,
    body: regionSub,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

export function HomeTrustBar() {
  const regionSub = `${hubAreaName(0)}, ${hubAreaName(1)} & beyond`;
  const items = trustItems(siteConfig.serviceAreas.region, regionSub);
  return (
    <section className="border-y border-white/10 bg-zinc-950">
      <ul className="site-container grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-10">
        {items.map((item) => (
          <li key={item.title} className="flex gap-4">
            <Icon>{item.icon}</Icon>
            <div>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-400">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
