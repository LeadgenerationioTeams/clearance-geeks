import Link from "next/link";
import { lvCn } from "@/lib/light-van-page-theme";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={lvCn("text-sm text-zinc-600", "text-sm text-zinc-500")}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 ? (
              <span className={lvCn("text-zinc-500", "text-zinc-600")}>/</span>
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className={lvCn(
                  "inline-flex min-h-11 items-center py-1 text-zinc-700 underline-offset-2 hover:text-[#111] hover:underline",
                  "inline-flex min-h-11 items-center py-1 hover:text-geek-lime",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={lvCn("text-zinc-700", "text-zinc-300")}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
