import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { RentalsTable } from "@/components/dashboard/rentals-table"
import { myRentals } from "@/lib/dashboard-data"

export default function MyRentalsPage() {
  return (
    <DashboardPage
      title="My Rentals"
      description="Your past and active equipment bookings."
    >
      <RentalsTable rows={myRentals} />
    </DashboardPage>
  )
}
