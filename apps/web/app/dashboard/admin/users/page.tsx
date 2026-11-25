"use client"

import { UsersTable } from "@/components/dashboard/admin/users-table"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { useAdminId, useAdminUsers } from "@/hooks/use-admin-data"

export default function UsersPage() {
  const { adminId } = useAdminId()
  const { rows, loading, error, refresh } = useAdminUsers(adminId)

  return (
    <DashboardPage
      title="All Users"
      description="Review everyone with an Equipora account."
    >
      <UsersTable
        adminId={adminId}
        rows={rows}
        loading={loading}
        error={error}
        onChanged={() => void refresh()}
      />
    </DashboardPage>
  )
}
