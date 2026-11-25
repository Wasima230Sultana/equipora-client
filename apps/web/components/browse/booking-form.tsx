"use client"

import { useState, type FormEvent } from "react"
import { CreditCard, LockKeyhole } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { BookingSummary } from "@/components/checkout/booking-summary"
import { EmbeddedCheckout } from "@/components/checkout/embedded-checkout"
import { FormField, SelectInput } from "@/components/dashboard/form-controls"
import { isAvailable, rentalDays } from "@/lib/browse-equipment"
import { createCheckoutSession, type CheckoutSession } from "@/lib/checkout"
import type { Equipment } from "@/lib/owner-equipment"

/** Booking form that hands the confirmed details over to Stripe Checkout. */
export function BookingForm({ equipment }: { equipment: Equipment }) {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [checkout, setCheckout] = useState<CheckoutSession | null>(null)
  const today = new Date().toISOString().slice(0, 10)

  const days = rentalDays(start, end)
  const total = days * equipment.rentalPrice * quantity
  const available = isAvailable(equipment)
  const canSubmit = available && days > 0 && !submitting

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    try {
      const session = await createCheckoutSession({
        equipmentId: equipment.id,
        rentalStartDate: start,
        rentalEndDate: end,
        requiredQuantity: quantity,
      })
      setCheckout(session)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not start checkout"
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (checkout) {
    return (
      <EmbeddedCheckout
        sessionId={checkout.sessionId}
        clientSecret={checkout.clientSecret}
      />
    )
  }

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="text-base">Book this equipment</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Rental start date" htmlFor="booking-start" required>
            <Input
              id="booking-start"
              type="date"
              min={today}
              value={start}
              onChange={(event) => setStart(event.target.value)}
              required
            />
          </FormField>

          <FormField label="Rental end date" htmlFor="booking-end" required>
            <Input
              id="booking-end"
              type="date"
              min={start || today}
              value={end}
              onChange={(event) => setEnd(event.target.value)}
              required
            />
          </FormField>

          <FormField label="Quantity" htmlFor="booking-quantity">
            <SelectInput
              id="booking-quantity"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            >
              {Array.from({ length: Math.max(1, equipment.availableQuantity) }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </SelectInput>
          </FormField>

          <BookingSummary
            days={days}
            rate={equipment.rentalPrice}
            quantity={quantity}
            total={total}
          />

          {!available && (
            <p className="text-sm text-destructive">
              This equipment is currently unavailable for booking.
            </p>
          )}

          <div>
            <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
              <CreditCard />
              {submitting ? "Redirecting to checkout…" : "Continue to payment"}
            </Button>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <LockKeyhole className="size-3.5" />
              Secure checkout powered by Stripe
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
