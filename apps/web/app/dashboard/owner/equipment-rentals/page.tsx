"use client"

import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { EquipmentRentalsTable } from "@/components/dashboard/owner/equipment-rentals-table"
import { useOwnerId } from "@/hooks/use-owner-data"

export default function EquipmentRentalsPage() {
  const { ownerId } = useOwnerId()

  return (
    <DashboardPage
      title="Equipment Rentals"
      description="Bookings made against your equipment."
    >
      <EquipmentRentalsTable ownerId={ownerId} />
    </DashboardPage>
  )
}
