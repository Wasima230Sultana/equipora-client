import type { Equipment, OwnerRental, PaymentStatus } from "@/lib/owner-equipment"

/**
 * Pure helper that turns owner data from the backend into numbers for the
 * Earnings screen. No hard-coded values - an empty response shows zeros.
 */

export type OwnerSummary = {
  equipmentCount: number
  activeRentals: number
  paidEarnings: number
  totalBookings: number
  monthlyEarnings: { month: string; amount: number }[]
  paymentBreakdown: {
    status: PaymentStatus
    count: number
    amount: number
  }[]
}

const paymentStatuses: PaymentStatus[] = [
  "Paid",
  "Pending",
  "Failed",
  "Refunded",
]

/** Backend rentals use `totalAmount`; fall back to it when `paidAmount` is absent. */
function bookingAmount(rental: OwnerRental) {
  return Number(rental.paidAmount ?? rental.totalAmount) || 0
}

export function buildOwnerSummary(
  equipment: Equipment[],
  rentals: OwnerRental[]
): OwnerSummary {
  console.log(
    "[Owner Summary] computing from",
    equipment.length,
    "listing(s) and",
    rentals.length,
    "booking(s)"
  )

  const paidEarnings = rentals
    .filter((rental) => rental.paymentStatus === "Paid")
    .reduce((total, rental) => total + bookingAmount(rental), 0)

  const activeRentals = rentals.filter((rental) =>
    ["Active", "Confirmed"].includes(rental.bookingStatus)
  ).length

  const monthly = new Map<string, number>()
  for (const rental of rentals) {
    if (!rental.bookingDate) continue
    const month = new Date(rental.bookingDate).toLocaleString("en-US", {
      month: "short",
    })
    monthly.set(month, (monthly.get(month) ?? 0) + bookingAmount(rental))
  }

  const paymentBreakdown = paymentStatuses.map((status) => {
    const matching = rentals.filter((rental) => rental.paymentStatus === status)
    return {
      status,
      count: matching.length,
      amount: matching.reduce((total, rental) => total + bookingAmount(rental), 0),
    }
  })

  return {
    equipmentCount: equipment.length,
    activeRentals,
    paidEarnings,
    totalBookings: rentals.length,
    monthlyEarnings: Array.from(monthly, ([month, amount]) => ({ month, amount })),
    paymentBreakdown,
  }
}
