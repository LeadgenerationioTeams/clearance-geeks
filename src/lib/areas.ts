export type AreaSlug =
  | "stockport"
  | "manchester"
  | "salford"
  | "trafford"
  | "tameside"
  | "oldham"
  | "bolton"
  | "bury"
  | "rochdale"
  | "wigan"
  | "cheadle"
  | "didsbury";

export interface AreaDefinition {
  slug: AreaSlug;
  name: string;
  boroughLabel: string;
  summary: string;
  housingNotes: string;
  neighbourhoods: string[];
  samplePostcodes: string[];
  typicalJobs: string[];
  hwrcName?: string;
  hwrcNote?: string;
  nearbyTowns: { slug: AreaSlug; label: string }[];
  faqs: { question: string; answer: string }[];
  localParagraphs: string[];
}

export const serviceByTownSlugs: AreaSlug[] = ["stockport", "manchester"];

export const areas: AreaDefinition[] = [
  {
    slug: "stockport",
    name: "Stockport",
    boroughLabel: "Stockport Metropolitan Borough",
    summary:
      "Terraced streets around the market place, semis on the Heatons corridor, and post-war estates towards Brinnington — Stockport mixes tight access jobs with larger suburban driveways.",
    housingNotes:
      "Expect Victorian terraces with front steps in Cheadle End and Edgeley, 1930s semis in Bramhall and Cheadle Hulme, and maisonettes near the town centre. Parking permits and narrow alleys are common.",
    neighbourhoods: [
      "Edgeley",
      "Cheadle Hulme",
      "Bramhall",
      "Hazel Grove",
      "Reddish",
      "Brinnington",
      "Heaton Moor",
      "Heaton Mersey",
    ],
    samplePostcodes: ["SK1", "SK2", "SK3", "SK4", "SK7", "SK8"],
    typicalJobs: [
      "Probate clearances on terraced roads off Wellington Road",
      "Garage empty-outs in Bramhall after DIY projects",
      "End-of-tenancy furniture pulls from Reddish terraces",
    ],
    hwrcName: "Bredbury Parkway Household Waste Recycling Centre",
    hwrcNote:
      "Residents often use Bredbury Parkway HWRC for DIY waste; we handle bulky items and mixed loads when you cannot get everything in a car.",
    nearbyTowns: [
      { slug: "cheadle", label: "Cheadle" },
      { slug: "manchester", label: "Manchester" },
      { slug: "tameside", label: "Tameside" },
      { slug: "trafford", label: "Trafford" },
    ],
    faqs: [
      {
        question: "Do you cover SK postcodes only?",
        answer:
          "We cover Stockport borough SK postcodes and bordering villages. Mention your postcode in the quote form so we confirm crew routing.",
      },
      {
        question: "Can you work on the A6 corridor flats?",
        answer:
          "Yes, with lift or stair access details. Peak traffic can affect arrival windows — share a flexible time if possible.",
      },
    ],
    localParagraphs: [
      "Stockport’s valley topography means some jobs need extra time for steep drives in Heaton Norris or winding roads towards Marple. Tell us about steps and whether we can back a van to the door.",
      "Landlords around Merseyway and the university hospital fringe often need fast turnarounds between tenants; photos of leftover furniture speed up sizing the right team.",
    ],
  },
  {
    slug: "manchester",
    name: "Manchester",
    boroughLabel: "Manchester City Council",
    summary:
      "From Northern Quarter lofts to Moss Side terraces and Didsbury semis, Manchester clearance work spans high-rise lifts, permit parking zones and busy student changeovers.",
    housingNotes:
      "City centre apartments with concierge hours, Victorian terraces in Chorlton and Levenshulme, and HMO student houses in Fallowfield and Withington dominate the mix.",
    neighbourhoods: [
      "City Centre",
      "Chorlton",
      "Withington",
      "Fallowfield",
      "Levenshulme",
      "Ancoats",
      "Hulme",
      "Wythenshawe",
    ],
    samplePostcodes: ["M1", "M4", "M14", "M15", "M16", "M20", "M21", "M22"],
    typicalJobs: [
      "Student summer clear-outs in Fallowfield",
      "Apartment bulky collections with lift bookings in Spinningfields",
      "Shop stock clears on Oldham Road industrial units",
    ],
    hwrcName: "Longley Lane Household Waste Recycling Centre",
    hwrcNote:
      "Longley Lane HWRC serves many Manchester residents; we pick up what will not fit a car load or needs two people to lift.",
    nearbyTowns: [
      { slug: "salford", label: "Salford" },
      { slug: "didsbury", label: "Didsbury" },
      { slug: "stockport", label: "Stockport" },
      { slug: "trafford", label: "Trafford" },
    ],
    faqs: [
      {
        question: "Do you handle city-centre permit zones?",
        answer:
          "Yes. Share your permit details or bay number. Waiting times for loading slots should be booked where your building requires it.",
      },
      {
        question: "Can you clear during term time?",
        answer:
          "Student areas are busiest outside term; we can still work in term with parking plans. Early morning slots help on narrow terraced streets.",
      },
    ],
    localParagraphs: [
      "Canal-side apartments around Castlefield need careful protection of lift lobbies; we bring blankets for sofas and mark out trolley routes with building managers when asked.",
      "Wythenshawe and Benchill estates often have generous drive access — ideal for mixed house and garden clearances in one visit.",
    ],
  },
  {
    slug: "salford",
    name: "Salford",
    boroughLabel: "Salford City Council",
    summary:
      "MediaCity waterfront flats, Langworthy terraces and new builds at Pomona — Salford combines tight urban streets with riverside loading bays.",
    housingNotes:
      "High-rise living near the Quays, traditional terraces in Seedley and Weaste, and family semis in Worsley and Monton shape different access needs.",
    neighbourhoods: [
      "Salford Quays",
      "MediaCity",
      "Langworthy",
      "Eccles",
      "Swinton",
      "Walkden",
      "Worsley",
      "Ordsall",
    ],
    samplePostcodes: ["M3", "M5", "M6", "M27", "M28", "M30", "M50"],
    typicalJobs: [
      "Apartment furniture removals with dock lifts at the Quays",
      "Terrace clearances near Salford Crescent",
      "Garage waste from Worsley cul-de-sacs",
    ],
    hwrcName: "Lumley Street Recycling Centre",
    hwrcNote:
      "Lumley Street RC is the main Salford site many residents reference for DIY trips; we handle overflow and bulky items.",
    nearbyTowns: [
      { slug: "manchester", label: "Manchester" },
      { slug: "trafford", label: "Trafford" },
      { slug: "bolton", label: "Bolton" },
    ],
    faqs: [
      {
        question: "Do you cover M50 at the Quays?",
        answer: "Yes. Include building name, floor and lift dimensions if you have them.",
      },
      {
        question: "What about Swinton retail park waste?",
        answer:
          "Commercial strip-outs need a quick description of fixtures and whether waste is on the pavement or inside the unit.",
      },
    ],
    localParagraphs: [
      "Ordsall and Chapel Street regeneration zones often have temporary parking restrictions — a contact number on site helps crews find you quickly.",
      "Walkden and Boothstown approaches include hillier drives; mention if a long push to the house is needed from the main road.",
    ],
  },
  {
    slug: "trafford",
    name: "Trafford",
    boroughLabel: "Trafford (Sale, Altrincham & Stretford)",
    summary:
      "Leafy Sale avenues, Altrincham market-town terraces and Stretford semis — Trafford jobs often involve driveways but also tram-corridor parking pressure.",
    housingNotes:
      "1930s semis in Sale and Timperley, town-centre terraces near Altrincham interchange, and flats by the Trafford Centre fringe.",
    neighbourhoods: [
      "Sale",
      "Altrincham",
      "Stretford",
      "Urmston",
      "Timperley",
      "Partington",
      "Bowdon",
      "Hale",
    ],
    samplePostcodes: ["M16", "M17", "M31", "M32", "M33", "WA14", "WA15"],
    typicalJobs: [
      "Garage clearances in Timperley",
      "Shop back-room waste in Altrincham centre",
      "Garden waste after hedge work in Hale",
    ],
    hwrcName: "Chester Road Household Waste Recycling Centre",
    hwrcNote:
      "Chester Road HWRC (Stretford) is widely used locally; we take bulky and mixed loads when a car is not enough.",
    nearbyTowns: [
      { slug: "manchester", label: "Manchester" },
      { slug: "stockport", label: "Stockport" },
      { slug: "salford", label: "Salford" },
    ],
    faqs: [
      {
        question: "Do you cover WA14 and WA15?",
        answer: "Yes — Bowdon and Hale fall within our Trafford coverage.",
      },
      {
        question: "Metrolink works nearby — can you still access?",
        answer:
          "Tell us about road closures on your street; we plan alternate parking or shorter carries.",
      },
    ],
    localParagraphs: [
      "Sale Moor and Ashton-on-Mersey have many dropped kerbs — great for fast loading if you can keep the drive clear.",
      "Partington and Carrington industrial edges see trade waste mixed with household clearances from nearby estates.",
    ],
  },
  {
    slug: "tameside",
    name: "Tameside",
    boroughLabel: "Tameside (Ashton, Hyde & Denton)",
    summary:
      "Ashton market town streets, Hyde mill terraces and Denton post-war estates — Tameside mixes hillside access with valley-floor terraces.",
    housingNotes:
      "Steep gardens in Stalybridge, long terraces in Hyde, and semis in Denton and Droylsden with varied off-street parking.",
    neighbourhoods: [
      "Ashton-under-Lyne",
      "Hyde",
      "Denton",
      "Droylsden",
      "Stalybridge",
      "Audenshaw",
      "Mossley",
      "Dukinfield",
    ],
    samplePostcodes: ["OL6", "OL7", "SK14", "M34", "M43"],
    typicalJobs: [
      "Cellar clearances on Ashton terraces",
      "Shed dismantling in Denton gardens",
      "Shop strip-outs on Hyde high street",
    ],
    hwrcName: "Ash Road Household Waste Recycling Centre",
    hwrcNote:
      "Ash Road HWRC at Droylsden is the familiar tip name locally; we handle what will not fit your boot.",
    nearbyTowns: [
      { slug: "stockport", label: "Stockport" },
      { slug: "oldham", label: "Oldham" },
      { slug: "manchester", label: "Manchester" },
    ],
    faqs: [
      {
        question: "Do you cover SK14 (Hyde)?",
        answer: "Yes — Hyde, Gee Cross and surrounding SK14 areas are in scope.",
      },
      {
        question: "Hillside access in Mossley?",
        answer:
          "Mention narrow lanes and whether we need a smaller van or two-trip plan.",
      },
    ],
    localParagraphs: [
      "The A57 corridor through Denton can be busy at school run times — flexible arrival windows help crews load safely on the pavement.",
      "Dukinfield and Ashton canal basins have some cobbled yards; tell us if trolleys need solid wheels only.",
    ],
  },
  {
    slug: "oldham",
    name: "Oldham",
    boroughLabel: "Oldham Metropolitan Borough",
    summary:
      "Hillside terraces above the town centre, Shaw and Royton semis, and former mill conversions — Oldham clearances often involve stairs and tight ginnels.",
    housingNotes:
      "Stone terraces in Lees and Waterhead, suburban semis in Chadderton, and newer estates on the Rochdale border.",
    neighbourhoods: [
      "Oldham town centre",
      "Shaw",
      "Royton",
      "Chadderton",
      "Lees",
      "Failsworth",
      "Saddleworth",
      "Derker",
    ],
    samplePostcodes: ["OL1", "OL2", "OL4", "OL8", "OL9"],
    typicalJobs: [
      "Loft clearances in Royton semis",
      "Mill apartment bulky waste in the town centre",
      "Garden rubble from hillside extensions in Saddleworth",
    ],
    hwrcName: "Arkwright Street Recycling Centre",
    hwrcNote:
      "Arkwright Street RC is the named Oldham facility many residents use for DIY waste.",
    nearbyTowns: [
      { slug: "rochdale", label: "Rochdale" },
      { slug: "tameside", label: "Tameside" },
      { slug: "manchester", label: "Manchester" },
    ],
    faqs: [
      {
        question: "Do you go into Saddleworth villages?",
        answer:
          "Yes, with extra travel noted in the quote. Narrow village streets may need a meet-and-carry plan.",
      },
      {
        question: "Failsworth border with Manchester?",
        answer: "We cover Failsworth OL8/OL9 — include your postcode to confirm.",
      },
    ],
    localParagraphs: [
      "Oldham’s steep streets off Union Street reward an early slot before on-street parking fills up.",
      "Chadderton industrial units occasionally need mixed commercial and office waste — describe racking and desk counts up front.",
    ],
  },
  {
    slug: "bolton",
    name: "Bolton",
    boroughLabel: "Bolton Metropolitan Borough",
    summary:
      "From Bolton town centre terraces to Horwich and Westhoughton semis, workloads range from student lets near the university to family garage clear-outs.",
    housingNotes:
      "Victorian terraces in Farnworth and Kearsley, stone cottages towards Turton, and newer estates in Lostock.",
    neighbourhoods: [
      "Bolton town centre",
      "Horwich",
      "Westhoughton",
      "Farnworth",
      "Kearsley",
      "Little Lever",
      "Harwood",
      "Astley Bridge",
    ],
    samplePostcodes: ["BL1", "BL2", "BL3", "BL4", "BL5", "BL6"],
    typicalJobs: [
      "Rental clearances near Bolton University",
      "Builders’ waste from kitchen refits in Horwich",
      "Shed removals in Turton gardens",
    ],
    hwrcName: "Raikes Lane Household Waste Recycling Centre",
    hwrcNote:
      "Raikes Lane HWRC is the Bolton name residents recognise for tip runs.",
    nearbyTowns: [
      { slug: "bury", label: "Bury" },
      { slug: "salford", label: "Salford" },
      { slug: "wigan", label: "Wigan" },
    ],
    faqs: [
      {
        question: "Do you cover BL6 Horwich?",
        answer: "Yes — Horwich, Rivington fringe and Lostock are included.",
      },
      {
        question: "Can you take soil from garden projects?",
        answer:
          "Small amounts may ride with mixed garden waste; large soil volumes need declaring for weight planning.",
      },
    ],
    localParagraphs: [
      "Astley Bridge’s hillside roads can be icy in winter — mention if access is on a slope so we bring grip mats if needed.",
      "Middlebrook retail and arena parking rules mean commercial waste must be collected from agreed bays, not random car parks.",
    ],
  },
  {
    slug: "bury",
    name: "Bury",
    boroughLabel: "Bury Metropolitan Borough",
    summary:
      "Bury market town terraces, Prestwich semis and Ramsbottom valley homes — a mix of tram-linked suburbs and Pennine fringe villages.",
    housingNotes:
      "Stone terraces in Tottington, 1930s housing in Whitefield, and village cottages on the Rossendale border.",
    neighbourhoods: [
      "Bury town centre",
      "Prestwich",
      "Whitefield",
      "Radcliffe",
      "Ramsbottom",
      "Tottington",
      "Unsworth",
      "Pilsworth",
    ],
    samplePostcodes: ["BL0", "BL8", "BL9", "M25", "M45"],
    typicalJobs: [
      "Probate clearances on Bury terraces",
      "Office chair removals in Prestwich business strips",
      "Green waste after hedge cutting in Ramsbottom",
    ],
    hwrcName: "Every Street Household Waste Recycling Centre",
    hwrcNote:
      "Every Street HWRC in Fernhill is the Bury site name locals cite.",
    nearbyTowns: [
      { slug: "rochdale", label: "Rochdale" },
      { slug: "bolton", label: "Bolton" },
      { slug: "manchester", label: "Manchester" },
    ],
    faqs: [
      {
        question: "Do you cover M25 Prestwich?",
        answer: "Yes — Prestwich and Heaton Park fringe are regular routes.",
      },
      {
        question: "Village lanes in Holcombe?",
        answer: "Share gate width and whether a van can pass parked cars.",
      },
    ],
    localParagraphs: [
      "Metrolink works in Bury centre can shift loading spots — a mobile number for the day helps.",
      "Radcliffe canal-side terraces sometimes need waste carried through passages; measure narrowest point if you can.",
    ],
  },
  {
    slug: "rochdale",
    name: "Rochdale",
    boroughLabel: "Rochdale Metropolitan Borough",
    summary:
      "Rochdale town terraces, Middleton semis and Littleborough valley properties — clearances span flat town grids and hillside gardens.",
    housingNotes:
      "Mill-era terraces near the town hall, interwar semis in Middleton, and stone cottages towards the Pennines.",
    neighbourhoods: [
      "Rochdale town centre",
      "Middleton",
      "Heywood",
      "Littleborough",
      "Milnrow",
      "Wardle",
      "Castleton",
      "Norden",
    ],
    samplePostcodes: ["OL10", "OL11", "OL12", "OL15", "OL16"],
    typicalJobs: [
      "Heywood terrace end-of-tenancy clears",
      "Middleton garage mixed waste",
      "Littleborough garden stone and green waste combos",
    ],
    hwrcName: "Spring Vale Household Waste Recycling Centre",
    hwrcNote:
      "Spring Vale HWRC serves Rochdale borough for resident DIY disposal.",
    nearbyTowns: [
      { slug: "oldham", label: "Oldham" },
      { slug: "bury", label: "Bury" },
      { slug: "manchester", label: "Manchester" },
    ],
    faqs: [
      {
        question: "Do you cover OL16?",
        answer: "Yes — central Rochdale and surrounding OL16 streets.",
      },
      {
        question: "Heywood separate from Rochdale?",
        answer: "Heywood is within our Rochdale borough coverage.",
      },
    ],
    localParagraphs: [
      "The Esplanade and Drake Street area has timed loading restrictions — mention if you have a bay booked.",
      "Norden and Bamford sit on steep lanes; two-person carries from the house to the van may add time.",
    ],
  },
  {
    slug: "wigan",
    name: "Wigan",
    boroughLabel: "Wigan Metropolitan Borough",
    summary:
      "Wigan town terraces, Leigh market streets and Ashton-in-Makerfield semis — plus new estates on former colliery land.",
    housingNotes:
      "Terraces in Ince and Hindley, semis in Standish, and bungalows in Shevington with generous front gardens.",
    neighbourhoods: [
      "Wigan town centre",
      "Leigh",
      "Ashton-in-Makerfield",
      "Standish",
      "Atherton",
      "Tyldesley",
      "Golborne",
      "Hindley",
    ],
    samplePostcodes: ["WN1", "WN2", "WN3", "WN4", "WN5", "WN6", "WN7"],
    typicalJobs: [
      "Leigh high street shop back-room clears",
      "Garage waste in Standish",
      "Garden fence and shed waste in Tyldesley",
    ],
    hwrcName: "Kirkless Household Waste Recycling Centre",
    hwrcNote:
      "Kirkless HWRC is the Wigan borough tip name most residents know.",
    nearbyTowns: [
      { slug: "bolton", label: "Bolton" },
      { slug: "salford", label: "Salford" },
      { slug: "manchester", label: "Manchester" },
    ],
    faqs: [
      {
        question: "Do you cover WN7 Leigh?",
        answer: "Yes — Leigh, Atherton and Tyldesley are included.",
      },
      {
        question: "Can you collect from canal-side paths?",
        answer:
          "Only with safe van parking nearby; waste must be brought to the kerb if paths are pedestrian-only.",
      },
    ],
    localParagraphs: [
      "Wigan pier and town centre flats need lift bookings where concierge rules apply.",
      "Golborne and Lowton bridges can be weight-restricted — we plan routes to avoid surprises.",
    ],
  },
  {
    slug: "cheadle",
    name: "Cheadle",
    boroughLabel: "Stockport — Cheadle & Cheadle Hulme",
    summary:
      "Village-centre cottages, 1930s semis and modern estates around Cheadle Royal — a suburban patch with drives but busy A34 parking.",
    housingNotes:
      "Semis near Cheadle Hulme station, bungalows off Cheadle Road, and flats above the village shops.",
    neighbourhoods: [
      "Cheadle village",
      "Cheadle Hulme",
      "Cheadle Heath",
      "Adswood",
      "Gatley fringe",
    ],
    samplePostcodes: ["SK8", "SK3"],
    typicalJobs: [
      "Driveway garage clear-outs near Cheadle Royal",
      "Single sofa lifts from first-floor village flats",
      "Garden waste after patio removals",
    ],
    hwrcName: "Bredbury Parkway Household Waste Recycling Centre",
    hwrcNote:
      "Many Cheadle residents already use Bredbury Parkway HWRC; we step in for bulky mixed loads.",
    nearbyTowns: [
      { slug: "stockport", label: "Stockport" },
      { slug: "trafford", label: "Trafford" },
      { slug: "manchester", label: "Manchester" },
    ],
    faqs: [
      {
        question: "Is Cheadle separate from Stockport town?",
        answer:
          "Cheadle is its own village within Stockport borough — we treat it as a focused local patch.",
      },
      {
        question: "A34 roadworks?",
        answer: "Tell us about temporary bus lane changes affecting parking near your road.",
      },
    ],
    localParagraphs: [
      "Cheadle Hulme’s commuter streets fill with parked cars by evening — morning collections can be smoother.",
      "School-run pressure on Cheadle Road means we may ask you to reserve a space with cones if you have a drive.",
    ],
  },
  {
    slug: "didsbury",
    name: "Didsbury",
    boroughLabel: "Manchester — Didsbury & West Didsbury",
    summary:
      "Victorian villas on Wilmslow Road, family semis in East Didsbury and riverside flats — Didsbury mixes conservation-area care with student lets.",
    housingNotes:
      "Large bay-front terraces, 1930s semis towards Parrs Wood, and modern apartments off Palatine Road.",
    neighbourhoods: [
      "West Didsbury village",
      "East Didsbury",
      "Didsbury Park",
      "Barlow Moor",
      "Northenden fringe",
    ],
    samplePostcodes: ["M20", "M21"],
    typicalJobs: [
      "Student house clearances near Wilmslow Road",
      "Conservation-area careful furniture removal",
      "Garden green waste from Mersey-adjacent plots",
    ],
    hwrcName: "Longley Lane Household Waste Recycling Centre",
    hwrcNote:
      "Didsbury households often travel to Longley Lane HWRC; we handle oversized items locally.",
    nearbyTowns: [
      { slug: "manchester", label: "Manchester" },
      { slug: "stockport", label: "Stockport" },
      { slug: "trafford", label: "Trafford" },
    ],
    faqs: [
      {
        question: "Do you cover M21 Chorlton border streets?",
        answer:
          "Yes — roads that sit between Chorlton and West Didsbury are fine; postcode confirms routing.",
      },
      {
        question: "Basements on older villas?",
        answer:
          "Flag narrow stair turns and whether items can be dismantled before collection.",
      },
    ],
    localParagraphs: [
      "Burton Road cafes mean weekend parking is tight — weekday slots or resident permits help crews stay legal.",
      "Mersey floodplain gardens sometimes hold damp timber waste; keep it separate from soil if possible.",
    ],
  },
];

export const areaSlugs = areas.map((a) => a.slug);

export function getArea(slug: string): AreaDefinition | undefined {
  return areas.find((a) => a.slug === slug);
}

/** Unique blurbs for service×town pages — keyed `${town}:${service}` */
export function getServiceTownBlurb(
  town: AreaSlug,
  service: string,
): string {
  const blurbs: Record<string, string> = {
    "stockport:house-clearance":
      "Stockport terraces near the Viaduct often need sofa pivots on tight landings — we plan two-person carries before arrival.",
    "stockport:garden-waste":
      "Hazel Grove and Bramhall gardens generate hedge and fence waste after winter storms; we load green and mixed timber in one go.",
    "stockport:office-commercial-clearance":
      "Bredbury and Portwood industrial units request desk and racking pulls without blocking shared yards.",
    "stockport:general-junk-rubbish-removal":
      "SK1 town-centre flats send mixed bag waste and small furniture when lifts are booked for an hour.",
    "stockport:builders-waste":
      "Edgeley bathroom refits produce plasterboard and tile rubble — we separate board when you flag it upfront.",
    "stockport:single-items":
      "Heaton Moor bay-window sofas are a common single-item job with street parking on double yellows — permits noted in quotes.",
    "manchester:house-clearance":
      "Fallowfield student houses need fast summer turnarounds with mattresses and desks in volume.",
    "manchester:garden-waste":
      "Chorlton back alleys fit green waste runs when the front street is permit-only only.",
    "manchester:office-commercial-clearance":
      "Northern Quarter studio offices strip small fit-outs with chairs and laminate flooring waste.",
    "manchester:general-junk-rubbish-removal":
      "Hulme maisonettes clear understairs junk alongside a few black bags for landlord inspections.",
    "manchester:builders-waste":
      "Levenshulme kitchen rip-outs stack bagged rubble ready for a morning collection slot.",
    "manchester:single-items":
      "City-centre fridge removals need lift padding and door taping — we bring straps and blankets.",
  };
  return (
    blurbs[`${town}:${service}`] ??
    `Local ${service.replace(/-/g, " ")} support across ${town}.`
  );
}
