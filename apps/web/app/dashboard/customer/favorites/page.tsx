"use client"

import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { FavoritesTable } from "@/components/dashboard/customer/favorites-table"
import { useSessionUser } from "@/hooks/use-session-user"

export default function FavoritesPage() {
  const { userId, role } = useSessionUser()
  const customerId = role === "customer" ? userId : ""

  return (
    <DashboardPage
      title="Favorites"
      description="Equipment you have saved for later."
    >
      <FavoritesTable customerId={customerId} />
    </DashboardPage>
  )
}
