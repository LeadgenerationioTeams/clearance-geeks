import { focusVisibleOnLightClass } from "./focus-visible";

/** Lime CTA on white/light surfaces — 3:1 non-text contrast + focus ring. */
export const limeButtonOnLightClass =
  `border-2 border-zinc-900 bg-geek-lime text-black hover:bg-geek-lime-bright ${focusVisibleOnLightClass}`;
