import { photosForTag } from "@/lib/gallery";
import { JobPhoto } from "./JobPhoto";

const steps = [
  {
    step: "1",
    title: "Tell us what needs clearing",
    body: "Call or send photos with your postcode. We confirm access and parking.",
    photoTag: "before-after" as const,
  },
  {
    step: "2",
    title: "Agree a written quote",
    body: "You get a price before we load — no surprise extras on the day.",
    photoTag: "general" as const,
  },
  {
    step: "3",
    title: "We load and sweep up",
    body: "Crews clear the space, protect floors where needed, and take waste away.",
    photoTag: "loaded" as const,
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-zinc-200 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-2xl text-geek-charcoal sm:text-3xl">
          How it works
        </h2>
        <ol className="mt-10 grid gap-10 lg:grid-cols-3">
          {steps.map((step, index) => {
            const photo =
              photosForTag(step.photoTag, 3)[index] ??
              photosForTag("general", 1)[0];
            return (
              <li key={step.step} className="flex flex-col">
                <JobPhoto
                  photo={photo}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
                <span
                  className="mt-5 text-sm font-semibold uppercase tracking-wide text-geek-lime"
                  aria-hidden
                >
                  Step {step.step}
                </span>
                <h3 className="mt-1 font-display text-lg text-geek-charcoal">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
