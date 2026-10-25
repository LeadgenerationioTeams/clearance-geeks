import { focusRingLimeButton } from "@/lib/focus-rings";

/** Lime CTA on white/light surfaces — 3:1 non-text contrast + accessible focus. */
export const limeButtonOnLightClass = `border-2 border-[#111] bg-geek-lime text-[#111] hover:bg-geek-lime-bright ${focusRingLimeButton}`;
