import { apiRequest } from "@/lib/backend-client"
import type { CreateRentalInput, CustomerRental } from "@/lib/customer-data"
import type { Equipment } from "@/lib/owner-equipment"

/** Frontend-only customer API calls to equipora-server. */
export const customerApiClient = {
  listRentals: (customerId: string) =>
    apiRequest<{ rentals: CustomerRental[] }>(
      `/customer/${customerId}/rentals`
    ),

  createRental: (customerId: string, input: CreateRentalInput) =>
    apiRequest<{ rental: CustomerRental }>(`/customer/${customerId}/rentals`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  listFavorites: (customerId: string) =>
    apiRequest<{ favorites: Equipment[] }>(
      `/customer/${customerId}/favorites`
    ),

  isFavorite: (customerId: string, equipmentId: string) =>
    apiRequest<{ isFavorite: boolean }>(
      `/customer/${customerId}/favorites/${encodeURIComponent(equipmentId)}`
    ),

  addFavorite: (customerId: string, equipmentId: string) =>
    apiRequest<{ success: boolean }>(
      `/customer/${customerId}/favorites/${encodeURIComponent(equipmentId)}`,
      { method: "POST" }
    ),

  removeFavorite: (customerId: string, equipmentId: string) =>
    apiRequest<{ success: boolean }>(
      `/customer/${customerId}/favorites/${encodeURIComponent(equipmentId)}`,
      { method: "DELETE" }
    ),
}
