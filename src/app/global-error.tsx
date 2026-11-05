"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 text-center text-zinc-900">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-base text-zinc-600">
          An unexpected error occurred. Please try reloading the page.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-geek-lime px-6 py-3 text-base font-extrabold uppercase tracking-wide text-black transition hover:bg-geek-lime-bright focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
