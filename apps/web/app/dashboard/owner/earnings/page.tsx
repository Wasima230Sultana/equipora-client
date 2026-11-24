import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { dashboardStats, earnings, payouts } from "@/lib/dashboard-data"

type PayoutRow = (typeof payouts)[number]

const columns: DataTableColumn<PayoutRow>[] = [
  { key: "id", header: "Payout", render: (row) => row.id },
  { key: "date", header: "Date", render: (row) => row.date },
  { key: "amount", header: "Amount", render: (row) => row.amount },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
]

export default function EarningsPage() {
  return (
    <DashboardPage
      title="Earnings"
      description="Track what your equipment is earning."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.owner.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <RevenueChart data={earnings} title="Earnings overview" />

      <Card className="gap-0 py-0">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="text-base">Recent payouts</CardTitle>
        </CardHeader>
        <CardContent className="px-0 py-0">
          <DataTable columns={columns} rows={payouts} />
        </CardContent>
      </Card>
    </DashboardPage>
  )
}
