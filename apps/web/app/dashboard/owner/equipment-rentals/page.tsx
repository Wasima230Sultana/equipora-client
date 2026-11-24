import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { EquipmentRentalsTable } from "@/components/dashboard/owner/equipment-rentals-table"
import { getCurrentOwner, listOwnerRentals } from "@/lib/owner-equipment"

// Demo data can change, so render on every request instead of at build time.
export const dynamic = "force-dynamic"

export default function EquipmentRentalsPage() {
  const owner = getCurrentOwner()
  const rentals = listOwnerRentals(owner.id)
  console.log("[Owner Page] rendering Equipment Rentals", rentals.length, "booking(s)")

  return (
    <DashboardPage
      title="Equipment Rentals"
      description="Bookings made against your equipment."
    >
      <EquipmentRentalsTable initialRentals={rentals} />
    </DashboardPage>
  )
}
