/** Shared with inline head script and CookieConsent — keep in sync. */
export const COOKIE_CONSENT_STORAGE_KEY = "tcg_cookie_consent_v1";

/** Initial cookie bar height before React measures; matches globals.css. */
export const COOKIE_BAR_INITIAL_HEIGHT = "8.5rem";

/** Runs before first paint to match banner visibility without waiting for React. */
export const cookieBannerBootstrapScript = `(function(){try{var k="${COOKIE_CONSENT_STORAGE_KEY}";var v=localStorage.getItem(k);if(v!=="granted"&&v!=="denied"){var r=document.documentElement;r.dataset.cookieBanner="open";r.style.setProperty("--cookie-bar-h","${COOKIE_BAR_INITIAL_HEIGHT}")}catch(e){}})();`;
