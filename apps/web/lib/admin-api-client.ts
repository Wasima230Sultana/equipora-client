import { apiRequest } from "@/lib/backend-auth-client"
import type {
  AdminRental,
  AdminUser,
} from "@/lib/admin-data"
import type {
  BookingStatus,
  Equipment,
  EquipmentInput,
  EquipmentStatus,
  PaymentStatus,
} from "@/lib/owner-equipment"

/** Frontend calls for the admin-only equipora-server endpoints. */
export const adminApiClient = {
  listUsers: (adminId: string) =>
    apiRequest<{ users: AdminUser[] }>(`/admin/${adminId}/users`),

  changeRole: (adminId: string, userId: string, role: string) =>
    apiRequest<{ user: AdminUser }>(
      `/admin/${adminId}/users/${encodeURIComponent(userId)}`,
      { method: "PATCH", body: JSON.stringify({ role }) }
    ),

  deleteUser: (adminId: string, userId: string) =>
    apiRequest<{ success: boolean }>(
      `/admin/${adminId}/users/${encodeURIComponent(userId)}`,
      { method: "DELETE" }
    ),

  listEquipment: (adminId: string) =>
    apiRequest<{ equipment: Equipment[] }>(`/admin/${adminId}/equipment`),

  setEquipmentStatus: (adminId: string, id: string, status: EquipmentStatus) =>
    apiRequest<{ equipment: Equipment }>(
      `/admin/${adminId}/equipment/${encodeURIComponent(id)}/status`,
      { method: "PATCH", body: JSON.stringify({ status }) }
    ),

  updateEquipment: (
    adminId: string,
    id: string,
    patch: Partial<EquipmentInput>
  ) =>
    apiRequest<{ equipment: Equipment }>(
      `/admin/${adminId}/equipment/${encodeURIComponent(id)}`,
      { method: "PATCH", body: JSON.stringify(patch) }
    ),

  deleteEquipment: (adminId: string, id: string) =>
    apiRequest<{ success: boolean }>(
      `/admin/${adminId}/equipment/${encodeURIComponent(id)}`,
      { method: "DELETE" }
    ),

  listRentals: (adminId: string) =>
    apiRequest<{ rentals: AdminRental[] }>(`/admin/${adminId}/rentals`),

  updateRentalStatus: (
    adminId: string,
    id: string,
    patch: { paymentStatus?: PaymentStatus; bookingStatus?: BookingStatus }
  ) =>
    apiRequest<{ rental: AdminRental }>(
      `/admin/${adminId}/rentals/${encodeURIComponent(id)}`,
      { method: "PATCH", body: JSON.stringify(patch) }
    ),
}
