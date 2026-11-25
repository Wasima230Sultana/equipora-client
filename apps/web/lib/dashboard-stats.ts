import { CalendarRange, ClipboardList, Heart, PackagePlus, Truck, Wallet } from "lucide-react"

import type { CustomerRental } from "@/lib/customer-data"
import type { Stat } from "@/lib/dashboard-data"
import type { Equipment } from "@/lib/owner-equipment"
import type { OwnerSummary } from "@/lib/owner-summary"

/**
 * Pure helpers that turn live backend data into the overview KPI cards.
 * Admin cards already come from `adminSummaryStats()` in `admin-analytics.ts`.
 */

export function ownerDashboardStats(summary: OwnerSummary): Stat[] {
  const paidBookings =
    summary.paymentBreakdown.find((item) => item.status === "Paid")?.count ?? 0

  return [
    {
      label: "My equipment",
      value: String(summary.equipmentCount),
      change: `${summary.totalBookings} total bookings`,
      icon: PackagePlus,
    },
    {
      label: "Active rentals",
      value: String(summary.activeRentals),
      change: `${summary.totalBookings - summary.activeRentals} other bookings`,
      icon: ClipboardList,
    },
    {
      label: "Paid earnings",
      value: `$${summary.paidEarnings.toLocaleString()}`,
      change: `${paidBookings} paid booking(s)`,
      icon: Wallet,
    },
    {
      label: "Total bookings",
      value: String(summary.totalBookings),
      change: `across ${summary.equipmentCount} listing(s)`,
      icon: CalendarRange,
    },
  ]
}

export function customerDashboardStats(
  rentals: CustomerRental[],
  favorites: Equipment[]
): Stat[] {
  const active = rentals.filter((rental) =>
    ["Confirmed", "Active"].includes(rental.bookingStatus)
  ).length
  const paid = rentals.filter((rental) => rental.paymentStatus === "Paid")
  const spent = paid.reduce(
    (sum, rental) => sum + (Number(rental.paidAmount ?? rental.totalAmount) || 0),
    0
  )

  return [
    {
      label: "My rentals",
      value: String(rentals.length),
      change: `${paid.length} paid booking(s)`,
      icon: ClipboardList,
    },
    {
      label: "Active rentals",
      value: String(active),
      change: `${rentals.length - active} other bookings`,
      icon: Truck,
    },
    {
      label: "Saved machines",
      value: String(favorites.length),
      change: "favourite listings",
      icon: Heart,
    },
    {
      label: "Total spent",
      value: `$${spent.toLocaleString()}`,
      change: `${paid.length} paid booking(s)`,
      icon: Wallet,
    },
  ]
}
