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
      className="space-y-4 rounded-2xl border border-geek-lime/40 bg-zinc-950/80 p-5 backdrop-blur sm:p-6"
    >
      <h2 className="font-display text-2xl text-white sm:text-3xl">
        Get a quote
      </h2>
      <p className="text-sm text-zinc-400">
        Tell us what needs clearing. Optional photo helps us size the van.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-zinc-300">Name</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-300">Phone</span>
          <input
            name="phone"
            type="tel"
            required
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-300">Postcode</span>
          <input
            name="postcode"
            required
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white uppercase"
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-300">Job type</span>
          <select
            name="jobType"
            required
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white"
          >
            <option value="">Select…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="other">Other / mixed</option>
          </select>
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-zinc-300">Details (access, parking, items)</span>
        <textarea
          name="details"
          rows={3}
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white"
        />
      </label>
      <label className="block text-sm">
        <span className="text-zinc-300">Photo (optional)</span>
        <input
          name="photo"
          type="file"
          accept="image/*"
          className="mt-1 w-full text-sm text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-geek-lime file:px-3 file:py-2 file:font-semibold file:text-black"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="w-full min-h-12 rounded-xl bg-geek-lime font-bold text-black disabled:opacity-60"
      >
        {pending ? "Sending…" : "Request quote"}
      </button>
      {state.message ? (
        <p
          className={`text-sm ${state.ok ? "text-geek-lime" : "text-red-400"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
