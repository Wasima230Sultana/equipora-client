/**
 * Demo backend for the Owner dashboard.
 *
 * Everything is kept in memory with dummy data so the UI works immediately.
 * To connect a real backend later, keep the exported types/constants and
 * replace only the functions in the "Store / CRUD" section at the bottom.
 */

// ---------------------------------------------------------------------------
// 1. Constants used by the form drop-downs
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

// ---------------------------------------------------------------------------
// 2. Types
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
}

// ---------------------------------------------------------------------------
// 3. Dummy data (used for checking while the real API is not connected)
// ---------------------------------------------------------------------------

export const CURRENT_OWNER_ID = "owner-demo-1"

export const dummyOwner: OwnerInfo = {
  id: CURRENT_OWNER_ID,
  name: "Ahmed Al Mansouri",
  email: "ahmed@example.com",
  phone: "+971 50 123 4567",
  company: "Al Mansouri Equipment Trading",
}

const excavatorImage =
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
const craneImage =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600"
const loaderImage =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
const forkliftImage =
  "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600"

export const dummyEquipment: Equipment[] = [
  {
    id: "EQ-101",
    ownerId: CURRENT_OWNER_ID,
    name: "CAT 320 Hydraulic Excavator",
    description:
      "Reliable 20-ton excavator suitable for digging, trenching and site preparation.",
    category: "Excavators",
    location: "Dubai, UAE",
    rentalPrice: 420,
    rentalType: "Daily",
    availableQuantity: 2,
    condition: "Excellent",
    brand: "Caterpillar",
    model: "320 D",
    image: excavatorImage,
    terms:
      "Minimum 3 days. Fuel by customer. Operator available on request. 10% deposit required.",
    status: "Approved",
    owner: dummyOwner,
    createdAt: "2026-10-14T09:20:00.000Z",
  },
  {
    id: "EQ-104",
    ownerId: CURRENT_OWNER_ID,
    name: "Toyota 8FG Forklift",
    description: "Compact forklift ideal for warehouses and tight job sites.",
    category: "Forklifts",
    location: "Sharjah, UAE",
    rentalPrice: 180,
    rentalType: "Daily",
    availableQuantity: 4,
    condition: "Good",
    brand: "Toyota",
    model: "8FG25",
    image: forkliftImage,
    terms: "Minimum 1 day. Fuel included. Valid driving license required.",
    status: "Pending",
    owner: dummyOwner,
    createdAt: "2026-11-02T11:45:00.000Z",
  },
  {
    id: "EQ-105",
    ownerId: CURRENT_OWNER_ID,
    name: "CASE 821F Wheel Loader",
    description: "Heavy duty wheel loader for loading and material handling.",
    category: "Loaders",
    location: "Abu Dhabi, UAE",
    rentalPrice: 440,
    rentalType: "Daily",
    availableQuantity: 1,
    condition: "Good",
    brand: "CASE",
    model: "821F",
    image: loaderImage,
    terms: "Minimum 3 days. Operator included. Fuel by customer.",
    status: "Approved",
    owner: dummyOwner,
    createdAt: "2026-09-28T08:10:00.000Z",
  },
  {
    id: "EQ-108",
    ownerId: CURRENT_OWNER_ID,
    name: "Liebherr LTM Mobile Crane",
    description: "80-ton mobile crane for lifting and installation work.",
    category: "Cranes",
    location: "Dubai, UAE",
    rentalPrice: 890,
    rentalType: "Daily",
    availableQuantity: 1,
    condition: "Excellent",
    brand: "Liebherr",
    model: "LTM 1080",
    image: craneImage,
    terms: "Minimum 5 days. Certified operator required. Permit by customer.",
    status: "Pending",
    owner: dummyOwner,
    createdAt: "2026-11-18T14:05:00.000Z",
  },
]

export const dummyRentals: OwnerRental[] = [
  {
    id: "RNT-2048",
    ownerId: CURRENT_OWNER_ID,
    equipmentId: "EQ-101",
    equipmentName: "CAT 320 Hydraulic Excavator",
    equipmentImage: excavatorImage,
    customer: {
      name: "Daniel Ross",
      email: "daniel@example.com",
      phone: "+971 50 888 1234",
    },
    duration: "7 days (Nov 20 – Nov 27)",
    requiredQuantity: 1,
    bookingAmount: 2940,
    paymentStatus: "Paid",
    bookingStatus: "Active",
  },
  {
    id: "RNT-2051",
    ownerId: CURRENT_OWNER_ID,
    equipmentId: "EQ-104",
    equipmentName: "Toyota 8FG Forklift",
    equipmentImage: forkliftImage,
    customer: {
      name: "Aisha Karim",
      email: "aisha@example.com",
      phone: "+971 55 221 0099",
    },
    duration: "7 days (Nov 25 – Dec 02)",
    requiredQuantity: 2,
    bookingAmount: 1260,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
  },
  {
    id: "RNT-2035",
    ownerId: CURRENT_OWNER_ID,
    equipmentId: "EQ-105",
    equipmentName: "CASE 821F Wheel Loader",
    equipmentImage: loaderImage,
    customer: {
      name: "Priya Nair",
      email: "priya@example.com",
      phone: "+971 52 440 7712",
    },
    duration: "14 days (Nov 05 – Nov 19)",
    requiredQuantity: 1,
    bookingAmount: 6160,
    paymentStatus: "Pending",
    bookingStatus: "Completed",
  },
  {
    id: "RNT-2060",
    ownerId: CURRENT_OWNER_ID,
    equipmentId: "EQ-108",
    equipmentName: "Liebherr LTM Mobile Crane",
    equipmentImage: craneImage,
    customer: {
      name: "Marcus Bell",
      email: "marcus@example.com",
      phone: "+971 56 700 3344",
    },
    duration: "5 days (Nov 22 – Nov 27)",
    requiredQuantity: 1,
    bookingAmount: 4450,
    paymentStatus: "Failed",
    bookingStatus: "Cancelled",
  },
]

// ---------------------------------------------------------------------------
// 4. Helpers used by both the client and the server
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

// ---------------------------------------------------------------------------
// 5. Store / CRUD (the part you swap for a real database later)
// ---------------------------------------------------------------------------

type OwnerStore = {
  equipment: Equipment[]
  rentals: OwnerRental[]
}

// `globalThis` keeps the dummy data alive across dev hot reloads.
const globalStore = globalThis as typeof globalThis & {
  __equiporaOwnerStore?: OwnerStore
}

function getStore(): OwnerStore {
  if (!globalStore.__equiporaOwnerStore) {
    console.log("[Owner Store] no store found - creating one from dummy data")
    globalStore.__equiporaOwnerStore = {
      equipment: dummyEquipment.map((item) => ({ ...item })),
      rentals: dummyRentals.map((item) => ({ ...item })),
    }
  }
  return globalStore.__equiporaOwnerStore
}

/** Returns the logged-in owner. Replace with `auth.api.getSession()` later. */
export function getCurrentOwner(): OwnerInfo {
  console.log("[Owner Store] getCurrentOwner ->", dummyOwner.id)
  // TODO: read the real session here and return the authenticated owner.
  return dummyOwner
}

export function listEquipment(ownerId: string): Equipment[] {
  console.log("[Owner Store] listEquipment for", ownerId)
  const rows = getStore().equipment.filter((item) => item.ownerId === ownerId)
  console.log("[Owner Store] listEquipment ->", rows.length, "item(s)")
  return rows
}

export function getEquipment(id: string, ownerId: string): Equipment | null {
  console.log("[Owner Store] getEquipment", id)
  const found =
    getStore().equipment.find(
      (item) => item.id === id && item.ownerId === ownerId
    ) ?? null
  console.log("[Owner Store] getEquipment ->", found ? "found" : "not found")
  return found
}

export function createEquipment(
  input: EquipmentInput,
  owner: OwnerInfo
): Equipment {
  console.log("[Owner Store] createEquipment ->", input.name)
  const record: Equipment = {
    ...input,
    id: `EQ-${Date.now().toString().slice(-6)}`,
    ownerId: owner.id,
    owner,
    // New listings always start as Pending until an admin reviews them.
    status: "Pending",
    createdAt: new Date().toISOString(),
  }
  getStore().equipment.unshift(record)
  console.log(
    "[Owner Store] createEquipment saved",
    record.id,
    "status:",
    record.status
  )
  return record
}

export function updateEquipment(
  id: string,
  ownerId: string,
  patch: Partial<EquipmentInput>
): Equipment | null {
  console.log("[Owner Store] updateEquipment", id, Object.keys(patch))
  const existing = getEquipment(id, ownerId)
  if (!existing) {
    console.warn("[Owner Store] updateEquipment -> no matching record")
    return null
  }
  // Only form fields can be changed - status stays under admin control.
  Object.assign(existing, patch)
  console.log("[Owner Store] updateEquipment -> saved")
  return existing
}

export function deleteEquipment(id: string, ownerId: string): boolean {
  console.log("[Owner Store] deleteEquipment", id)
  const store = getStore()
  const index = store.equipment.findIndex(
    (item) => item.id === id && item.ownerId === ownerId
  )
  if (index === -1) {
    console.warn("[Owner Store] deleteEquipment -> no matching record")
    return false
  }
  store.equipment.splice(index, 1)
  console.log("[Owner Store] deleteEquipment -> removed")
  return true
}

export function listOwnerRentals(ownerId: string): OwnerRental[] {
  console.log("[Owner Store] listOwnerRentals for", ownerId)
  const ownerEquipmentIds = new Set(
    getStore()
      .equipment.filter((item) => item.ownerId === ownerId)
      .map((item) => item.id)
  )
  const rows = getStore().rentals.filter((item) =>
    ownerEquipmentIds.has(item.equipmentId)
  )
  console.log("[Owner Store] listOwnerRentals ->", rows.length, "booking(s)")
  return rows
}
