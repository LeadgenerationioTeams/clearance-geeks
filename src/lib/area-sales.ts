export const clearanceProcess = [
  {
    step: "1",
    title: "Send photos & postcode",
    body:
      "WhatsApp-style clarity: tell us what is going, where it sits in the property, and how we reach it. We size the crew and van without guesswork.",
  },
  {
    step: "2",
    title: "Clear price before we load",
    body:
      "You get a written quote for the load described. If the job grows on site, we agree any change before extra items go in the van.",
  },
  {
    step: "3",
    title: "We load, sweep, responsibly dispose",
    body:
      "Two-person teams protect doorways and lifts, sweep the cleared space if booked, and route waste through licensed disposal — paperwork on request for commercial jobs.",
  },
] as const;

export function whyChooseUsForArea(areaName: string): string[] {
  return [
    `Routes planned around ${areaName} traffic, schools runs and permit bays — not generic national call-centre slots.`,
    "Licensed waste carrier paperwork available for landlords, agents and commercial strip-outs.",
    "Respectful crews for probate, bereavement and tenant changeovers — no pressure selling on site.",
    "Photos-first quoting so terraced stairs, lifts and long carries are priced once, fairly.",
  ];
}

export function heroBenefitHeadline(areaName: string): string {
  return `Waste clearance in ${areaName} — priced before we load`;
}
