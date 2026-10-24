import type { ReactNode } from "react";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl text-geek-charcoal">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600">
        {children}
      </div>
    </section>
  );
}

export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <div className="prose prose-zinc max-w-none text-sm leading-relaxed text-zinc-600">
      {children}
    </div>
  );
}
