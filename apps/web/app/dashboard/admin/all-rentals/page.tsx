import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { RentalsTable } from "@/components/dashboard/rentals-table"
import { rentals } from "@/lib/dashboard-data"

export default function AllRentalsPage() {
  return (
    <DashboardPage
      title="All Rentals"
      description="Track bookings across the whole marketplace."
    >
      <RentalsTable rows={rentals} showCustomer />
    </DashboardPage>
  )
}
