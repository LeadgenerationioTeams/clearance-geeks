"use client";

import { useEffect } from "react";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function quoteHashActive(): boolean {
  return window.location.hash === "#quote";
}

function focusQuoteFirstField(): void {
  if (!quoteHashActive()) return;

  const target = document.getElementById("quote");
  if (!target) return;

  const first = target.querySelector<HTMLElement>(
    'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])',
  );
  if (!first) return;

  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  first.scrollIntoView({ behavior, block: "nearest" });
  first.focus({ preventScroll: true });
}

function isQuoteLink(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute("href");
  if (!href) return false;
  return href === "#quote" || href.endsWith("#quote");
}

export function QuoteHashFocus() {
  useEffect(() => {
    const onHashChange = () => {
      focusQuoteFirstField();
    };

    const onDocumentClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (!isQuoteLink(anchor)) return;
      window.requestAnimationFrame(() => {
        focusQuoteFirstField();
      });
    };

    focusQuoteFirstField();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onDocumentClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return null;
}
