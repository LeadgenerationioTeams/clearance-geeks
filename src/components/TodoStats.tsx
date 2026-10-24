import { todoMarketing } from "@/lib/company";

/** Renders marketing stats only when real data is provided — never fabricated. */
export function TodoStats() {
  const items: string[] = [];
  if (todoMarketing.googleRating != null && todoMarketing.reviewCount != null) {
    items.push(
      `${todoMarketing.googleRating}★ from ${todoMarketing.reviewCount} reviews`,
    );
  }
  if (todoMarketing.yearsTrading != null) {
    items.push(`${todoMarketing.yearsTrading}+ years trading`);
  }
  if (todoMarketing.jobsCompleted != null) {
    items.push(`${todoMarketing.jobsCompleted} jobs completed`);
  }
  if (todoMarketing.awards.length) {
    items.push(...todoMarketing.awards);
  }

  if (!items.length) return null;

  return (
    <ul className="flex flex-wrap gap-3 text-sm text-zinc-300">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-geek-lime/30 px-3 py-1"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
