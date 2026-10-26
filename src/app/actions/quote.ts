"use server";

import { quoteClosedPublicMessage, siteConfig } from "@/config/site";
import { isValidUkPhone } from "@/lib/phone";

export type QuoteFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: {
    phone?: string;
  };
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
  try {
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const postcode = String(formData.get("postcode") ?? "").trim();
    const jobType = String(formData.get("jobType") ?? "").trim();
    const details = String(formData.get("details") ?? "").trim();
    const photo = formData.get("photo");

    if (!name || !phone || !postcode || !jobType) {
      return {
        ok: false,
        message: "Please fill in all required fields (name, phone, postcode and service).",
      };
    }

    if (!isValidUkPhone(phone)) {
      return {
        ok: false,
        message: "Please enter a valid UK phone number (e.g. 07123 456789 or +44 7123 456789).",
        fieldErrors: {
          phone: "Please enter a valid UK phone number (digits, spaces and +44 only).",
        },
      };
    }

    // Lead destination placeholder. Intentionally sends nowhere for now.
    void { name, phone, postcode, jobType, details, photo };

    if (!siteConfig.quotesOpen) {
      return {
        ok: true,
        message: quoteClosedPublicMessage,
      };
    }

    return {
      ok: false,
      message: "Online quotes aren't open yet. Please check back soon or call us.",
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong sending your request. Please try again or call us.",
    };
  }
}
