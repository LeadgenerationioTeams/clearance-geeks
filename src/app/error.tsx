"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="site-container flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="font-display text-3xl text-zinc-900 sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-base text-zinc-600">
        An unexpected error occurred. Please try reloading the page.
      </p>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-geek-lime px-6 py-3 text-base font-extrabold uppercase tracking-wide text-black transition hover:bg-geek-lime-bright focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
