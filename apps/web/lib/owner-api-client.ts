import { apiRequest } from "@/lib/backend-client"
import type {
  Equipment,
  EquipmentInput,
  OwnerInfo,
  OwnerRental,
} from "@/lib/owner-equipment"

/** Frontend-only owner API calls to equipora-server. */

export const ownerApiClient = {
  getOwner: (ownerId: string) =>
    apiRequest<{ owner: OwnerInfo }>(`/owner/${ownerId}`),

  listEquipment: (ownerId: string) =>
    apiRequest<{ owner: OwnerInfo; equipment: Equipment[] }>(
      `/owner/${ownerId}/equipment`
    ),

  getEquipment: (ownerId: string, id: string) =>
    apiRequest<{ equipment: Equipment }>(`/owner/${ownerId}/equipment/${id}`),

  createEquipment: (ownerId: string, input: EquipmentInput) =>
    apiRequest<{ equipment: Equipment }>(`/owner/${ownerId}/equipment`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  updateEquipment: (
    ownerId: string,
    id: string,
    patch: Partial<EquipmentInput>
  ) =>
    apiRequest<{ equipment: Equipment }>(`/owner/${ownerId}/equipment/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),

  deleteEquipment: (ownerId: string, id: string) =>
    apiRequest<{ success: boolean }>(`/owner/${ownerId}/equipment/${id}`, {
      method: "DELETE",
    }),

  listRentals: (ownerId: string) =>
    apiRequest<{ rentals: OwnerRental[] }>(`/owner/${ownerId}/rentals`),
}
