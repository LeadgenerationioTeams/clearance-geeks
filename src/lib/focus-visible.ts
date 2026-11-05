/** 3:1+ focus ring on black / dark UI (footer, sticky bar, cookie banner). */
export const focusVisibleOnDarkClass =
  "focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-geek-lime";

/** 3:1+ focus ring on white / lime fills (#111 reads clearly in WebKit). */
export const focusVisibleOnLightClass =
  "focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]";

/** Same #111 ring when focus is moved programmatically (status regions). */
export const focusOnLightClass =
  "focus:outline focus:outline-solid focus:outline-2 focus:outline-offset-2 focus:outline-[#111111] focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]";
