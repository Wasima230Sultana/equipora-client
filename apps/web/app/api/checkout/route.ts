import { NextResponse } from "next/server"

import type { CheckoutInput } from "@/lib/checkout"
import {
  createRental,
  getAppUrl,
  getEquipment,
  getSignedInUser,
} from "@/lib/payment-server"
import { isVisibleEquipment, rentalDays } from "@/lib/browse-equipment"
import { getStripe } from "@/lib/stripe"

/** Validation stays on the server: ids and dates in the request can be tampered with. */
function readCheckoutInput(body: unknown): CheckoutInput | null {
  if (!body || typeof body !== "object") return null
  const value = body as Record<string, unknown>

  const { equipmentId, rentalStartDate, rentalEndDate } = value
  const quantity = Number(value.requiredQuantity)

  if (typeof equipmentId !== "string" || !equipmentId) return null
  if (typeof rentalStartDate !== "string" || !rentalStartDate) return null
  if (typeof rentalEndDate !== "string" || !rentalEndDate) return null
  if (!Number.isFinite(quantity) || quantity < 1) return null

  return {
    equipmentId,
    rentalStartDate,
    rentalEndDate,
    requiredQuantity: Math.floor(quantity),
  }
}

/**
 * POST /api/checkout
 * 1. verify the Better Auth session
 * 2. create an embedded Stripe Checkout session with the booking details in metadata
 * 3. create a pending rental that stores the session id
 * 4. add the rental id to the Stripe session so the success page can find it
 */
export async function POST(request: Request) {
  try {
    const user = await getSignedInUser()
    if (!user) {
      return NextResponse.json(
        { error: "Please sign in to book equipment." },
        { status: 401 }
      )
    }

    const input = readCheckoutInput(await request.json())
    if (!input) {
      return NextResponse.json(
        { error: "Select equipment and both rental dates." },
        { status: 400 }
      )
    }

    const { equipment } = await getEquipment(input.equipmentId)
    if (!isVisibleEquipment(equipment)) {
      return NextResponse.json(
        { error: "This equipment is not available for booking." },
        { status: 400 }
      )
    }

    const days = rentalDays(input.rentalStartDate, input.rentalEndDate)
    const available = Number(equipment.availableQuantity) || 0

    if (days <= 0 || available <= 0) {
      return NextResponse.json(
        { error: "This equipment is not available for those dates." },
        { status: 400 }
      )
    }
    if (input.requiredQuantity > available) {
      return NextResponse.json(
        { error: "The requested quantity is not available." },
        { status: 400 }
      )
    }

    // Never trust a price sent by the browser: derive everything from the backend record.
    const amountInCents = Math.round(
      days * Number(equipment.rentalPrice) * input.requiredQuantity * 100
    )
    if (!Number.isFinite(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        { error: "This listing has no valid rental price." },
        { status: 400 }
      )
    }

    const appUrl = await getAppUrl()
    const stripe = getStripe()
    const metadata = {
      customerId: user.id,
      equipmentId: equipment.id,
      rentalStartDate: input.rentalStartDate,
      rentalEndDate: input.rentalEndDate,
      requiredQuantity: String(input.requiredQuantity),
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: equipment.name,
              description: `${days} day(s) × ${input.requiredQuantity} unit(s)`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      // Prefill the customer details so Stripe shows who is booking.
      customer_email: user.email,
      metadata,
      // Embedded Checkout returns here with the session id; the rental id is in metadata.
      ui_mode: "embedded",
      return_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    })

    const { rental } = await createRental(user.id, {
      ...input,
      stripeSessionId: session.id,
    })

    await stripe.checkout.sessions.update(session.id, {
      metadata: { ...metadata, rentalId: rental.id },
    })

    if (!session.client_secret) {
      throw new Error("Stripe did not return a checkout client secret.")
    }
    return NextResponse.json({
      sessionId: session.id,
      clientSecret: session.client_secret,
    })
  } catch (error) {
    console.error("[Checkout] could not create session:", error)
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    )
  }
}
