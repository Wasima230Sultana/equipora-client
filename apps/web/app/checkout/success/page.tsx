import { BookingSummary, SummaryRow } from "@/components/checkout/booking-summary"
import { CheckoutResult } from "@/components/checkout/checkout-result"
import { CustomerDetails } from "@/components/checkout/customer-details"
import { rentalDays } from "@/lib/browse-equipment"
import { getCustomerRental, updateRentalPayment } from "@/lib/payment-server"
import { getStripe } from "@/lib/stripe"

/** Stripe sends the user here after a successful payment. */
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

  try {
    // Always verify with Stripe; never trust a paid-looking URL parameter.
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== "paid") {
      return (
        <CheckoutResult
          status="error"
          title="Payment not completed"
          description="Stripe has not confirmed a payment for this session yet."
        />
      )
    }

    const rentalId = session.metadata?.rentalId
    const customerId = session.metadata?.customerId
    if (!rentalId || !customerId) {
      return (
        <CheckoutResult
          status="error"
          title="Booking details are missing"
          description="This checkout session is not linked to a rental."
        />
      )
    }

    // This is the single confirmation step: Stripe has verified payment above.
    // The backend update is idempotent, so a page refresh is harmless.
    await updateRentalPayment(customerId, rentalId, {
      sessionId: session.id,
      paymentStatus: "Paid",
      bookingStatus: "Confirmed",
      paymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id,
      paidAmount:
        typeof session.amount_total === "number"
          ? session.amount_total / 100
          : undefined,
      currency: session.currency ?? undefined,
    })

    const { rental } = await getCustomerRental(customerId, rentalId)
    const days = rentalDays(rental.rentalStartDate, rental.rentalEndDate)
    const quantity = rental.requiredQuantity ?? 1
    const total = rental.paidAmount ?? rental.totalAmount
    const rate = Math.round((total / Math.max(1, days * quantity)) * 100) / 100

    return (
      <CheckoutResult
        status="success"
        title="Booking confirmed"
        description="Your payment was successful. You can track this booking in My Rentals."
      >
        <div className="space-y-3 text-sm">
          <SummaryRow label="Equipment" value={rental.equipmentName} />
          <SummaryRow
            label="Rental start"
            value={new Date(rental.rentalStartDate).toLocaleDateString()}
          />
          <SummaryRow
            label="Rental end"
            value={new Date(rental.rentalEndDate).toLocaleDateString()}
          />

          <BookingSummary
            days={days}
            rate={rate}
            quantity={quantity}
            total={total}
            paid
          />

          <SummaryRow
            label="Payment reference"
            value={rental.stripePaymentIntentId ?? session.id}
          />
          <CustomerDetails
            customer={
              rental.customer ?? {
                name: "",
                email: session.customer_email ?? "",
              }
            }
          />
        </div>
      </CheckoutResult>
    )
  } catch (error) {
    console.error("[Checkout success] could not load the booking:", error)
    return (
      <CheckoutResult
        status="error"
        title="Could not load your booking"
        description="Your payment may still have gone through. Please check My Rentals."
      />
    )
  }
}
