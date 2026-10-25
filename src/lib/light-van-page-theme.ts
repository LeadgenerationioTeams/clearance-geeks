import { isLightVanExperience } from "@/lib/home-hero";
import { cn } from "@/lib/cn";

/** Shared typography for inner pages when the light-van experience is active. */
export function lightVanPage() {
  return isLightVanExperience();
}

export function lvCn(light: string, dark: string) {
  return lightVanPage() ? light : dark;
}

export const lvPageClasses = {
  h1: () =>
    cn(
      "mt-4 font-display text-4xl sm:text-5xl",
      lvCn("text-[#111]", "text-geek-lime"),
    ),
  h1Flush: () =>
    cn(
      "font-display text-4xl sm:text-5xl",
      lvCn("text-[#111]", "text-geek-lime"),
    ),
  semibold: () => lvCn("font-semibold text-[#111]", "font-semibold text-white"),
  intro: () => lvCn("mt-4 max-w-2xl text-zinc-700", "mt-4 max-w-2xl text-zinc-300"),
  introLg: () =>
    lvCn("mt-4 text-lg text-zinc-700", "mt-4 text-lg text-geek-lime/90"),
  body: () => lvCn("text-zinc-700", "text-zinc-300"),
  bodyMuted: () => lvCn("text-zinc-600", "text-zinc-400"),
  h2: () =>
    cn("font-display text-2xl", lvCn("text-[#111]", "text-white")),
  h2Lime: () =>
    cn("font-display text-2xl", lvCn("text-[#111]", "text-geek-lime")),
  h3: () =>
    cn("font-display text-xl", lvCn("text-[#111]", "text-white")),
  link: () =>
    lvCn(
      "font-semibold text-[#111] underline",
      "text-geek-lime underline",
    ),
  linkMuted: () =>
    lvCn(
      "text-sm font-semibold text-zinc-600 underline",
      "text-sm font-semibold text-zinc-400 underline",
    ),
  card: () =>
    lvCn(
      "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-geek-lime/50",
      "rounded-2xl border border-zinc-800 bg-zinc-950 p-5 hover:border-geek-lime/50",
    ),
  cardTitle: () =>
    cn("font-display text-2xl", lvCn("text-[#111]", "text-white")),
  cardMeta: () =>
    lvCn("mt-1 text-sm uppercase text-zinc-600", "mt-1 text-base uppercase text-zinc-500"),
  cardBody: () => lvCn("mt-2 text-sm text-zinc-600", "mt-2 text-sm text-zinc-400"),
  ctaLime: () =>
    "inline-flex min-h-11 items-center rounded-xl bg-geek-lime px-5 font-bold text-black",
  listItem: () =>
    lvCn(
      "rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-700",
      "rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400",
    ),
  sectionBand: () =>
    lvCn(
      "border-y border-zinc-200 bg-zinc-50 py-10",
      "border-y border-zinc-800 bg-zinc-950/40 py-10",
    ),
  stepNumber: () =>
    cn("font-display text-2xl", lvCn("text-[#111]", "text-geek-lime")),
};

export function legalArticleClass() {
  return cn(
    "legal-content prose mt-8 max-w-none break-words",
    lightVanPage()
      ? "prose-zinc text-zinc-700"
      : "prose-invert prose-zinc text-zinc-300",
  );
}

export function legalHeadingClass() {
  return cn("font-display", lvCn("text-[#111]", "text-geek-lime"));
}

export function legalLinkClass() {
  return lvCn("text-[#111] underline hover:text-zinc-800", "text-geek-lime hover:underline");
}
