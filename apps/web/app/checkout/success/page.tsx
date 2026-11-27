import { CheckoutResult } from "@/components/checkout/checkout-result"
import { CheckoutSuccess } from "@/components/checkout/checkout-success"
import { retrievePaidCheckout } from "@/lib/checkout-session"
import { confirmPaidRental, getCustomerRental } from "@/lib/payment-server"

/** Depends on the session id in the URL and the live Stripe session. */
export const dynamic = "force-dynamic"

/** Stripe sends the customer here after payment; the session is verified first. */
export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams

  if (!sessionId) {
    return (
      <CheckoutResult
        status="error"
        title="No payment session found"
        description="Open the link from your checkout email or start a new booking."
      />
    )
  }

  // Stripe is the only source of truth for whether the payment succeeded.
  let payment
  try {
    payment = await retrievePaidCheckout(sessionId)
  } catch (error) {
    console.error("[Checkout success] Stripe lookup failed:", error)
    return (
      <CheckoutResult
        status="error"
        title="Could not verify your payment"
        description="Please refresh this page or check My Rentals in a moment."
      />
    )
  }

  if (!payment) {
    return (
      <CheckoutResult
        status="error"
        title="Payment not completed"
        description="Stripe has not confirmed a payment for this session yet."
      />
    )
  }

  let synced = false
  let rental

  if (payment.rentalId && payment.customerId) {
    // Best effort: never hide the receipt if the backend is down or slow.
    synced = await confirmPaidRental(payment.customerId, payment.rentalId, {
      sessionId: payment.sessionId,
      paymentStatus: "Paid",
      bookingStatus: "Confirmed",
      paymentIntentId: payment.paymentIntentId,
      paidAmount: payment.amount,
      currency: payment.currency,
    })

    try {
      rental = (await getCustomerRental(payment.customerId, payment.rentalId)).rental
    } catch (error) {
      console.error("[Checkout success] could not load rental details:", error)
    }
  }

  return <CheckoutSuccess payment={payment} rental={rental} synced={synced} />
}
