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

/** Ask the server to create a Stripe Checkout session and return its URL. */
export async function startCheckout(input: CheckoutInput): Promise<string> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  const data = (await response.json()) as { url?: string; error?: string }
  if (!response.ok || !data.url) {
    throw new Error(data.error ?? "Could not start checkout. Please try again.")
  }
  return data.url
}
