import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { CheckoutResult } from "@/components/checkout/checkout-result"
import { updateRentalPayment } from "@/lib/payment-server"

/** Stripe sends the user here when they leave checkout without paying. */
export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{
    rental_id?: string
    customer_id?: string
    equipment_id?: string
  }>
}) {
  const { rental_id: rentalId, customer_id: customerId, equipment_id: equipmentId } =
    await searchParams

  if (rentalId && customerId) {
    try {
      await updateRentalPayment(customerId, rentalId, {
        paymentStatus: "Failed",
        bookingStatus: "Cancelled",
      })
    } catch (error) {
      console.error("[Checkout cancel] could not cancel the rental:", error)
    }
  }

  const backHref = equipmentId
    ? `/browse-equipment/${encodeURIComponent(equipmentId)}`
    : "/browse-equipment"

  return (
    <CheckoutResult
      status="cancel"
      title="Payment cancelled"
      description="You were not charged. Your booking was not confirmed."
      actions={
        <>
          <Link href={backHref} className={buttonVariants()}>
            Back to equipment
          </Link>
          <Link
            href="/browse-equipment"
            className={buttonVariants({ variant: "outline" })}
          >
            Browse equipment
          </Link>
        </>
      }
    >
      <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
        You can return to the listing and try again whenever you are ready.
      </p>
    </CheckoutResult>
  )
}
