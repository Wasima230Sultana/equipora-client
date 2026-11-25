import { CircleDollarSign, ClipboardList, Truck, Users } from "lucide-react"

import type { AdminRental, AdminUser } from "@/lib/admin-data"
import type { Stat } from "@/lib/dashboard-data"
import type { Equipment } from "@/lib/owner-equipment"

/**
 * Pure helpers that turn live admin data from equipora-server into payments and
 * analytics figures. No hard-coded values: an empty backend response shows zeros.
 */

export type AdminPaymentRow = {
  id: string
  rentalId: string
  customer: string
  customerEmail: string
  amount: number
  currency: string
  method: string
  date: string
  status: AdminRental["paymentStatus"]
}

export type AdminMetric = {
  label: string
  value: string
  change: string
}

export type AdminSummary = {
  totalRevenue: number
  paidBookings: number
  activeBookings: number
  totalBookings: number
  totalUsers: number
  customerCount: number
  equipmentCount: number
  approvedEquipment: number
  averageBookingValue: number
  paymentSuccessRate: number
  monthlyRevenue: { month: string; amount: number }[]
}

/** Prefer the confirmed Stripe amount; fall back to the booking total. */
function amountOf(rental: AdminRental): number {
  return Number(rental.paidAmount ?? rental.totalAmount) || 0
}

function monthKey(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number)
  if (!year || !month) return key
  return new Date(year, month - 1, 1).toLocaleString("en-US", { month: "short" })
}

/** One row per booking, including its Stripe reference when available. */
export function buildAdminPayments(rentals: AdminRental[]): AdminPaymentRow[] {
  return rentals.map((rental) => ({
    id: rental.stripePaymentIntentId || rental.id,
    rentalId: rental.id,
    customer: rental.customerName || "Unknown customer",
    customerEmail: rental.customerEmail || "",
    amount: amountOf(rental),
    currency: (rental.currency ?? "usd").toUpperCase(),
    method: rental.stripePaymentIntentId ? "Card (Stripe)" : "—",
    date: rental.bookingDate,
    status: rental.paymentStatus,
  }))
}

/** Last six months of paid revenue, including empty months for a stable chart. */
export function buildMonthlyRevenue(
  rentals: AdminRental[],
  monthCount = 6
): { month: string; amount: number }[] {
  const today = new Date()
  const keys = Array.from({ length: monthCount }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - (monthCount - 1 - index), 1)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
  })

  const totals = new Map(keys.map((key) => [key, 0]))
  for (const rental of rentals) {
    if (rental.paymentStatus !== "Paid" || !rental.bookingDate) continue
    const key = monthKey(rental.bookingDate)
    if (totals.has(key)) totals.set(key, (totals.get(key) ?? 0) + amountOf(rental))
  }

  return keys.map((key) => ({ month: monthLabel(key), amount: totals.get(key) ?? 0 }))
}

/** All figures used by the analytics page, derived from the three admin feeds. */
export function buildAdminSummary(
  rentals: AdminRental[],
  users: AdminUser[],
  equipment: Equipment[]
): AdminSummary {
  const paid = rentals.filter((rental) => rental.paymentStatus === "Paid")
  const totalRevenue = paid.reduce((sum, rental) => sum + amountOf(rental), 0)
  const bookingTotal = rentals.reduce((sum, rental) => sum + amountOf(rental), 0)

  return {
    totalRevenue,
    paidBookings: paid.length,
    activeBookings: rentals.filter((rental) =>
      ["Confirmed", "Active"].includes(rental.bookingStatus)
    ).length,
    totalBookings: rentals.length,
    totalUsers: users.length,
    customerCount: users.filter((user) => user.role === "customer").length,
    equipmentCount: equipment.length,
    approvedEquipment: equipment.filter((item) => item.status === "Approved").length,
    averageBookingValue: rentals.length
      ? Math.round((bookingTotal / rentals.length) * 100) / 100
      : 0,
    paymentSuccessRate: rentals.length
      ? Math.round((paid.length / rentals.length) * 100)
      : 0,
    monthlyRevenue: buildMonthlyRevenue(rentals),
  }
}

/** KPI cards for the analytics page. */
export function adminSummaryStats(summary: AdminSummary): Stat[] {
  return [
    {
      label: "Total revenue",
      value: `$${summary.totalRevenue.toLocaleString()}`,
      change: `${summary.paidBookings} paid booking(s)`,
      icon: CircleDollarSign,
    },
    {
      label: "Active bookings",
      value: String(summary.activeBookings),
      change: `${summary.totalBookings} total bookings`,
      icon: ClipboardList,
    },
    {
      label: "Total users",
      value: String(summary.totalUsers),
      change: `${summary.customerCount} customers`,
      icon: Users,
    },
    {
      label: "Equipment listed",
      value: String(summary.equipmentCount),
      change: `${summary.approvedEquipment} approved`,
      icon: Truck,
    },
  ]
}

/** Supporting metrics shown beside the chart. */
export function adminSummaryMetrics(summary: AdminSummary): AdminMetric[] {
  return [
    {
      label: "Total bookings",
      value: String(summary.totalBookings),
      change: "all rental bookings",
    },
    {
      label: "Average booking value",
      value: `$${summary.averageBookingValue.toLocaleString()}`,
      change: "per booking",
    },
    {
      label: "Payment success rate",
      value: `${summary.paymentSuccessRate}%`,
      change: `${summary.paidBookings} of ${summary.totalBookings} bookings paid`,
    },
    {
      label: "Approved listings",
      value: String(summary.approvedEquipment),
      change: `of ${summary.equipmentCount} listed`,
    },
  ]
}
