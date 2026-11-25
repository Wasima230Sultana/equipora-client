/**
 * Shared types, form options and helpers for the owner dashboard.
 *
 * This file is safe to import from client components: it has no database or
 * session code. All data access lives in the separate `equipora-server` API
 * and is called through `lib/owner-api-client.ts`.
 */

// ---------------------------------------------------------------------------
// Form options
// ---------------------------------------------------------------------------

export const EQUIPMENT_CATEGORIES = [
  "Excavators",
  "Loaders",
  "Cranes",
  "Dump Trucks",
  "Forklifts",
  "Bulldozers",
  "Mixers",
  "Other",
] as const

export const RENTAL_TYPES = ["Daily", "Weekly", "Monthly"] as const
export const EQUIPMENT_CONDITIONS = [
  "Excellent",
  "Good",
  "Fair",
  "Needs repair",
] as const
export const EQUIPMENT_STATUSES = ["Pending", "Approved", "Rejected"] as const

/** Status set by an admin to take a listing out of customer-facing views. */
export const HIDDEN_EQUIPMENT_STATUS = "Rejected" as const

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RentalType = (typeof RENTAL_TYPES)[number]
export type EquipmentCondition = (typeof EQUIPMENT_CONDITIONS)[number]
export type EquipmentStatus = (typeof EQUIPMENT_STATUSES)[number]
export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded"
export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Active"
  | "Completed"
  | "Cancelled"

export type OwnerInfo = {
  id: string
  name: string
  email: string
  phone: string
  company: string
}

export type Equipment = {
  id: string
  ownerId: string
  name: string
  description: string
  category: string
  location: string
  rentalPrice: number
  rentalType: RentalType
  availableQuantity: number
  condition: EquipmentCondition
  brand: string
  model: string
  image: string
  terms: string
  status: EquipmentStatus
  owner: OwnerInfo
  createdAt: string
}

/** Only the fields the owner can edit in the form. */
export type EquipmentInput = {
  name: string
  description: string
  category: string
  location: string
  rentalPrice: number
  rentalType: RentalType
  availableQuantity: number
  condition: EquipmentCondition
  brand: string
  model: string
  image: string
  terms: string
}

export type RentalCustomer = {
  name: string
  email: string
  phone: string
}

export type OwnerRental = {
  id: string
  ownerId: string
  equipmentId: string
  equipmentName: string
  equipmentImage: string
  customer: RentalCustomer
  duration: string
  requiredQuantity: number
  bookingAmount: number
  paymentStatus: PaymentStatus
  bookingStatus: BookingStatus
  createdAt: string
}

// ---------------------------------------------------------------------------
// Helpers shared by the add form and the update form
// ---------------------------------------------------------------------------

/** Turn a saved record back into form values (used by the Update action). */
export function equipmentToInput(item: Equipment): EquipmentInput {
  return {
    name: item.name,
    description: item.description,
    category: item.category,
    location: item.location,
    rentalPrice: item.rentalPrice,
    rentalType: item.rentalType,
    availableQuantity: item.availableQuantity,
    condition: item.condition,
    brand: item.brand,
    model: item.model,
    image: item.image,
    terms: item.terms,
  }
}

/** Empty form values for the "Add Equipment" screen. */
export const emptyEquipmentInput: EquipmentInput = {
  name: "",
  description: "",
  category: "",
  location: "",
  rentalPrice: 0,
  rentalType: "Daily",
  availableQuantity: 1,
  condition: "Good",
  brand: "",
  model: "",
  image: "",
  terms: "",
}
