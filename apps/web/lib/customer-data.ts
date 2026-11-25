import type { BookingStatus, PaymentStatus } from "@/lib/owner-equipment"

/** Customer details joined onto a rental by the payment confirmation endpoint. */
export type CustomerContact = {
  name: string
  email: string
  phone: string
  address: string
}

/** Shape of a rental booking returned by equipora-server for a customer. */
export type CustomerRental = {
  id: string
  customerId: string
  equipmentId: string
  equipmentName: string
  equipmentImage?: string
  rentalStartDate: string
  rentalEndDate: string
  bookingDate: string
  requiredQuantity?: number
  totalAmount: number
  paymentStatus: PaymentStatus
  bookingStatus: BookingStatus
  // Added once Stripe confirms the payment.
  stripePaymentIntentId?: string
  paidAmount?: number
  currency?: string
  customer?: CustomerContact
}

/** Fields sent when booking equipment from the details page. */
export type CreateRentalInput = {
  equipmentId: string
  rentalStartDate: string
  rentalEndDate: string
  requiredQuantity: number
}
