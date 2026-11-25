import type {
  BookingStatus,
  PaymentStatus,
} from "@/lib/owner-equipment"

/** User row returned by the admin users endpoint. */
export type AdminUser = {
  id: string
  name: string
  email: string
  role: "admin" | "owner" | "customer"
  createdAt: string | null
  phone: string
  image: string
}

/** Rental row joined with customer, owner and equipment data by the backend. */
export type AdminRental = {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  ownerId: string
  ownerName: string
  ownerEmail: string
  equipmentId: string
  equipmentName: string
  rentalStartDate: string
  rentalEndDate: string
  bookingDate: string
  requiredQuantity?: number
  totalAmount: number
  // Added by Stripe confirmation; older/manually-updated bookings may not have them.
  stripePaymentIntentId?: string
  paidAmount?: number
  currency?: string
  paymentStatus: PaymentStatus
  bookingStatus: BookingStatus
}

export const userRoles = ["customer", "owner", "admin"] as const
export const paymentStatuses = ["Paid", "Pending", "Failed", "Refunded"] as const
export const bookingStatuses = [
  "Pending",
  "Confirmed",
  "Active",
  "Completed",
  "Cancelled",
] as const

export function formatDate(value: string | null): string {
  if (!value) return "—"
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString()
}
