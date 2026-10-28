"use server";

import { quotesClosedNoticeMessage, siteConfig } from "@/config/site";
import { isValidUkPhone } from "@/lib/phone";

export type QuoteFormState = {
  ok: boolean;
  message: string;
  info?: boolean;
};

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

  if (!isValidUkPhone(phone)) {
    return {
      ok: false,
      message:
        "Please enter a valid UK phone number (e.g. 07123 456789 or +44 7123 456789).",
    };
  }

  // Lead destination placeholder. Intentionally sends nowhere for now.
  void { name, phone, postcode, jobType, details, photo };

  if (!siteConfig.quotesOpen) {
    return {
      ok: false,
      info: true,
      message: quotesClosedNoticeMessage(),
    };
  }

  return {
    ok: true,
    message: "Thanks — we will be in touch shortly.",
  };
}
