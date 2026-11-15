"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { limeButtonOnLightClass } from "@/lib/lime-button";

export function ManageSubscriptionPortal({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Portal unavailable until payment completes.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Could not open customer portal.");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <h2 className="font-semibold text-zinc-900">Manage subscription</h2>
      <p className="mt-2 text-sm text-zinc-600">
        Pause, update payment details or cancel through Stripe&apos;s secure customer portal.
      </p>
      {error ? <p className="mt-2 text-sm text-red-600" role="alert">{error}</p> : null}
      <button
        type="button"
        disabled={loading}
        onClick={openPortal}
        className={cn(
          "mt-4 inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-extrabold uppercase tracking-wide disabled:opacity-50",
          limeButtonOnLightClass,
        )}
      >
        {loading ? "Opening…" : "Open customer portal"}
      </button>
    </div>
  );
}