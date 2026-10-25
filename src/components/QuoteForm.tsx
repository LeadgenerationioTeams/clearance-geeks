"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import { submitQuote, type QuoteFormState } from "@/app/actions/quote";
import { services } from "@/lib/services";

const initial: QuoteFormState = { ok: false, message: "" };

const fieldInputClass =
  "quote-form-field mt-1.5 min-h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition placeholder:text-zinc-400";

const fieldSelectClass = `${fieldInputClass} quote-form-select`;

function Field({
  label,
  children,
  hero,
}: {
  label: string;
  children: ReactNode;
  hero: boolean;
}) {
  return (
    <label
      className={
        hero ? "block text-sm font-semibold text-zinc-800" : "block text-sm text-zinc-700"
      }
    >
      <span>{label}</span>
      {children}
    </label>
  );
}

export function QuoteForm({
  id = "quote",
  className = "",
  title = "Get a quote",
  variant = "default",
}: {
  id?: string;
  className?: string;
  title?: string;
  /** @deprecated Single-column layout at all breakpoints; kept for API compatibility */
  compactDesktop?: boolean;
  variant?: "default" | "hero";
}) {
  const [state, action, pending] = useActionState(submitQuote, initial);
  const isHero = variant === "hero";

  const fieldsGap = isHero
    ? "quote-form-hero-fields flex flex-col gap-3.5"
    : "flex flex-col gap-4";

  return (
    <form
      id={id}
      action={action}
      className={`flex flex-col rounded-2xl border bg-white ${
        isHero
          ? "quote-form-hero gap-3.5 border-zinc-200/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] ring-1 ring-black/5 sm:p-6"
          : "gap-4 border-zinc-200/80 p-5 sm:p-6"
      } ${className}`}
    >
      <header
        className={
          isHero
            ? "quote-form-hero-header space-y-1 border-b border-zinc-100 pb-3"
            : "space-y-1"
        }
      >
        <h2
          className={`font-display text-zinc-900 ${
            isHero
              ? "text-2xl leading-tight sm:text-[1.65rem]"
              : "text-2xl sm:text-[1.75rem]"
          }`}
        >
          {title}
        </h2>
        <p className="text-sm leading-snug text-zinc-600">
          {isHero
            ? "Tell us what needs clearing — photos optional but help us size the van."
            : "Tell us what needs clearing. Optional photo helps us size the van."}
        </p>
      </header>

      <div className={fieldsGap}>
        <Field label="Name" hero={isHero}>
          <input name="name" required autoComplete="name" className={fieldInputClass} />
        </Field>
        <Field label="Phone" hero={isHero}>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={fieldInputClass}
          />
        </Field>
        <Field label="Email" hero={isHero}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={fieldInputClass}
          />
        </Field>
        <Field label="Postcode" hero={isHero}>
          <input
            name="postcode"
            required
            autoComplete="postal-code"
            className={fieldInputClass}
          />
        </Field>
        <Field label="Service" hero={isHero}>
          <select name="jobType" className={fieldSelectClass}>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="What needs clearing?" hero={isHero}>
          <textarea
            name="details"
            rows={isHero ? 3 : 4}
            required
            className={`${fieldInputClass} resize-y${isHero ? " quote-form-hero-details" : ""}`}
          />
        </Field>
      </div>

      <div className={isHero ? "space-y-2" : "space-y-2"}>
        <button
          type="submit"
          disabled={pending}
          className={`w-full scroll-mb-[calc(var(--cookie-consent-bar-height)+1rem)] rounded-xl bg-geek-lime font-extrabold uppercase tracking-wide text-black transition hover:bg-geek-lime-bright focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-60 ${
            isHero
              ? "min-h-12 px-6 py-3.5 text-base shadow-[0_0_24px_rgba(139,230,0,0.35)] sm:text-lg"
              : "min-h-12 px-6 py-3 text-lg"
          }`}
        >
          {pending ? "Sending…" : "Send quote request"}
        </button>
        {isHero ? (
          <p className="text-center text-xs leading-snug text-zinc-500">
            Written quote before we load · Your details are only used to respond
          </p>
        ) : null}
      </div>

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
