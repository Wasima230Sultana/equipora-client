import { apiRequest } from "@/lib/backend-auth-client"
import type { ProfileInput, UserProfile } from "@/lib/profile-data"

/** Frontend-only profile API calls (works for customer, owner and admin). */
export const profileApiClient = {
  getProfile: (userId: string) =>
    apiRequest<{ profile: UserProfile }>(`/profile/${userId}`),

  updateProfile: (userId: string, input: ProfileInput) =>
    apiRequest<{ profile: UserProfile }>(`/profile/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
}
