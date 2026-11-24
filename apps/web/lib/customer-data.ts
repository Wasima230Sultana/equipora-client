import type { BookingStatus, PaymentStatus } from "@/lib/owner-equipment"

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
  totalAmount: number
  paymentStatus: PaymentStatus
  bookingStatus: BookingStatus
}
