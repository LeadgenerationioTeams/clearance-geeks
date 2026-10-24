"use client";

import { useActionState } from "react";
import { submitQuote, type QuoteFormState } from "@/app/actions/quote";
import { services } from "@/lib/services";

const initial: QuoteFormState = { ok: false, message: "" };

export function QuoteForm({ id = "quote" }: { id?: string }) {
  const [state, action, pending] = useActionState(submitQuote, initial);

  return (
    <form
      id={id}
      action={action}
      className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-md sm:p-6"
    >
      <h2 className="font-display text-2xl text-zinc-900 sm:text-3xl">
        Get a quote
      </h2>
      <p className="text-sm text-zinc-600">
        Tell us what needs clearing. Optional photo helps us size the van.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-zinc-700">Name</span>
          <input
            name="name"
            required
            className="mt-1 w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900"
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-700">Phone</span>
          <input
            name="phone"
            type="tel"
            required
            className="mt-1 w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-zinc-700">Email</span>
        <input
          name="email"
          type="email"
          className="mt-1 w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900"
        />
      </label>
      <label className="block text-sm">
        <span className="text-zinc-700">Postcode</span>
        <input
          name="postcode"
          required
          className="mt-1 w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900"
        />
      </label>
      <label className="block text-sm">
        <span className="text-zinc-700">Service</span>
        <select
          name="service"
          className="mt-1 w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900"
        >
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-zinc-700">What needs clearing?</span>
        <textarea
          name="details"
          rows={4}
          required
          className="mt-1 w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="w-full min-h-11 rounded-lg bg-geek-lime px-6 py-3 text-sm font-semibold text-geek-charcoal transition hover:bg-geek-lime-bright disabled:opacity-60"
      >
        {pending ? "Sending…" : "Request quote"}
      </button>
      {state.message ? (
        <p
          className={`text-sm ${state.ok ? "text-green-800" : "text-red-700"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
