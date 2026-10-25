/** Shared with inline head script and CookieConsent — keep in sync. */
export const COOKIE_CONSENT_STORAGE_KEY = "tcg_cookie_consent_v1";

/** Runs before first paint to match banner visibility without waiting for React. */
export const cookieBannerBootstrapScript = `(function(){try{var k="${COOKIE_CONSENT_STORAGE_KEY}";var v=localStorage.getItem(k);if(v!=="granted"&&v!=="denied"){document.documentElement.dataset.cookieBanner="open"}}catch(e){}})();`;
