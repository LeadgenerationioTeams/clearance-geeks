"use server";

import { services } from "@/lib/services";

export type QuoteFormState = {
  ok: boolean;
  message: string;
};

export async function submitQuote(
  _prev: QuoteFormState | null,
  formData: FormData,
): Promise<QuoteFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const postcode = String(formData.get("postcode") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();
  const photo = formData.get("photo");

  if (!name || !phone || !postcode || !service || !details) {
    return {
      ok: false,
      message: "Please fill in name, phone, postcode, service and job details.",
    };
  }

  const validService = services.some((s) => s.slug === service);
  if (!validService) {
    return {
      ok: false,
      message: "Please choose a valid service type.",
    };
  }

  // TODO: Wire lead destination (CRM, email, webhook). Intentionally sends nowhere.
  void { name, phone, email, postcode, service, details, photo };

  return {
    ok: true,
    message:
      "Thanks — your request is recorded locally for now. We will confirm once contact details are live.",
  };
}
