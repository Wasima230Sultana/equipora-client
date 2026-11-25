import { apiRequest } from "@/lib/backend-client"
import type { RecentUpload } from "@/lib/recent-uploads"

/** Frontend call for the platform-wide recent uploads feed. */
export const recentUploadsApiClient = {
  list: (limit = 4) =>
    apiRequest<{ uploads: RecentUpload[] }>(`/equipment/recent?limit=${limit}`),
}
