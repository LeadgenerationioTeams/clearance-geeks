import type { BinBookingFrequency, BinBookingServiceId } from "@/config/bin-booking";
import type { BookingType } from "@/lib/bin-booking/pricing";

export type BinBookingLineItem = {
  serviceId: BinBookingServiceId;
  quantity: number;
};

export type BinBookingCustomer = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
};

export type BinBookingSchedule = {
  bookingType: BookingType;
  dates?: string[];
  frequency?: BinBookingFrequency;
  subscriptionStartDate?: string;
};

export type BinBookingDraft = {
  lines: BinBookingLineItem[];
  schedule: BinBookingSchedule;
  customer: BinBookingCustomer;
};

export type StoredBinBooking = BinBookingDraft & {
  id: string;
  createdAt: string;
  stripeSessionId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  paymentStatus: "pending" | "paid" | "subscription_active" | "canceled";
  totals: {
    exVatSubtotalPence: number;
    vatAmountPence: number;
    incVatTotalPence: number;
  };
};