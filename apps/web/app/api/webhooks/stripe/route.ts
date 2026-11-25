import { NextResponse } from "next/server"
import type Stripe from "stripe"

import { updateRentalPayment } from "@/lib/payment-server"
import { getStripe } from "@/lib/stripe"

/** Read the paid amount in major currency units (Stripe uses cents). */
function paidAmount(session: Stripe.Checkout.Session): number | undefined {
  return typeof session.amount_total === "number"
    ? session.amount_total / 100
    : undefined
}

/** Stripe delivers payment events here; signatures prove the request is genuine. */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    // The success page also verifies the session, so local development still works.
    console.warn("[Stripe webhook] STRIPE_WEBHOOK_SECRET is not configured; ignoring event.")
    return NextResponse.json({ received: true })
  }

  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const body = await request.text()
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("[Stripe webhook] signature check failed:", error)
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 })
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session
      const rentalId = session.metadata?.rentalId
      const customerId = session.metadata?.customerId

      if (rentalId && customerId && session.payment_status === "paid") {
        await updateRentalPayment(customerId, rentalId, {
          paymentStatus: "Paid",
          bookingStatus: "Confirmed",
          paymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id,
          paidAmount: paidAmount(session),
          currency: session.currency ?? undefined,
        })
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session
      const rentalId = session.metadata?.rentalId
      const customerId = session.metadata?.customerId
      if (rentalId && customerId) {
        await updateRentalPayment(customerId, rentalId, {
          paymentStatus: "Failed",
          bookingStatus: "Cancelled",
        })
      }
    }
  } catch (error) {
    console.error("[Stripe webhook] could not update rental:", error)
    // A non-2xx response makes Stripe retry the event.
    return NextResponse.json(
      { error: "Could not update the rental." },
      { status: 500 }
    )
  }

  return NextResponse.json({ received: true })
}
