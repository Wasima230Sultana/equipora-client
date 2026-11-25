"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { CalendarCheck } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { FormField, SelectInput } from "@/components/dashboard/form-controls"
import { customerApiClient } from "@/lib/customer-api-client"
import { isAvailable, rentalDays } from "@/lib/browse-equipment"
import type { Equipment } from "@/lib/owner-equipment"

/** Booking request form shown to signed-in users on the details page. */
export function BookingForm({
  userId,
  equipment,
}: {
  userId: string
  equipment: Equipment
}) {
  const router = useRouter()
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [submitting, setSubmitting] = useState(false)
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
      await customerApiClient.createRental(userId, {
        equipmentId: equipment.id,
        rentalStartDate: start,
        rentalEndDate: end,
        requiredQuantity: quantity,
      })
      toast.success("Booking requested", {
        description: "You can track it in My Rentals.",
      })
      router.push("/dashboard/customer/my-rentals")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create booking")
    } finally {
      setSubmitting(false)
    }
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

          <div className="space-y-1 rounded-xl bg-muted p-4 text-sm">
            <p className="flex justify-between">
              <span className="text-muted-foreground">Rental period</span>
              <span className="font-medium">{days} day(s)</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span className="font-medium">
                ${equipment.rentalPrice.toLocaleString()} / {equipment.rentalType.toLowerCase()}
              </span>
            </p>
            <p className="flex justify-between border-t border-border pt-2 text-base">
              <span>Estimated total</span>
              <span className="font-semibold">${total.toLocaleString()}</span>
            </p>
          </div>

          {!available && (
            <p className="text-sm text-destructive">
              This equipment is currently unavailable for booking.
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
            <CalendarCheck />
            {submitting ? "Submitting…" : "Request booking"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
