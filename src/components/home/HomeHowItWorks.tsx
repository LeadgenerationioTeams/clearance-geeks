const steps = [
  {
    step: "1",
    title: "Tell us what needs clearing",
    body: "Call or send photos with your postcode. We confirm access and parking.",
  },
  {
    step: "2",
    title: "Agree a written quote",
    body: "You get a price before we load — no surprise extras on the day.",
  },
  {
    step: "3",
    title: "We load and sweep up",
    body: "Crews clear the space, protect floors where needed, and take waste away.",
  },
];

export function HomeHowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-white">
      <div className="site-container">
        <h2 className="font-display text-3xl text-zinc-900 md:text-4xl">How it works</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <li
              key={s.step}
              className="relative rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm"
            >
              <span
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 font-display text-3xl leading-none text-geek-lime"
                aria-hidden
              >
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-2xl text-zinc-900">{s.title}</h3>
              <p className="mt-3 text-sm text-zinc-600 md:text-base">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
