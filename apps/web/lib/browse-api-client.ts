import { apiRequest } from "@/lib/backend-client"
import type { Equipment } from "@/lib/owner-equipment"

/** Frontend calls for the public browse feed and the protected details page. */
export const browseApiClient = {
  list: (query: string) =>
    apiRequest<{ equipment: Equipment[] }>(`/equipment?${query}`),

  getById: (id: string) =>
    apiRequest<{ equipment: Equipment }>(`/equipment/${encodeURIComponent(id)}`),
}
