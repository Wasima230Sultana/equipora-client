"use client"

import {
  CalendarRange,
  CircleDollarSign,
  ClipboardList,
  PackagePlus,
} from "lucide-react"

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
import { useOwnerEquipment, useOwnerId, useOwnerRentals } from "@/hooks/use-owner-data"
import type { Stat } from "@/lib/dashboard-data"
import { buildOwnerSummary } from "@/lib/owner-summary"

type PaymentRow = ReturnType<typeof buildOwnerSummary>["paymentBreakdown"][number]

const columns: DataTableColumn<PaymentRow>[] = [
  {
    key: "status",
    header: "Payment Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  { key: "count", header: "Bookings", render: (row) => row.count },
  {
    key: "amount",
    header: "Amount",
    render: (row) => `$${row.amount.toLocaleString()}`,
  },
]

export default function EarningsPage() {
  const { ownerId } = useOwnerId()
  const { rows: equipment } = useOwnerEquipment(ownerId)
  const { rows: rentals } = useOwnerRentals(ownerId)
  const summary = buildOwnerSummary(equipment, rentals)

  const stats: Stat[] = [
    {
      label: "My equipment",
      value: String(summary.equipmentCount),
      icon: PackagePlus,
    },
    {
      label: "Active rentals",
      value: String(summary.activeRentals),
      icon: ClipboardList,
    },
    {
      label: "Paid earnings",
      value: `$${summary.paidEarnings.toLocaleString()}`,
      icon: CircleDollarSign,
    },
    {
      label: "Total bookings",
      value: String(summary.totalBookings),
      icon: CalendarRange,
    },
  ]

  return (
    <DashboardPage
      title="Earnings"
      description="Track what your equipment is earning."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {summary.monthlyEarnings.length > 0 ? (
        <RevenueChart
          data={summary.monthlyEarnings}
          title="Earnings from bookings"
        />
      ) : (
        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border px-6 py-5">
            <CardTitle className="text-base">Earnings overview</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-8 text-sm text-muted-foreground">
            No bookings have been recorded yet.
          </CardContent>
        </Card>
      )}

      <Card className="gap-0 py-0">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="text-base">Payment summary</CardTitle>
        </CardHeader>
        <CardContent className="px-0 py-0">
          <DataTable columns={columns} rows={summary.paymentBreakdown} />
        </CardContent>
      </Card>
    </DashboardPage>
  )
}
