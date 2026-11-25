"use client"

import { AdminRentalsTable } from "@/components/dashboard/admin/rentals-table"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { useAdminId, useAdminRentals } from "@/hooks/use-admin-data"

export default function AllRentalsPage() {
  const { adminId } = useAdminId()
  const { rows, loading, error, refresh } = useAdminRentals(adminId)

  return (
    <DashboardPage
      title="All Rentals"
      description="Track and manage bookings across the whole marketplace."
    >
      <AdminRentalsTable
        adminId={adminId}
        rows={rows}
        loading={loading}
        error={error}
        onChanged={() => void refresh()}
      />
    </DashboardPage>
  )
}
