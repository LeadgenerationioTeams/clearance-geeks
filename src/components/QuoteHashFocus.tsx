"use client";

import { useEffect } from "react";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function quoteNameInput(): HTMLElement | null {
  const target = document.getElementById("quote");
  if (!target) return null;

  return (
    target.querySelector<HTMLElement>('input[name="name"]') ??
    target.querySelector<HTMLElement>(
      'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])',
    )
  );
}

function focusQuoteNameAfterScroll(): void {
  const name = quoteNameInput();
  if (!name) return;

  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  name.scrollIntoView({ behavior, block: "nearest" });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      name.focus({ preventScroll: true });
    });
  });
}

function isQuoteLink(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute("href");
  if (!href) return false;
  return href === "#quote" || href.endsWith("#quote");
}

export function QuoteHashFocus() {
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash !== "#quote") return;
      focusQuoteNameAfterScroll();
    };

    const onDocumentClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (!isQuoteLink(anchor)) return;

      window.requestAnimationFrame(() => {
        focusQuoteNameAfterScroll();
      });
    };

    if (window.location.hash === "#quote") {
      focusQuoteNameAfterScroll();
    }

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onDocumentClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return null;
}
