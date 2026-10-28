/**
 * Central site & business configuration — swap this file to update the whole site.
 * Search for PLACEHOLDER_ and TODO(Sam) before go-live.
 */

export type SourceRef = {
  label: string;
  url: string;
};

export const sources = {
  r4gmFindCentre: {
    label: "Recycle for Greater Manchester — Find a recycling centre",
    url: "https://recycleforgreatermanchester.com/find-a-recycling-centre/",
  },
  gmacaWaste: {
    label: "GMCA — Recycle for Greater Manchester",
    url: "https://www.greatermanchester-ca.gov.uk/what-we-do/waste-and-resources/r4gm/",
  },
  wiganCentres: {
    label: "Wigan Council — Waste and recycling centres",
    url: "https://www.wigan.gov.uk/Resident/Bins-Recycling/Waste-and-Recycling-Centres.aspx",
  },
  tamesideHwrc: {
    label: "Tameside Council — Household waste recycling centres",
    url: "https://www.tameside.gov.uk/refuseandrecycling/recycling/household-waste-recycling-centres",
  },
} satisfies Record<string, SourceRef>;

/** R4GM / council-named sites only — names and addresses match operator listings. */
export const recyclingCentres = {
  bredburyParkway: {
    name: "Bredbury Parkway Recycling Centre",
    address: "Bredbury Park Way, Bredbury Park Industrial Estate, Bredbury, SK6 2SN",
    source: {
      label: "R4GM — Bredbury Parkway",
      url: "https://recycleforgreatermanchester.com/recycle-centre/bredbury-parkway-recycling-centre/",
    },
    servesNotes: "R4GM site used by Stockport borough residents.",
  },
  adswoodRoad: {
    name: "Adswood Road Recycling Centre",
    address: "Adswood Road, Cheadle Hulme, SK8 5QY",
    source: {
      label: "R4GM — Adswood Road",
      url: "https://recycleforgreatermanchester.com/recycling-in-your-area/stockport/",
    },
    servesNotes: "R4GM Stockport area site.",
  },
  longleyLane: {
    name: "Longley Lane Recycling Centre",
    address: "Longley Lane, Sharston, M22 4RQ",
    source: {
      label: "R4GM — Longley Lane",
      url: "https://recycleforgreatermanchester.com/recycle-centre/longley-lane-recycling-centre/",
    },
    servesNotes: "R4GM site in Manchester (Sharston).",
  },
  lumnsLane: {
    name: "Lumns Lane Recycling Centre",
    address: "Lumns Lane, Clifton, M27 8LN",
    source: {
      label: "R4GM — Lumns Lane",
      url: "https://recycleforgreatermanchester.com/recycle-centre/lumns-lane-recycling-centre/",
    },
    servesNotes: "R4GM site in Salford (Clifton).",
  },
  boysnopeWharf: {
    name: "Boysnope Wharf Recycling Centre",
    address: "Liverpool Road, Eccles, M30 7RH",
    source: {
      label: "R4GM — Boysnope Wharf",
      url: "https://recycleforgreatermanchester.com/recycle-centre/boysnope-wharf-recycling-centre/",
    },
    servesNotes: "R4GM site in Salford (Eccles/Irlam).",
  },
  chesterRoad: {
    name: "Chester Road Recycling Centre",
    address: "Chester Road, Stretford, M32 9AU",
    source: {
      label: "R4GM — Chester Road",
      url: "https://recycleforgreatermanchester.com/recycle-centre/chester-road-recycling-centre/",
    },
    servesNotes: "R4GM Trafford site (Stretford).",
  },
  woodhouseLane: {
    name: "Woodhouse Lane Recycling Centre",
    address: "Woodhouse Lane (off Sinderland Road), Altrincham, WA14 5TB",
    source: {
      label: "R4GM — Woodhouse Lane",
      url: "https://recycleforgreatermanchester.com/find-a-recycling-centre/",
    },
    servesNotes: "R4GM Trafford site (Altrincham).",
  },
  ashRoad: {
    name: "Ash Road Recycling Centre",
    address: "Ash Road, Droylsden, M43 6QU",
    source: {
      label: "R4GM — Ash Road",
      url: "https://recycleforgreatermanchester.com/recycle-centre/ash-road-recycling-centre/",
    },
    servesNotes: "R4GM Tameside site; Tameside Council also lists Bayley Street, Stalybridge.",
  },
  bayleyStreet: {
    name: "Bayley Street Recycling Centre",
    address: "Bayley Street, Stalybridge, SK15 1PZ",
    source: sources.tamesideHwrc,
    servesNotes: "Listed by Tameside Council and R4GM.",
  },
  arkwrightStreet: {
    name: "Arkwright Street Recycling Centre",
    address: "Arkwright Street, Oldham, OL9 9LZ",
    source: {
      label: "R4GM — Arkwright Street",
      url: "https://recycleforgreatermanchester.com/find-a-recycling-centre/",
    },
    servesNotes: "R4GM Oldham site.",
  },
  hurstwoodCourt: {
    name: "Hurstwood Court Recycling Centre",
    address: "Hurstwood Court, Raikes Lane, Bolton, BL3 2NP",
    source: {
      label: "R4GM — Hurstwood Court",
      url: "https://recycleforgreatermanchester.com/find-a-recycling-centre/",
    },
    servesNotes: "R4GM Bolton site.",
  },
  cemeteryRoad: {
    name: "Cemetery Road Recycling Centre",
    address: "Cemetery Road, Radcliffe, M26 4FT",
    source: {
      label: "R4GM — Cemetery Road (Radcliffe)",
      url: "https://recycleforgreatermanchester.com/find-a-recycling-centre/",
    },
    servesNotes: "R4GM Bury borough site.",
  },
  chichesterStreet: {
    name: "Chichester Street Recycling Centre",
    address: "Chichester Street, Rochdale, OL16 2AU",
    source: {
      label: "R4GM — Chichester Street",
      url: "https://recycleforgreatermanchester.com/find-a-recycling-centre/",
    },
    servesNotes: "R4GM Rochdale site.",
  },
  springVale: {
    name: "Spring Vale Recycling Centre",
    address: "Spring Vale, Middleton, M24 2HR",
    source: {
      label: "R4GM — Spring Vale",
      url: "https://recycleforgreatermanchester.com/find-a-recycling-centre/",
    },
    servesNotes: "R4GM Rochdale borough (Middleton).",
  },
  kirkless: {
    name: "Kirkless Recycling Centre",
    address: "Makerfield Way, Higher Ince, WN2 2PR",
    source: sources.wiganCentres,
    servesNotes: "Wigan Council — not part of R4GM network.",
  },
} as const;


export type RecyclingCentreKey = keyof typeof recyclingCentres;


export type ServiceAreaEntry = {
  slug: string;
  name: string;
  boroughLabel: string;
  summary: string;
  accessNotes: string;
  neighbourhoods: string[];
  postcodeDistricts: string[];
  recyclingCentreKey?: RecyclingCentreKey;
  nearbySlugs: string[];
  faqs: { question: string; answer: string }[];
};

// Confirmed by Sam 24 Oct 2026
export const serviceAreaEntries: ServiceAreaEntry[] = [
  {
    slug: "stockport",
    name: "Stockport",
    boroughLabel: "Stockport Metropolitan Borough",
    summary:
      "Stockport borough includes the town centre, suburban districts and villages across the SK postcode area.",
    accessNotes:
      "Describe steps, parking restrictions, permits and whether a van can reach your door or alley.",
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
    postcodeDistricts: ["SK1", "SK2", "SK3", "SK4", "SK6", "SK7", "SK8"],
    recyclingCentreKey: "bredburyParkway",
    nearbySlugs: ["cheadle", "manchester", "tameside", "trafford"],
    faqs: [
      {
        question: "Which postcodes do you need?",
        answer:
          "Send your full postcode with the quote form so we can confirm coverage within Stockport borough.",
      },
      {
        question: "What should I tell you about access?",
        answer:
          "Mention stairs, lifts, alley width, permit bays and any time windows required by a landlord or agent.",
      },
    ],
  },
  {
    slug: "manchester",
    name: "Manchester",
    boroughLabel: "Manchester City Council",
    summary:
      "Manchester city includes the city centre, inner suburbs and outer districts across M postcodes.",
    accessNotes:
      "City-centre and apartment jobs need lift dimensions, loading bay rules and concierge details where applicable.",
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
    postcodeDistricts: ["M1", "M4", "M14", "M15", "M16", "M20", "M21", "M22"],
    recyclingCentreKey: "longleyLane",
    nearbySlugs: ["salford", "didsbury", "stockport", "trafford"],
    faqs: [
      {
        question: "Do you need lift or loading-bay information?",
        answer:
          "Yes for many flats — share lift sizes, booking rules and where the van can legally wait.",
      },
      {
        question: "Can I get a price before collection?",
        answer:
          "We quote from your description and photos before items are loaded.",
      },
    ],
  },
  {
    slug: "salford",
    name: "Salford",
    boroughLabel: "Salford City Council",
    summary:
      "Salford borough includes Salford, Eccles, Swinton, Walkden, Worsley and waterfront areas such as Salford Quays.",
    accessNotes:
      "Riverside and apartment blocks may need dock or service-lift details — include them in your enquiry.",
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
    postcodeDistricts: ["M3", "M5", "M6", "M27", "M28", "M30", "M50"],
    recyclingCentreKey: "lumnsLane",
    nearbySlugs: ["manchester", "trafford", "bolton"],
    faqs: [
      {
        question: "Do you cover Salford Quays and M50?",
        answer: "Include your full postcode and building access notes when you enquire.",
      },
      {
        question: "What counts as commercial waste?",
        answer:
          "Trade or shop waste may need separate arrangements — describe the material and location.",
      },
    ],
  },
  {
    slug: "trafford",
    name: "Trafford",
    boroughLabel: "Trafford Metropolitan Borough",
    summary:
      "Trafford borough includes Sale, Altrincham, Stretford, Urmston and Timperley.",
    accessNotes:
      "Metrolink lines and busy A-roads can affect parking — share the best legal stopping point you know.",
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
    postcodeDistricts: ["M16", "M17", "M31", "M32", "M33", "WA14", "WA15"],
    recyclingCentreKey: "chesterRoad",
    nearbySlugs: ["manchester", "stockport", "salford"],
    faqs: [
      {
        question: "Do you cover WA14 and WA15?",
        answer: "Send your postcode to confirm coverage within Trafford borough.",
      },
      {
        question: "How do roadworks affect collection?",
        answer:
          "Tell us about closures or suspended bays so we can plan a safe loading point.",
      },
    ],
  },
  {
    slug: "tameside",
    name: "Tameside",
    boroughLabel: "Tameside Metropolitan Borough",
    summary:
      "Tameside borough includes Ashton-under-Lyne, Hyde, Denton, Droylsden, Stalybridge and surrounding areas.",
    accessNotes:
      "Hillside streets and terraced rows may need longer carries — note distance from the van to the door.",
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
    postcodeDistricts: ["OL6", "OL7", "SK14", "M34", "M43"],
    recyclingCentreKey: "ashRoad",
    nearbySlugs: ["stockport", "oldham", "manchester"],
    faqs: [
      {
        question: "Does Tameside include SK14?",
        answer:
          "Hyde and surrounding SK14 areas are within Tameside — confirm with your full postcode.",
      },
      {
        question: "What if my street is narrow?",
        answer:
          "Describe the tightest point and whether we should meet you at the nearest safe pull-in.",
      },
    ],
  },
  {
    slug: "oldham",
    name: "Oldham",
    boroughLabel: "Oldham Metropolitan Borough",
    summary:
      "Oldham borough includes Oldham town, Chadderton, Royton, Shaw and villages towards Saddleworth.",
    accessNotes:
      "Steep roads and ginnels are common — flag steps and whether items can be dismantled.",
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
    postcodeDistricts: ["OL1", "OL2", "OL4", "OL8", "OL9"],
    recyclingCentreKey: "arkwrightStreet",
    nearbySlugs: ["rochdale", "tameside", "manchester"],
    faqs: [
      {
        question: "Do you cover Saddleworth villages?",
        answer:
          "Enquire with your village postcode — narrow lanes may affect vehicle choice.",
      },
      {
        question: "What information helps you quote?",
        answer: "Photos, item list, postcode and access notes are enough to start.",
      },
    ],
  },
  {
    slug: "bolton",
    name: "Bolton",
    boroughLabel: "Bolton Metropolitan Borough",
    summary:
      "Bolton borough includes Bolton town, Farnworth, Horwich, Westhoughton and surrounding districts.",
    accessNotes:
      "Note drive width, slopes and whether waste is inside, outside or split across rooms.",
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
    postcodeDistricts: ["BL1", "BL2", "BL3", "BL4", "BL5", "BL6"],
    recyclingCentreKey: "hurstwoodCourt",
    nearbySlugs: ["bury", "salford", "wigan"],
    faqs: [
      {
        question: "Do you cover BL6?",
        answer:
          "Include your full postcode — Horwich and nearby BL6 areas can be confirmed at quote stage.",
      },
      {
        question: "Can soil go with garden waste?",
        answer:
          "Declare soil and rubble separately — weight and disposal route affect the quote.",
      },
    ],
  },
  {
    slug: "bury",
    name: "Bury",
    boroughLabel: "Bury Metropolitan Borough",
    summary:
      "Bury borough includes Bury, Radcliffe, Whitefield, Prestwich and Ramsbottom.",
    accessNotes:
      "Village lanes and terraced streets may need a meet-and-carry plan — describe the route from the van.",
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
    postcodeDistricts: ["BL0", "BL8", "BL9", "M25", "M45"],
    recyclingCentreKey: "cemeteryRoad",
    nearbySlugs: ["rochdale", "bolton", "manchester"],
    faqs: [
      {
        question: "Do you cover M25 Prestwich?",
        answer: "Send your postcode to confirm coverage on the Manchester–Bury border.",
      },
      {
        question: "What if parking is limited?",
        answer:
          "Reserve a space if you can, or tell us the nearest legal bay for loading.",
      },
    ],
  },
  {
    slug: "rochdale",
    name: "Rochdale",
    boroughLabel: "Rochdale Metropolitan Borough",
    summary:
      "Rochdale borough includes Rochdale, Middleton, Heywood, Littleborough and Milnrow.",
    accessNotes:
      "Valley and hillside properties may have long gardens — mention carry distance.",
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
    postcodeDistricts: ["OL10", "OL11", "OL12", "OL15", "OL16"],
    recyclingCentreKey: "chichesterStreet",
    nearbySlugs: ["oldham", "bury", "manchester"],
    faqs: [
      {
        question: "Is Heywood in scope?",
        answer: "Heywood is within Rochdale borough — confirm with your postcode.",
      },
      {
        question: "Do you need a loading bay booking?",
        answer:
          "If your building or street requires it, share the booking details with your quote request.",
      },
    ],
  },
  {
    slug: "wigan",
    name: "Wigan",
    boroughLabel: "Wigan Metropolitan Borough",
    summary:
      "Wigan borough includes Wigan, Leigh, Ashton-in-Makerfield, Atherton and Tyldesley. Household recycling centres are operated by Wigan Council, not R4GM.",
    accessNotes:
      "Canal paths and pedestrian-only routes need a safe kerbside handover point.",
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
    postcodeDistricts: ["WN1", "WN2", "WN3", "WN4", "WN5", "WN6", "WN7"],
    recyclingCentreKey: "kirkless",
    nearbySlugs: ["bolton", "salford", "manchester"],
    faqs: [
      {
        question: "Which recycling sites apply in Wigan?",
        answer:
          "Wigan Council operates its own centres — see our source note for Kirkless and other borough sites.",
      },
      {
        question: "Do you cover WN7 Leigh?",
        answer: "Include your full WN postcode when you enquire.",
      },
    ],
  },
  {
    slug: "cheadle",
    name: "Cheadle",
    boroughLabel: "Stockport — Cheadle & Cheadle Hulme",
    summary:
      "Cheadle and Cheadle Hulme are within Stockport borough (SK8 and nearby districts).",
    accessNotes:
      "A34 and village-centre parking can be busy — describe where a van can wait legally.",
    neighbourhoods: [
      "Cheadle village",
      "Cheadle Hulme",
      "Cheadle Heath",
      "Adswood",
      "Gatley fringe",
    ],
    postcodeDistricts: ["SK8", "SK3"],
    recyclingCentreKey: "adswoodRoad",
    nearbySlugs: ["stockport", "trafford", "manchester"],
    faqs: [
      {
        question: "Is Cheadle separate from Stockport town?",
        answer:
          "Cheadle is a district within Stockport borough — we still need your full postcode.",
      },
      {
        question: "What helps you quote accurately?",
        answer: "Photos, item list and parking or drive access notes.",
      },
    ],
  },
  {
    slug: "didsbury",
    name: "Didsbury",
    boroughLabel: "Manchester — Didsbury & Chorlton-cum-Hardy fringe",
    summary:
      "Didsbury (including West and East Didsbury) lies in Manchester with M20 and M21 postcode districts.",
    accessNotes:
      "Conservation-area terraces and apartments may need careful routing — share stair and lift details.",
    neighbourhoods: [
      "West Didsbury village",
      "East Didsbury",
      "Didsbury Park",
      "Barlow Moor",
      "Northenden fringe",
    ],
    postcodeDistricts: ["M20", "M21"],
    recyclingCentreKey: "longleyLane",
    nearbySlugs: ["manchester", "stockport", "trafford"],
    faqs: [
      {
        question: "Do you cover Chorlton border streets?",
        answer:
          "Use your full postcode — M21 and nearby M32/M16 streets are confirmed at quote stage.",
      },
      {
        question: "Can you quote without a site visit?",
        answer:
          "Yes — photos and access notes are usually enough for a written quote first.",
      },
    ],
  },
];
export const serviceAreaHubSlugs = ["stockport", "manchester"] as const;

export type AreaSlug = (typeof serviceAreaEntries)[number]["slug"];


export function isPlaceholder(value: string): boolean {
  return value.includes("PLACEHOLDER_") || value.startsWith("[");
}

export function hasCallablePhone(
  phone: string = siteConfig.company.phone,
): boolean {
  return !isPlaceholder(phone);
}

/** Shown when quotesOpen is false — never includes a placeholder phone string. */
export function quotesClosedNoticeMessage(): string {
  if (hasCallablePhone()) {
    return `Online quotes aren't open yet. Please call us on ${siteConfig.company.phone}.`;
  }
  return "Online quotes aren't open yet. Please check back soon.";
}

export const siteConfig = {
  /** Set true when submitQuote is wired to a live lead destination. */
  quotesOpen: false,
  domain: {
    // TODO(Sam): Set production domain (also set NEXT_PUBLIC_SITE_URL on Vercel).
    url: "https://[DOMAIN]",
  },
  company: {
    tradingName: "Clearance Geeks",
    // TODO(Sam): Full legal entity name for contracts, metadata and policies.
    legalName: "[COMPANY NAME]",
    // TODO(Sam): Companies House number.
    companyNumber: "[COMPANY NO]",
    registeredAddress: {
      line1: "[REGISTERED ADDRESS LINE 1]",
      line2: "[REGISTERED ADDRESS LINE 2]",
      city: "[CITY]",
      postcode: "[POSTCODE]",
      country: "United Kingdom",
    },
    // TODO(Sam): Environment Agency waste carrier registration (upper tier if applicable).
    wasteCarrierLicence: "[CARRIER NO]",
    // TODO(Sam): Customer-facing phone (display format).
    phone: "[PHONE]",
    // TODO(Sam): Customer-facing email.
    email: "[EMAIL]",
  },
  compliance: {
    wasteCarrierNote:
      "Waste is collected under an Environment Agency waste carrier registration. Registration number shown in the footer when confirmed.",
    // TODO(Sam): ICO data protection fee registration number (format Z…).
    icoRegistrationNumber: "[ICO NUMBER]",
    // TODO(Sam): How long to keep quote requests that do not become bookings (e.g. "12 months").
    quoteRetentionIfNotBooked: "[RETENTION PERIOD]",
    // TODO(Sam): Where quote leads are sent (own CRM/email or named partner company).
    leadRecipient: "[LEAD RECIPIENT]",
  },
  serviceAreas: {
    region: "Greater Manchester",
    summary:
      "Waste removal and house clearance across Greater Manchester — Stockport, Manchester and surrounding boroughs.",
    hubSlugs: serviceAreaHubSlugs,
  },
  marketing: {
    defaultDescription:
      "Waste removal and house clearance across Greater Manchester — Stockport, Manchester and surrounding boroughs. Fast quotes, tidy crews, responsible disposal.",
  },
} as const;

export const todoMarketing = {
  googleRating: null as number | null,
  reviewCount: null as number | null,
  yearsTrading: null as number | null,
  jobsCompleted: null as number | null,
  awards: [] as string[],
} as const;

export function formatRegisteredAddress(): string {
  const a = siteConfig.company.registeredAddress;
  return [a.line1, a.line2, a.city, a.postcode, a.country]
    .filter(Boolean)
    .join(", ");
}

export const company = {
  name: siteConfig.company.tradingName,
  legalName: siteConfig.company.legalName,
  companyNumber: siteConfig.company.companyNumber,
  address: formatRegisteredAddress(),
  phone: siteConfig.company.phone,
  phoneTel: hasCallablePhone()
    ? `tel:${siteConfig.company.phone.replace(/\s/g, "")}`
    : "#quote",
  email: siteConfig.company.email,
  wasteCarrierLicence: siteConfig.company.wasteCarrierLicence,
  region: siteConfig.serviceAreas.region,
  defaultDescription: siteConfig.marketing.defaultDescription,
} as const;

export const siteUrl = siteConfig.domain.url;

export function serviceAreaNames(): readonly string[] {
  return serviceAreaEntries.map((entry) => entry.name);
}

export function serviceAreasListText(): string {
  return serviceAreaNames().join(", ");
}

export function hubAreaName(index: number): string {
  const slug = siteConfig.serviceAreas.hubSlugs[index];
  if (!slug) return "";
  return serviceAreaEntries.find((entry) => entry.slug === slug)?.name ?? "";
}

export function telHref(phone: string = siteConfig.company.phone): string {
  if (isPlaceholder(phone)) return "#quote";
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function getServiceAreaEntry(slug: string): ServiceAreaEntry | undefined {
  return serviceAreaEntries.find((entry) => entry.slug === slug);
}
