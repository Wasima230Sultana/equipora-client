import "server-only"

import { headers } from "next/headers"

import { serverApiRequest } from "@/lib/backend-auth-server"
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

/** Public app URL for Stripe return URLs. The configured value wins so a
 *  deployed site never redirects customers to localhost behind a proxy. */
export async function getAppUrl(): Promise<string> {
  const configured =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.BETTER_AUTH_URL?.trim()
  if (configured) return configured.replace(/\/+$/, "")

  const origin = (await headers()).get("origin")
  return (origin ?? "http://localhost:3000").replace(/\/+$/, "")
}

/** Read the signed-in user from the Better Auth session cookie (never trust a body id). */
export async function getSignedInUser() {
  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  })
  return session?.user ?? null
}

export function getEquipment(id: string) {
  return serverApiRequest<{ equipment: Equipment }>(
    `/equipment/${encodeURIComponent(id)}`
  )
}

/** Create the booking before redirecting to Stripe, so every payment has a rental. */
export function createRental(customerId: string, input: CreateRentalInput) {
  return serverApiRequest<{ rental: CustomerRental }>(
    `/customer/${encodeURIComponent(customerId)}/rentals`,
    { method: "POST", body: JSON.stringify(input) }
  )
}

/** Fetch a single rental with the customer details joined by the backend. */
export function getCustomerRental(customerId: string, rentalId: string) {
  return serverApiRequest<{ rental: CustomerRental }>(
    `/customer/${encodeURIComponent(customerId)}/rentals/${encodeURIComponent(rentalId)}`
  )
}

/** Confirm or cancel a rental payment. Calling this twice is harmless. */
export function updateRentalPayment(
  customerId: string,
  rentalId: string,
  patch: PaymentPatch
) {
  return serverApiRequest<{ rental: CustomerRental }>(
    `/customer/${encodeURIComponent(customerId)}/rentals/${encodeURIComponent(rentalId)}/payment`,
    {
      method: "PATCH",
      body: JSON.stringify(patch),
    }
  )
}

/**
 * Best-effort booking confirmation. Stripe has already verified the payment,
 * so a backend outage must never hide the customer's success page.
 */
export async function confirmPaidRental(
  customerId: string,
  rentalId: string,
  patch: PaymentPatch
): Promise<boolean> {
  try {
    await updateRentalPayment(customerId, rentalId, patch)
    return true
  } catch (error) {
    console.error("[Checkout success] could not sync the rental payment:", error)
    return false
  }
}
