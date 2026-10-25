"use client";

import type { ReactNode } from "react";
import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { submitQuote, type QuoteFormState } from "@/app/actions/quote";
import {
  hasCallablePhone,
  quotesClosedNoticeMessage,
  siteConfig,
  telHref,
} from "@/config/site";
import { services } from "@/lib/services";

const initial: QuoteFormState = { ok: false, message: "" };

const fieldScrollMargin =
  "max-lg:scroll-mb-[calc(88px+var(--cookie-bar-h,0px)+4px)]";

const fieldInputClass =
  `mt-1.5 min-h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-geek-lime focus-visible:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 lg:mt-1 lg:py-2.5 ${fieldScrollMargin}`;

const heroSelectClass = `${fieldInputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.75rem_0.75rem] bg-[position:right_0.75rem_center] bg-no-repeat pr-10`;

function QuotesNotOpenNotice({ hero }: { hero: boolean }) {
  if (siteConfig.quotesOpen) return null;

  const message = quotesClosedNoticeMessage();
  const callable = hasCallablePhone();

  return (
    <p
      className={`rounded-lg border border-amber-300/80 bg-amber-50 text-sm leading-tight text-amber-950 ${
        hero ? "px-2.5 py-1" : "px-3 py-2 leading-snug"
      }`}
    >
      {callable ? (
        <>
          Online quotes aren&apos;t open yet. Please call us on{" "}
          <a href={telHref()} className="font-semibold underline">
            {siteConfig.company.phone}
          </a>
          .
        </>
      ) : (
        message
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
  compactDesktop = false,
  variant = "default",
}: {
  id?: string;
  className?: string;
  title?: string;
  compactDesktop?: boolean;
  variant?: "default" | "hero";
}) {
  const [state, action, pending] = useActionState(submitQuote, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const isHero = variant === "hero";
  const tightLg = compactDesktop || isHero;
  const quotesClosed = !siteConfig.quotesOpen;

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const onFocusIn = (event: FocusEvent) => {
      const el = event.target;
      if (!(el instanceof HTMLElement)) return;
      if (!el.matches("input, select, textarea, button")) return;

      requestAnimationFrame(() => {
        el.scrollIntoView({ block: "nearest" });
      });
    };

    form.addEventListener("focusin", onFocusIn);
    return () => form.removeEventListener("focusin", onFocusIn);
  }, []);

  const nameField = (
    <Field label="Name" hero={isHero}>
      <input name="name" required autoComplete="name" className={fieldInputClass} />
    </Field>
  );
  const phoneField = (
    <Field label="Phone" hero={isHero}>
      <input
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        className={fieldInputClass}
      />
    </Field>
  );

  const heroPairGrid =
    "grid grid-cols-1 gap-3.5 overflow-visible lg:grid-cols-2 lg:gap-2";

  return (
    <form
      ref={formRef}
      id={id}
      tabIndex={-1}
      action={action}
      className={`flex flex-col rounded-2xl border bg-white ${
        isHero
          ? `border-zinc-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.28)] ring-1 ring-black/5 sm:p-6 lg:gap-2 lg:p-3.5 ${
              quotesClosed
                ? "gap-2 p-4 lg:gap-1.5"
                : "gap-3.5 p-5"
            }`
          : "gap-4 border-zinc-200/80 p-5 sm:p-6"
      } ${tightLg && !isHero ? "lg:gap-2 lg:p-4" : ""} ${className}`}
    >
      <QuotesNotOpenNotice hero={isHero} />
      <header
        className={
          isHero
            ? `border-b border-zinc-100 ${
                quotesClosed
                  ? "space-y-0.5 pb-2 lg:pb-1.5"
                  : "space-y-1 pb-3 lg:space-y-0.5 lg:pb-2"
              }`
            : ""
        }
      >
        <h2
          className={`font-display text-zinc-900 ${
            isHero
              ? "text-2xl leading-tight sm:text-[1.65rem] lg:text-xl"
              : `text-2xl sm:text-[1.75rem] ${tightLg ? "lg:text-xl" : ""}`
          }`}
        >
          {title}
        </h2>
        <p className="text-sm leading-snug text-zinc-600 lg:text-xs lg:leading-snug">
          {isHero
            ? "Tell us what needs clearing — you can send photos after we reply."
            : "Tell us what needs clearing. You can send photos after we reply."}
        </p>
      </header>

      <div
        className={
          isHero
            ? "flex flex-col gap-3.5 lg:gap-2"
            : tightLg
              ? "space-y-3 lg:space-y-2"
              : "space-y-4"
        }
      >
        {isHero ? (
          <>
            <div className={heroPairGrid}>
              {nameField}
              {phoneField}
            </div>
            <div className={heroPairGrid}>
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
            </div>
          </>
        ) : (
          <>
            <div className={`grid gap-4 sm:grid-cols-2 ${tightLg ? "lg:gap-2" : ""}`}>
              {nameField}
              {phoneField}
            </div>
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
          </>
        )}

        <Field label="Service" hero={isHero}>
          <select
            name="jobType"
            className={isHero ? heroSelectClass : fieldInputClass}
          >
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
            rows={isHero ? 2 : tightLg ? 2 : 4}
            required
            className={`${fieldInputClass} resize-y ${isHero || tightLg ? "lg:min-h-0 lg:py-2" : ""}`}
          />
        </Field>
      </div>

      <div
        className={
          isHero ? "space-y-2 pt-0 lg:space-y-1" : "mt-4 space-y-2"
        }
      >
        <button
          type="submit"
          disabled={pending}
          className={`w-full rounded-xl bg-geek-lime font-extrabold uppercase tracking-wide text-black transition hover:bg-geek-lime-bright disabled:opacity-60 ${fieldScrollMargin} ${
            isHero
              ? "min-h-12 px-6 py-3.5 text-base shadow-[0_0_24px_rgba(139,230,0,0.35)] sm:text-lg lg:min-h-11 lg:py-2.5 lg:text-sm"
              : "px-6 py-3 text-lg"
          }`}
        >
          {pending ? "Sending…" : "Send quote request"}
        </button>
        <p
          className={`text-sm leading-snug text-zinc-600 ${isHero ? "text-center" : ""}`}
        >
          We&apos;ll use your details to reply to your quote request and arrange
          the job. See our{" "}
          <Link href="/privacy" className="font-semibold text-zinc-900 underline">
            privacy notice
          </Link>
          .
        </p>
        {isHero ? (
          <p className="text-center text-xs leading-snug text-zinc-500 lg:text-[11px] lg:leading-tight">
            Written quote before we load
          </p>
        ) : null}
      </div>

      {state.message ? (
        <p
          className={`text-sm ${
            state.info
              ? "rounded-lg border border-amber-300/80 bg-amber-50 px-3 py-2 text-amber-950"
              : state.ok
                ? "text-green-800"
                : "text-red-700"
          }`}
          role={state.info ? undefined : "status"}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
