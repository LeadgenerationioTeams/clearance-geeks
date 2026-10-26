"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitQuote, type QuoteFormState } from "@/app/actions/quote";
import {
  publicPhoneNumber,
  quoteClosedPublicMessage,
  siteConfig,
  telHref,
} from "@/config/site";
import { services } from "@/lib/services";
import { isValidUkPhone } from "@/lib/phone";

const initial: QuoteFormState = { ok: false, message: "" };

const fieldInputClass =
  "quote-form-field mt-1.5 min-h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition placeholder:text-zinc-400";

const fieldSelectClass = `${fieldInputClass} quote-form-select`;

const QUOTE_FIELD_SELECTOR =
  "input.quote-form-field, select.quote-form-field, select.quote-form-select, textarea.quote-form-field, .quote-form-submit";

function getQuoteNameField(formId: string): HTMLInputElement | null {
  const form = document.getElementById(formId);
  return form?.querySelector<HTMLInputElement>('input[name="name"]') ?? null;
}

function scrollFieldIntoViewNearest(field: HTMLElement) {
  window.requestAnimationFrame(() => {
    field.scrollIntoView({ block: "nearest" });
  });
}

function focusQuoteNameAfterScroll(formId: string) {
  const form = document.getElementById(formId);
  const field = getQuoteNameField(formId);
  if (!form || !field) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  form.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "instant" });

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      field.focus({ preventScroll: true });
      scrollFieldIntoViewNearest(field);
    });
  });
}

function QuoteClosedNotice() {
  if (siteConfig.quotesOpen) return null;

  const phone = publicPhoneNumber();

  return (
    <p
      className="quote-form-closed-notice quote-form-meta-text rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-amber-950"
    >
      {phone ? (
        <>
          Online quotes aren&apos;t open yet. Please call us on{" "}
          <a
            href={telHref(phone)}
            className="inline-flex min-h-[44px] items-center font-semibold underline py-2"
          >
            {phone}
          </a>
          .
        </>
      ) : (
        quoteClosedPublicMessage
      )}
    </p>
  );
}

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
        hero
          ? "block text-base font-semibold text-zinc-800"
          : "block text-base font-medium text-zinc-700"
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
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const isHero = variant === "hero";
  const formRef = useRef<HTMLFormElement>(null);

  const effectivePhoneError = phoneError || state.fieldErrors?.phone || null;

  useEffect(() => {
    const hash = `#${id}`;
    const formEl = formRef.current;

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.matches(QUOTE_FIELD_SELECTOR)) return;
      scrollFieldIntoViewNearest(target);
    };

    const onHashChange = () => {
      if (window.location.hash !== hash) return;
      focusQuoteNameAfterScroll(id);
    };

    const onQuoteLinkClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest(
        `a[href="${hash}"], a[href$="${hash}"]`,
      );
      if (!link) return;

      const afterNav = () => focusQuoteNameAfterScroll(id);

      if (window.location.hash === hash) {
        event.preventDefault();
        afterNav();
        return;
      }

      const onNextHash = () => {
        window.removeEventListener("hashchange", onNextHash);
        afterNav();
      };
      window.addEventListener("hashchange", onNextHash);
      window.setTimeout(() => {
        if (window.location.hash === hash) {
          window.removeEventListener("hashchange", onNextHash);
          afterNav();
        }
      }, 0);
    };

    formEl?.addEventListener("focusin", onFocusIn);
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onQuoteLinkClick, true);
    onHashChange();

    return () => {
      formEl?.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onQuoteLinkClick, true);
    };
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]');
    const currentPhone = phoneInput?.value ?? "";
    if (!isValidUkPhone(currentPhone)) {
      e.preventDefault();
      setPhoneError("Please enter a valid UK phone number (e.g. 07123 456789 or +44 7123 456789).");
      phoneInput?.focus();
      return;
    }
    setPhoneError(null);
  };

  const fieldsGap = isHero
    ? "quote-form-hero-fields flex flex-col gap-3.5"
    : "flex flex-col gap-4";

  const closedNoticeVisible = !siteConfig.quotesOpen;
  const hideDuplicateClosedMessage =
    closedNoticeVisible && state.message === quoteClosedPublicMessage;

  return (
    <form
      ref={formRef}
      id={id}
      action={action}
      onSubmit={handleSubmit}
      className={`flex flex-col rounded-2xl border bg-white ${
        isHero
          ? "quote-form-hero gap-3.5 border-zinc-200/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] ring-1 ring-black/5 sm:p-6"
          : "gap-4 border-zinc-200/80 p-5 sm:p-6"
      } ${className}`}
    >
      <QuoteClosedNotice />
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
        <p className="text-base leading-snug text-zinc-600">
          {isHero
            ? "Tell us what needs clearing — you can send photos after we reply."
            : "Tell us what needs clearing. You can send photos after we reply."}
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
            value={phoneValue}
            onChange={(e) => {
              setPhoneValue(e.target.value);
              if (phoneError && isValidUkPhone(e.target.value)) {
                setPhoneError(null);
              }
            }}
            onBlur={() => {
              if (phoneValue.trim() && !isValidUkPhone(phoneValue)) {
                setPhoneError("Please enter a valid UK phone number (e.g. 07123 456789 or +44 7123 456789).");
              } else {
                setPhoneError(null);
              }
            }}
            aria-invalid={Boolean(effectivePhoneError)}
            aria-describedby={effectivePhoneError ? "phone-error" : undefined}
            className={`${fieldInputClass} ${
              effectivePhoneError ? "border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {effectivePhoneError ? (
            <p id="phone-error" className="mt-1 text-sm font-medium text-red-600" role="alert">
              {effectivePhoneError}
            </p>
          ) : null}
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
          className={`quote-form-submit w-full rounded-xl bg-geek-lime font-extrabold uppercase tracking-wide text-black transition hover:bg-geek-lime-bright focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-60 ${
            isHero
              ? "min-h-12 px-6 py-3.5 text-base shadow-[0_0_24px_rgba(139,230,0,0.35)] sm:text-lg"
              : "min-h-12 px-6 py-3 text-lg"
          }`}
        >
          {pending ? "Sending…" : "Send quote request"}
        </button>
        <p className="quote-form-privacy-line quote-form-meta-text text-center text-zinc-500">
          We&apos;ll use your details to reply to your quote request and arrange
          the job. See our{" "}
          <Link
            href="/privacy"
            className="inline-flex min-h-[44px] items-center font-medium text-zinc-700 underline py-2"
          >
            privacy notice
          </Link>
          .
        </p>
      </div>

      {!state.ok && state.message ? (
        <div
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-base text-red-800"
          role="alert"
        >
          <p className="font-semibold text-red-900">Unable to submit quote request</p>
          <p className="mt-1">{state.message}</p>
        </div>
      ) : state.ok && state.message && !hideDuplicateClosedMessage ? (
        <p
          className="quote-form-meta-text rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-700"
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
