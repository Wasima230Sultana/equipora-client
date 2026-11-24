import type {
  Equipment,
  EquipmentInput,
  OwnerInfo,
  OwnerRental,
} from "@/lib/owner-equipment"

/**
 * Frontend-only API client.
 * It only builds HTTP calls to the separate equipora-server backend.
 * No database, no session validation, no server code lives here.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_EQUIPORA_SERVER_URL ?? "http://localhost:5000"

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  console.log("[Owner API Client]", init?.method ?? "GET", path)
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...init?.headers },
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error ?? "The backend request failed.")
  }
  console.log("[Owner API Client] success", path)
  return result as T
}

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
