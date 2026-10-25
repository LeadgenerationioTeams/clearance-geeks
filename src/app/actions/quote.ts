"use server";

import { company, isPlaceholder, siteConfig } from "@/config/site";

export type QuoteFormState = {
  ok: boolean;
  message: string;
};

/**
 * Wiring checklist (before go-live) — see ICO review finding 13:
 * - Sam: decide lead destination (`siteConfig.compliance.leadRecipient`).
 * - If another company receives leads, name them in /privacy and on the form.
 * - Choose processors (host, CRM, email) and document in the privacy notice.
 * - Persist leads (database, CRM API, or email via Resend/SMTP) with access controls.
 * - Add env vars for API keys/webhooks; never log full PII in production logs.
 * - Send notification to operations; optional auto-reply to customer.
 * - Retention job aligned with `quoteRetentionIfNotBooked` in site config.
 * - Load analytics only inside CookieConsent `OptionalAnalytics` after Accept.
 * - Update success copy to confirm submission; remove "not open yet" message.
 */
export async function submitQuote(
  _prev: QuoteFormState | null,
  formData: FormData,
): Promise<QuoteFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const postcode = String(formData.get("postcode") ?? "").trim();
  const jobType = String(formData.get("jobType") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();
  const photo = formData.get("photo");

  if (!name || !phone || !postcode || !jobType) {
    return {
      ok: false,
      message: "Please fill in name, phone, postcode and job type.",
    };
  }

  // TODO: Wire lead destination (CRM, email, webhook). Intentionally sends nowhere.
  void { name, phone, postcode, jobType, details, photo };

  if (!siteConfig.quotesOpen) {
    const phoneForMessage = isPlaceholder(company.phone)
      ? "[number]"
      : company.phone;

    return {
      ok: true,
      message: `Online quotes aren't open yet. Please call us on ${phoneForMessage}.`,
    };
  }

  return {
    ok: false,
    message: "Quote submission is not configured yet. Please call us.",
  };
}
