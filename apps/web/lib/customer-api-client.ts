import { apiRequest } from "@/lib/backend-client"
import type { CustomerRental } from "@/lib/customer-data"
import type { Equipment } from "@/lib/owner-equipment"

/** Frontend-only customer API calls to equipora-server. */
export const customerApiClient = {
  listRentals: (customerId: string) =>
    apiRequest<{ rentals: CustomerRental[] }>(
      `/customer/${customerId}/rentals`
    ),

  listFavorites: (customerId: string) =>
    apiRequest<{ favorites: Equipment[] }>(
      `/customer/${customerId}/favorites`
    ),

  removeFavorite: (customerId: string, equipmentId: string) =>
    apiRequest<{ success: boolean }>(
      `/customer/${customerId}/favorites/${equipmentId}`,
      { method: "DELETE" }
    ),
}
