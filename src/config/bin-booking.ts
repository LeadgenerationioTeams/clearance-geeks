/**
 * Bin & bag collection online booking — single source for prices, VAT, discount and scheduling.
 *
 * TODO(Sam): Confirm every PLACEHOLDER_* value before taking live payments.
 */

/** Clearance Geeks is not VAT-registered (confirmed). Set true when registered to add VAT in checkout and Stripe. */
export const BIN_BOOKING_VAT_REGISTERED = false;

/** Standard UK VAT rate — used only when `BIN_BOOKING_VAT_REGISTERED` is true. */
export const BIN_BOOKING_VAT_RATE = 0.2;

/** When VAT-registered, show ex-VAT subtotal and VAT line at checkout; ignored while not registered. */
export const BIN_BOOKING_SHOW_EX_AND_INC_VAT = false;

/** Headline subscription discount (bag + bin services only). PLACEHOLDER_FOR_SAM — confirm margin. */
export const BIN_BOOKING_SUBSCRIPTION_DISCOUNT = 0.15;

/** Collection days: 0 = Sunday … 6 = Saturday. Default Mon–Sat. */
export const BIN_BOOKING_COLLECTION_DAYS: readonly number[] = [1, 2, 3, 4, 5, 6];

export type BinBookingServiceId =
  | "bag"
  | "bin_standard"
  | "bin_large"
  | "bed"
  | "mattress";

export type BinBookingServiceDefinition = {
  id: BinBookingServiceId;
  name: string;
  shortDescription: string;
  /** Customer price per unit in pence (final price while not VAT-registered). PLACEHOLDER_FOR_SAM */
  unitPriceExVatPence: number;
  /** Subscriptions available for this SKU */
  subscriptionEligible: boolean;
  /** Stripe product name suffix */
  stripeProductLabel: string;
};

/**
 * PLACEHOLDER_FOR_SAM — confirm all unit prices with Sam before launch.
 * Listed amounts: bag £2, bin £8, large bin £28, bed £15, mattress £20 (final prices).
 */
export const BIN_BOOKING_SERVICES: readonly BinBookingServiceDefinition[] = [
  {
    id: "bag",
    name: "Bag collection",
    shortDescription: "Per extra bag the council will not take",
    unitPriceExVatPence: 200,
    subscriptionEligible: true,
    stripeProductLabel: "Bag collection",
  },
  {
    id: "bin_standard",
    name: "Wheelie bin empty",
    shortDescription: "Standard household wheelie bin",
    unitPriceExVatPence: 800,
    subscriptionEligible: true,
    stripeProductLabel: "Bin empty (standard)",
  },
  {
    id: "bin_large",
    name: "Large bin empty",
    shortDescription: "660L / 1100L communal or large bins",
    unitPriceExVatPence: 2800,
    subscriptionEligible: true,
    stripeProductLabel: "Bin empty (large)",
  },
  {
    id: "bed",
    name: "Bed collection",
    shortDescription: "Any bed frame — any size",
    unitPriceExVatPence: 1500,
    subscriptionEligible: false,
    stripeProductLabel: "Bed collection",
  },
  {
    id: "mattress",
    name: "Mattress collection",
    shortDescription: "Any mattress — any size",
    unitPriceExVatPence: 2000,
    subscriptionEligible: false,
    stripeProductLabel: "Mattress collection",
  },
] as const;

export type BinBookingFrequency = "weekly" | "fortnightly" | "monthly";

export const BIN_BOOKING_SUBSCRIPTION_FREQUENCIES: readonly {
  id: BinBookingFrequency;
  label: string;
}[] = [
  { id: "weekly", label: "Every week" },
  { id: "fortnightly", label: "Every two weeks" },
  { id: "monthly", label: "Every month" },
];

export const binBookingConfig = {
  vatRegistered: BIN_BOOKING_VAT_REGISTERED,
  vatRate: BIN_BOOKING_VAT_RATE,
  showExAndIncVat: BIN_BOOKING_SHOW_EX_AND_INC_VAT,
  subscriptionDiscount: BIN_BOOKING_SUBSCRIPTION_DISCOUNT,
  collectionDays: BIN_BOOKING_COLLECTION_DAYS,
  services: BIN_BOOKING_SERVICES,
  subscriptionFrequencies: BIN_BOOKING_SUBSCRIPTION_FREQUENCIES,
  subscriptionHeadline: "Subscribe and save 15%",
  /** PLACEHOLDER_FOR_SAM — waste carrier / licensing copy on booking pages */
  licenceNotePlaceholder:
    "PLACEHOLDER_WASTE_CARRIER_DETAILS — Sam to add licence number before go-live.",
} as const;

export function getBinBookingService(
  id: BinBookingServiceId,
): BinBookingServiceDefinition | undefined {
  return BIN_BOOKING_SERVICES.find((s) => s.id === id);
}