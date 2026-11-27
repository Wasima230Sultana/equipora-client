/**
 * Client-side helper for the checkout API.
 * The browser only sends booking details; the price is recalculated on the server.
 */
export type CheckoutInput = {
  equipmentId: string
  rentalStartDate: string
  rentalEndDate: string
  requiredQuantity: number
}

export type CheckoutSession = {
  sessionId: string
  clientSecret: string
}

/** Payment details read back from Stripe with `checkout.sessions.retrieve()`. */
export type CheckoutPayment = {
  sessionId: string
  rentalId?: string
  customerId?: string
  equipmentId?: string
  rentalStartDate?: string
  rentalEndDate?: string
  quantity?: number
  amount: number
  currency: string
  paymentIntentId?: string
  customerEmail?: string
}

/** Ask the server to create a Stripe Checkout session for this booking. */
export async function createCheckoutSession(
  input: CheckoutInput
): Promise<CheckoutSession> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  const data = (await response.json()) as CheckoutSession & { error?: string }
  if (!response.ok || !data.sessionId || !data.clientSecret) {
    throw new Error(data.error ?? "Could not start checkout. Please try again.")
  }
  return { sessionId: data.sessionId, clientSecret: data.clientSecret }
}
