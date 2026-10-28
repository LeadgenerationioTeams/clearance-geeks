import {
  focusVisibleOnDarkClass,
  focusVisibleOnLightClass,
} from "./focus-visible";

const limeFillClass =
  "border-2 border-zinc-900 bg-geek-lime text-black hover:bg-geek-lime-bright";

/** Lime CTA on white/light surfaces — #111 ring with offset on the form card. */
export const limeButtonOnLightClass =
  `${limeFillClass} ${focusVisibleOnLightClass}`;

/** Lime CTA on dark bars/banners — lime ring with offset on the dark background. */
export const limeButtonOnDarkClass =
  `${limeFillClass} ${focusVisibleOnDarkClass}`;
