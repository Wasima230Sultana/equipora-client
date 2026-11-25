import { EQUIPMENT_CATEGORIES, RENTAL_TYPES } from "@/lib/owner-equipment"
import type { Equipment } from "@/lib/owner-equipment"

/** All browse controls live in one object so they can be sent to the backend. */
export type BrowseFilters = {
  search: string
  category: string
  rentalType: string
  minPrice: string
  maxPrice: string
  availability: string
  sort: string
}

export const defaultBrowseFilters: BrowseFilters = {
  search: "",
  category: "",
  rentalType: "",
  minPrice: "",
  maxPrice: "",
  availability: "",
  sort: "recent",
}

export type UpdateBrowseFilter = <K extends keyof BrowseFilters>(
  key: K,
  value: BrowseFilters[K]
) => void

export const categoryOptions = EQUIPMENT_CATEGORIES
export const rentalTypeOptions = RENTAL_TYPES

export const availabilityOptions = [
  { value: "", label: "Any availability" },
  { value: "available", label: "Available" },
  { value: "unavailable", label: "Unavailable" },
]

export const sortOptions = [
  { value: "recent", label: "Recently Added" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
]

/** Build the backend query string. Empty controls are simply omitted. */
export function toBrowseQuery(filters: BrowseFilters): string {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(filters)) {
    if (value.trim()) params.set(key, value.trim())
  }
  return params.toString()
}

export function isAvailable(equipment: Equipment): boolean {
  return Number(equipment.availableQuantity) > 0
}

/** Inclusive day count used for the booking price estimate. */
export function rentalDays(start: string, end: string): number {
  if (!start || !end) return 0
  const from = new Date(start).getTime()
  const to = new Date(end).getTime()
  if (Number.isNaN(from) || Number.isNaN(to) || to < from) return 0
  return Math.max(1, Math.ceil((to - from) / 86_400_000) + 1)
}
