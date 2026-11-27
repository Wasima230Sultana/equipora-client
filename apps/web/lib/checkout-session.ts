import "server-only"

import type { CheckoutPayment } from "@/lib/checkout"
import { getStripe } from "@/lib/stripe"

/**
 * Verify a Checkout Session with Stripe and return only trusted payment data.
 * Returns null when Stripe has not confirmed a paid session.
 *
 * Reusable by the success page and any other server-side payment check.
 */
export async function retrievePaidCheckout(
  sessionId: string
): Promise<CheckoutPayment | null> {
  const session = await getStripe().checkout.sessions.retrieve(sessionId)
  if (session.payment_status !== "paid") return null

  const metadata = session.metadata ?? {}
  return {
    sessionId: session.id,
    rentalId: metadata.rentalId,
    customerId: metadata.customerId,
    equipmentId: metadata.equipmentId,
    rentalStartDate: metadata.rentalStartDate,
    rentalEndDate: metadata.rentalEndDate,
    quantity: metadata.requiredQuantity
      ? Number(metadata.requiredQuantity)
      : undefined,
    amount: (session.amount_total ?? 0) / 100,
    currency: session.currency ?? "usd",
    paymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id,
    customerEmail: session.customer_email ?? undefined,
  }
}
