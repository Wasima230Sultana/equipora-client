"use client"

import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { MyRentalsTable } from "@/components/dashboard/customer/my-rentals-table"
import { useSessionUser } from "@/hooks/use-session-user"

export default function MyRentalsPage() {
  const { userId, role } = useSessionUser()
  const customerId = role === "customer" ? userId : ""

  return (
    <DashboardPage
      title="My Rentals"
      description="All equipment bookings you have made."
    >
      <MyRentalsTable customerId={customerId} />
    </DashboardPage>
  )
}
