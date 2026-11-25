/** A recently uploaded equipment listing shown in the dashboard overview. */
export type RecentUpload = {
  id: string
  name: string
  category: string
  location: string
  status: string
  image: string
  ownerName: string
  createdAt: string | null
}

/** Human-friendly "time ago" label for an upload's createdAt value. */
export function formatUploadTime(createdAt: string | null): string {
  if (!createdAt) return "Recently"

  const timestamp = Date.parse(createdAt)
  if (Number.isNaN(timestamp)) return "Recently"

  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60_000))
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`

  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`

  return new Date(timestamp).toLocaleDateString()
}
