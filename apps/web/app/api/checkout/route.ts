import { NextResponse } from "next/server"

import type { CheckoutInput } from "@/lib/checkout"
import {
  createRental,
  getAppUrl,
  getEquipment,
  getSignedInUser,
} from "@/lib/payment-server"
import { rentalDays } from "@/lib/browse-equipment"
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
 * 2. create a pending rental using the backend's own price calculation
 * 3. create a Stripe Checkout session tied to that rental via metadata
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

    const { rental } = await createRental(user.id, input)
    const appUrl = await getAppUrl()

    const session = await getStripe().checkout.sessions.create({
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
      client_reference_id: rental.id,
      metadata: {
        rentalId: rental.id,
        customerId: user.id,
        equipmentId: equipment.id,
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel?rental_id=${encodeURIComponent(rental.id)}&customer_id=${encodeURIComponent(user.id)}&equipment_id=${encodeURIComponent(equipment.id)}`,
    })

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.")
    }
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[Checkout] could not create session:", error)
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    )
  }
}
