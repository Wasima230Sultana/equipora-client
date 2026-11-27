import { CheckoutResult } from "@/components/checkout/checkout-result"
import { BookingSummary, SummaryRow } from "@/components/checkout/booking-summary"
import { CustomerDetails } from "@/components/checkout/customer-details"
import { rentalDays } from "@/lib/browse-equipment"
import type { CheckoutPayment } from "@/lib/checkout"
import type { CustomerRental } from "@/lib/customer-data"

/**
 * Reusable payment receipt. The verified Stripe session is the source of truth;
 * rental details are optional so a backend outage cannot hide the success page.
 */
export function CheckoutSuccess({
  payment,
  rental,
  synced = true,
}: {
  payment: CheckoutPayment
  rental?: CustomerRental
  synced?: boolean
}) {
  const start = rental?.rentalStartDate ?? payment.rentalStartDate ?? ""
  const end = rental?.rentalEndDate ?? payment.rentalEndDate ?? ""
  const days = rentalDays(start, end) || 1
  const quantity = rental?.requiredQuantity ?? payment.quantity ?? 1
  const total = rental?.paidAmount ?? rental?.totalAmount ?? payment.amount
  const rate = Math.round((total / Math.max(1, days * quantity)) * 100) / 100

  return (
    <CheckoutResult
      status="success"
      title="Booking confirmed"
      description="Your payment was successful. You can track this booking in My Rentals."
    >
      <div className="space-y-3 text-sm">
        <SummaryRow
          label="Equipment"
          value={rental?.equipmentName ?? "Your equipment"}
        />
        {start && (
          <SummaryRow
            label="Rental start"
            value={new Date(start).toLocaleDateString()}
          />
        )}
        {end && (
          <SummaryRow
            label="Rental end"
            value={new Date(end).toLocaleDateString()}
          />
        )}

        <BookingSummary
          days={days}
          rate={rate}
          quantity={quantity}
          total={total}
          paid
        />

        <SummaryRow
          label="Payment reference"
          value={payment.paymentIntentId ?? payment.sessionId}
        />

        {!synced && (
          <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
            Your payment is confirmed. Your rental details will appear in My
            Rentals shortly.
          </p>
        )}

        <CustomerDetails
          customer={
            rental?.customer ?? {
              name: "",
              email: payment.customerEmail ?? "",
            }
          }
        />
      </div>
    </CheckoutResult>
  )
}
