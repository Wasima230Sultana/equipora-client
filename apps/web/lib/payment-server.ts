import "server-only"

import { headers } from "next/headers"

import { apiRequest } from "@/lib/backend-client"
import { auth } from "@/lib/auth"
import type { CustomerRental } from "@/lib/customer-data"
import type { BookingStatus, Equipment, PaymentStatus } from "@/lib/owner-equipment"

export type PaymentPatch = {
  /** Stripe Checkout Session id; the backend accepts updates only with it. */
  sessionId: string
  paymentStatus?: PaymentStatus
  bookingStatus?: BookingStatus
  paymentIntentId?: string
  paidAmount?: number
  currency?: string
}

export type CreateRentalInput = {
  equipmentId: string
  rentalStartDate: string
  rentalEndDate: string
  requiredQuantity: number
  stripeSessionId: string
}

/** Origin from the current request, used for Stripe's return URLs. */
export async function getAppUrl(): Promise<string> {
  const requestHeaders = await headers()
  return (
    requestHeaders.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  )
}

/** Read the signed-in user from the Better Auth session cookie (never trust a body id). */
export async function getSignedInUser() {
  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  })
  return session?.user ?? null
}

export function getEquipment(id: string) {
  return apiRequest<{ equipment: Equipment }>(
    `/equipment/${encodeURIComponent(id)}`
  )
}

/** Create the booking before redirecting to Stripe, so every payment has a rental. */
export function createRental(customerId: string, input: CreateRentalInput) {
  return apiRequest<{ rental: CustomerRental }>(
    `/customer/${encodeURIComponent(customerId)}/rentals`,
    { method: "POST", body: JSON.stringify(input) }
  )
}

/** Fetch a single rental with the customer details joined by the backend. */
export function getCustomerRental(customerId: string, rentalId: string) {
  return apiRequest<{ rental: CustomerRental }>(
    `/customer/${encodeURIComponent(customerId)}/rentals/${encodeURIComponent(rentalId)}`
  )
}

/** Confirm or cancel a rental payment. Calling this twice is harmless. */
export function updateRentalPayment(
  customerId: string,
  rentalId: string,
  patch: PaymentPatch
) {
  return apiRequest<{ rental: CustomerRental }>(
    `/customer/${encodeURIComponent(customerId)}/rentals/${encodeURIComponent(rentalId)}/payment`,
    {
      method: "PATCH",
      body: JSON.stringify(patch),
    }
  )
}
