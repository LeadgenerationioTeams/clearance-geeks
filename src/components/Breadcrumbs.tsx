import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-base text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 ? <span className="text-zinc-600">/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2 py-1 hover:text-geek-lime"
              >
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex min-h-[44px] items-center py-1 text-zinc-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
