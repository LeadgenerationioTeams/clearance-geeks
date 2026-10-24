/**
 * Verified local facts and source URLs for editorial review.
 * Only cite facts listed here on public pages.
 * // TODO(Sam): Replace PLACEHOLDER_* recycling references when service areas are confirmed.
 */

export type SourceRef = {
  label: string;
  url: string;
};

export const sources = {
  recyclingPortal: {
    label: "PLACEHOLDER_RECYCLING_PORTAL_LABEL",
    url: "https://PLACEHOLDER_RECYCLING_PORTAL_URL",
  },
  councilWasteInfo: {
    label: "PLACEHOLDER_COUNCIL_WASTE_INFO_LABEL",
    url: "https://PLACEHOLDER_COUNCIL_WASTE_INFO_URL",
  },
} satisfies Record<string, SourceRef>;

function placeholderCentre(index: string) {
  return {
    name: `PLACEHOLDER_RECYCLING_CENTRE_NAME_${index}`,
    address: `PLACEHOLDER_RECYCLING_CENTRE_ADDRESS_${index}`,
    source: {
      label: `PLACEHOLDER_RECYCLING_CENTRE_SOURCE_LABEL_${index}`,
      url: `https://PLACEHOLDER_RECYCLING_CENTRE_SOURCE_URL_${index}`,
    },
    servesNotes: `PLACEHOLDER_RECYCLING_CENTRE_SERVES_NOTES_${index}`,
  };
}

/** Placeholder centres — keys align with `serviceAreaEntries[].recyclingCentreKey`. */
export const recyclingCentres = {
  placeholderCentre01: placeholderCentre("01"),
  placeholderCentre02: placeholderCentre("02"),
  placeholderCentre03: placeholderCentre("03"),
  placeholderCentre04: placeholderCentre("04"),
  placeholderCentre05: placeholderCentre("05"),
  placeholderCentre06: placeholderCentre("06"),
  placeholderCentre07: placeholderCentre("07"),
  placeholderCentre08: placeholderCentre("08"),
  placeholderCentre09: placeholderCentre("09"),
  placeholderCentre10: placeholderCentre("10"),
  placeholderCentre11: placeholderCentre("11"),
  placeholderCentre12: placeholderCentre("12"),
} as const;

export type RecyclingCentreKey = keyof typeof recyclingCentres;
