export type ServiceSlug =
  | "house-clearance"
  | "garden-waste"
  | "office-commercial-clearance"
  | "general-junk-rubbish-removal"
  | "builders-waste"
  | "single-items";

export interface ServiceDefinition {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  headline: string;
  intro: string;
  bullets: string[];
  faqs: { question: string; answer: string }[];
}

export const services: ServiceDefinition[] = [
  {
    slug: "house-clearance",
    title: "House Clearance",
    shortTitle: "House clearance",
    headline: "Full & partial house clearances",
    intro:
      "Whether you are downsizing, handling a probate property, or clearing a rental between tenants, we remove furniture, white goods, bagged waste and mixed household items with care for access, neighbours and parking.",
    bullets: [
      "Room-by-room or whole-property clearances",
      "Sensitive handling for bereavement and probate instructions",
      "Items segregated for reuse and recycling where possible",
      "Sweep-down option once bulky items are out",
    ],
    faqs: [
      {
        question: "Do I need to bag everything first?",
        answer:
          "No. We can remove loose items, furniture and bagged waste in one visit. Tell us about access (stairs, lifts, parking) when you quote.",
      },
      {
        question: "Can you leave the property broom-clean?",
        answer:
          "We can do a basic sweep once bulky waste is removed. Deep cleaning is not included unless agreed in writing.",
      },
    ],
  },
  {
    slug: "garden-waste",
    title: "Garden Waste Removal",
    shortTitle: "Garden waste",
    headline: "Green waste, soil and shed clear-outs",
    intro:
      "From hedge trimmings and fence panels to broken planters and old decking, we load green and mixed garden waste so you are not stuck with a trail of clippings or a car full of mud.",
    bullets: [
      "Grass cuttings, branches, leaves and hedge waste",
      "Broken furniture, sheds and fence panels from gardens",
      "Soil and rubble where agreed (weight limits apply)",
      "Seasonal tidy-ups for landlords and homeowners",
    ],
    faqs: [
      {
        question: "Is soil classed as garden waste?",
        answer:
          "Small amounts can sometimes travel with green waste if booked as mixed garden clearance. Large soil volumes may need a separate builders-waste style load — mention it when you enquire.",
      },
      {
        question: "Do you need garden access?",
        answer:
          "Yes. A side gate or clear path helps. Tell us about steps, width and whether we can park on the drive.",
      },
    ],
  },
  {
    slug: "office-commercial-clearance",
    title: "Office & Commercial Clearance",
    shortTitle: "Office & commercial",
    headline: "Office strip-outs and commercial waste",
    intro:
      "Retail units, offices, workshops and storage rooms — we remove desks, racking, fixtures and bagged commercial waste with minimal disruption to trading hours where possible.",
    bullets: [
      "Office furniture, IT cages and partitioning",
      "Shop fit-out waste and display units",
      "Warehouses and storage units cleared in stages",
      "WEEE-aware handling for screens and printers where required",
    ],
    faqs: [
      {
        question: "Can you work outside business hours?",
        answer:
          "Often yes in city centres and industrial estates. Share your access window and loading bay rules when requesting a quote.",
      },
      {
        question: "Do you provide waste transfer notes?",
        answer:
          "Transfer documentation can be provided for commercial loads when required. Confirm your requirements at booking.",
      },
    ],
  },
  {
    slug: "general-junk-rubbish-removal",
    title: "General Junk & Rubbish Removal",
    shortTitle: "General junk",
    headline: "Mixed rubbish and bulky junk",
    intro:
      "Black bags, broken toys, old luggage, misc garage clutter — if it is not hazardous and fits our licence, we can usually take it in one focused collection.",
    bullets: [
      "Mixed household junk and bagged rubbish",
      "Garage, cellar and understairs clear-outs",
      "Bulky items alongside smaller waste",
      "Same-area runs when routes allow",
    ],
    faqs: [
      {
        question: "What will you not take?",
        answer:
          "Asbestos, clinical waste, fuel and certain chemicals are excluded. Ask if you are unsure about paints, oils or gas bottles.",
      },
      {
        question: "How is pricing worked out?",
        answer:
          "Volume, weight, access and parking drive the quote. Photos through the form help us size the right vehicle first time.",
      },
    ],
  },
  {
    slug: "builders-waste",
    title: "Builders' Waste Removal",
    shortTitle: "Builders' waste",
    headline: "Rubble, plasterboard and trade waste",
    intro:
      "Small building projects and DIY rip-outs generate heavy mixed waste. We collect rubble, timber offcuts, plasterboard and packaging from sites with clear loading points.",
    bullets: [
      "Rubble, bricks and hardcore (within vehicle limits)",
      "Plasterboard kept separate where regulations require",
      "Timber, packaging and mixed construction waste",
      "Repeat collections for longer projects on request",
    ],
    faqs: [
      {
        question: "Do you supply skips?",
        answer:
          "We operate man-and-van style collections rather than skip hire. If you need a skip, we can still clear overflow or final loads.",
      },
      {
        question: "Must plasterboard be separated?",
        answer:
          "Yes where required for disposal routes. Tell us if your waste is mainly plasterboard so we plan segregation.",
      },
    ],
  },
  {
    slug: "single-items",
    title: "Single Item Collection",
    shortTitle: "Single items",
    headline: "One-off sofa, fridge or wardrobe runs",
    intro:
      "Need one heavy item gone without a full clearance? We collect single sofas, mattresses, fridges, wardrobes and appliances when access and parking allow.",
    bullets: [
      "Sofas, beds, wardrobes and tables",
      "Fridges, freezers and white goods (door secured)",
      "Exercise equipment and pianos by prior agreement",
      "Quick collections when routes align",
    ],
    faqs: [
      {
        question: "Is a single item cheaper than a clearance?",
        answer:
          "Often yes for one bulky piece, but parking, stairs and disposal category still matter. Send a photo for an accurate quote.",
      },
      {
        question: "Do fridges need prep?",
        answer:
          "Empty and defrosted is best. We secure doors for transport. Mention if the unit is integrated or American-style.",
      },
    ],
  },
];

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
