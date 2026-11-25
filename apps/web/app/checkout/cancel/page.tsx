import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { CheckoutResult } from "@/components/checkout/checkout-result"
import { updateRentalPayment } from "@/lib/payment-server"
import { getStripe } from "@/lib/stripe"

/** Stripe sends the user here when they leave checkout without paying. */
export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams
  let equipmentId = ""

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId)
      equipmentId = session.metadata?.equipmentId ?? ""

      const rentalId = session.metadata?.rentalId
      const customerId = session.metadata?.customerId
      if (rentalId && customerId) {
        await updateRentalPayment(customerId, rentalId, {
          sessionId: session.id,
          paymentStatus: "Failed",
          bookingStatus: "Cancelled",
        })
      }
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
