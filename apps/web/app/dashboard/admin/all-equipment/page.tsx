"use client"

import { AdminEquipmentTable } from "@/components/dashboard/admin/equipment-table"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { useAdminEquipment, useAdminId } from "@/hooks/use-admin-data"

export default function AllEquipmentPage() {
  const { adminId } = useAdminId()
  const { rows, loading, error, refresh } = useAdminEquipment(adminId)

  return (
    <DashboardPage
      title="All Equipment"
      description="Every machine listed on Equipora, with approval status."
    >
      <AdminEquipmentTable
        adminId={adminId}
        rows={rows}
        loading={loading}
        error={error}
        onChanged={() => void refresh()}
      />
    </DashboardPage>
  )
}
