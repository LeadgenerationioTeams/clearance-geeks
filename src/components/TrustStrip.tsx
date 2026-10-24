const items = [
  "Written quotes before we load",
  "Single items & full clearances",
  "Waste transfer notes on request",
  "Recycling where facilities allow",
];

export function TrustStrip() {
  return (
    <div className="border-b border-zinc-200 bg-white">
      <ul
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 text-center text-xs font-medium text-geek-charcoal sm:text-sm"
      >
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-geek-lime"
              aria-hidden
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
