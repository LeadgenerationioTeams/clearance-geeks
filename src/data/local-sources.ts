/**
 * Verified local facts and source URLs for editorial review.
 * Only cite facts listed here on public pages.
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
