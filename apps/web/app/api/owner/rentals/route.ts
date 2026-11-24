import { getCurrentOwner, listOwnerRentals } from "@/lib/owner-equipment"

/**
 * GET /api/owner/rentals
 * Bookings made against equipment owned by the logged-in owner.
 */
export async function GET() {
  console.log("[Owner API] GET /api/owner/rentals")
  const owner = getCurrentOwner()
  const rentals = listOwnerRentals(owner.id)
  console.log("[Owner API] GET /api/owner/rentals ->", rentals.length)
  return Response.json({ owner, rentals })
}
