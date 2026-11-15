import { NextResponse } from "next/server";
import { createCheckoutForDraft } from "@/lib/bin-booking/checkout";
import { validateBookingDraft } from "@/lib/bin-booking/validate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validated = validateBookingDraft(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const result = await createCheckoutForDraft(validated.draft);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  return NextResponse.json({
    url: result.url,
    bookingId: result.bookingId,
  });
}