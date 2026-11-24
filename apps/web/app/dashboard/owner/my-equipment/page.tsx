import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { MyEquipmentTable } from "@/components/dashboard/owner/my-equipment-table"
import { getCurrentOwner, listEquipment } from "@/lib/owner-equipment"

// Demo data can change, so render on every request instead of at build time.
export const dynamic = "force-dynamic"

export default function MyEquipmentPage() {
  const owner = getCurrentOwner()
  const equipment = listEquipment(owner.id)
  console.log("[Owner Page] rendering My Equipment", equipment.length, "item(s)")

  return (
    <DashboardPage
      title="My Equipment"
      description="Manage the machines you have listed."
    >
      <MyEquipmentTable owner={owner} initialEquipment={equipment} />
    </DashboardPage>
  )
}
