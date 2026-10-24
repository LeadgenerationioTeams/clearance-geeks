import { areas, getArea, type AreaSlug } from "./areas";

export interface NeighbourhoodDefinition {
  areaSlug: AreaSlug;
  slug: string;
  name: string;
  intro: string;
  landmarks: string[];
  parkingAccess: string;
  salesPitch: string;
  typicalClearances: string[];
  faqs: { question: string; answer: string }[];
}

export function slugifyNeighbourhood(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type Override = Partial<
  Omit<NeighbourhoodDefinition, "areaSlug" | "slug" | "name">
>;

const overrides: Record<string, Override> = {
  "stockport:edgeley": {
    intro:
      "Edgeley sits tight to Stockport County and the A6 — terrace streets, corner shops and busy match-day parking mean clearance crews need a plan before they arrive.",
    landmarks: ["Edgeley Park", "Grand Central Stockport (nearby)", "King Street shops"],
    parkingAccess:
      "Match days and school runs fill side streets. If you have a drive, keep it clear for the van; otherwise tell us the nearest unrestricted bay.",
    salesPitch:
      "We clear probate terraces and rental turnarounds without blocking the A6 — ideal when you need sofas out before new keys are cut.",
    typicalClearances: [
      "Terrace house furniture with rear yard access only",
      "Garage junk mixed with garden cuttings",
    ],
    faqs: [
      {
        question: "Can you park near Edgeley Park on fixture days?",
        answer:
          "We schedule around kick-off when possible. Share a window that avoids road closures and we confirm feasibility.",
      },
    ],
  },
  "manchester:city-centre": {
    intro:
      "City-centre flats and converted warehouses need lift bookings, concierge sign-in and padded protection in lobbies — not a standard driveway job.",
    landmarks: ["Spinningfields", "Northern Quarter", "Piccadilly Gardens"],
    parkingAccess:
      "Loading bays are time-limited. Book a slot with building management and send us bay numbers or basement ramp details.",
    salesPitch:
      "Concierge-friendly teams for apartment bulky collections — straps, blankets and stair/ lift plans agreed up front.",
    typicalClearances: [
      "Furnished apartment clear-outs between tenants",
      "Office chair and desk volumes from co-working refits",
    ],
    faqs: [
      {
        question: "Do you work with building concierges?",
        answer:
          "Yes — share contact details and lift dimensions. We follow your building’s fire-door and lobby protection rules.",
      },
    ],
  },
  "manchester:fallowfield": {
    intro:
      "Student houses on double-yellow rows mean summer changeover week is intense — mattresses, desks and kitchenware in volume.",
    landmarks: ["Platt Fields Park", "Wilmslow Road takeaway strip", "Fallowfield Campus fringe"],
    parkingAccess:
      "Peak season needs early slots. Cones on a friendly drive help; otherwise expect a short carry from the nearest legal bay.",
    salesPitch:
      "Landlords use us for July turnarounds when eight mattresses and three sofas cannot wait for a skip permit.",
    typicalClearances: ["End-of-year student house clears", "Landlord compliance junk removal"],
    faqs: [
      {
        question: "Can you clear during term time?",
        answer: "Yes, with parking notes. Summer remains busiest — book ahead if you can.",
      },
    ],
  },
};

function defaultNeighbourhood(
  areaSlug: AreaSlug,
  name: string,
): NeighbourhoodDefinition {
  const area = getArea(areaSlug)!;
  const slug = slugifyNeighbourhood(name);
  const key = `${areaSlug}:${slug}`;
  const o = overrides[key] ?? {};
  return {
    areaSlug,
    slug,
    name,
    intro:
      o.intro ??
      `${name} in ${area.name} mixes ${area.housingNotes.slice(0, 120).toLowerCase()}… We quote from your photos so access surprises do not become on-site arguments.`,
    landmarks:
      o.landmarks ?? [
        `${name} local shopping parade`,
        `${area.name} road network`,
      ],
    parkingAccess:
      o.parkingAccess ??
      `Terraced and semi streets around ${name} often need a quick recce on Google Street View — tell us about permits, dropped kerbs and steps.`,
    salesPitch:
      o.salesPitch ??
      `Homeowners and agents in ${name} book us when a full van load is cheaper than skip hire plus two weekends of lifting.`,
    typicalClearances:
      o.typicalClearances ?? [
        `Mixed house clearance near ${name}`,
        `Garden and shed waste after DIY in ${name}`,
      ],
    faqs:
      o.faqs ?? [
        {
          question: `Do you cover all of ${name}?`,
          answer: `Yes within ${area.name} — include your postcode in the form so routing is confirmed.`,
        },
        {
          question: "How fast can you attend?",
          answer:
            "We prioritise Greater Manchester routes daily. Share urgency and we offer the next realistic slot.",
        },
      ],
  };
}

const introHooks = [
  "Probate and rental turnarounds need respectful timing — we agree quiet slots with neighbours in mind.",
  "DIY rip-outs often leave rubble and green waste together — we separate on site when you flag materials.",
  "Corner-shop terraces mean the van cannot block the parade — we plan a legal bay before we dispatch.",
  "Hillside gardens add carry distance — tell us about steps so the quote includes labour fairly.",
  "Flat conversions above shops need lift bookings — send concierge hours with your photos.",
  "Industrial fringes mix commercial cardboard with household junk — describe both streams upfront.",
];

export const neighbourhoods: NeighbourhoodDefinition[] = areas.flatMap((area) =>
  area.neighbourhoods.map((n, idx) => {
    const base = defaultNeighbourhood(area.slug, n);
    const key = `${area.slug}:${base.slug}`;
    if (overrides[key]) return base;
    const hook = introHooks[(idx + area.slug.length) % introHooks.length];
    return {
      ...base,
      intro: `${base.name} sits within ${area.name}'s ${area.boroughLabel}. ${hook} ${base.intro}`,
      landmarks: [
        `${base.name} high street or parade`,
        `Typical work nearby: ${area.typicalJobs[0]}`,
        area.hwrcName ? `Tip runs: ${area.hwrcName}` : `${area.name} local roads`,
      ],
    };
  }),
);

export function getNeighbourhood(
  areaSlug: string,
  neighbourhoodSlug: string,
): NeighbourhoodDefinition | undefined {
  return neighbourhoods.find(
    (n) => n.areaSlug === areaSlug && n.slug === neighbourhoodSlug,
  );
}

export function getNeighbourhoodsForArea(areaSlug: AreaSlug) {
  return neighbourhoods.filter((n) => n.areaSlug === areaSlug);
}

export function isNeighbourhoodSlug(areaSlug: string, subslug: string): boolean {
  return Boolean(getNeighbourhood(areaSlug, subslug));
}
