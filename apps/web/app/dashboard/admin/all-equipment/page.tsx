import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { EquipmentTable } from "@/components/dashboard/equipment-table"
import { adminEquipment } from "@/lib/dashboard-data"

export default function AllEquipmentPage() {
  return (
    <DashboardPage
      title="All Equipment"
      description="Every machine listed on Equipora, with approval status."
    >
      <EquipmentTable rows={adminEquipment} />
    </DashboardPage>
  )
}
