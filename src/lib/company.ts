/**
 * Reads company details and helpers from `siteConfig` in `@/config/site`.
 * Placeholders live in `src/config/site.ts` only.
 * Re-export shim so existing imports keep working.
 */
export {
  company,
  siteConfig,
  siteUrl,
  todoMarketing,
  isPlaceholder,
  formatRegisteredAddress,
  serviceAreasListText,
  telHref,
  quoteHrefForPath,
  hasPageQuoteForm,
} from "@/config/site";
