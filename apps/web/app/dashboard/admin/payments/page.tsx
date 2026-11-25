"use client"

import { useMemo } from "react"

import { AdminDataStatus } from "@/components/dashboard/admin/admin-data-status"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { useAdminId, useAdminRentals } from "@/hooks/use-admin-data"
import { formatDate } from "@/lib/admin-data"
import { buildAdminPayments, type AdminPaymentRow } from "@/lib/admin-analytics"

/** Payment references, amounts and statuses derived from live admin rentals. */
const columns: DataTableColumn<AdminPaymentRow>[] = [
  {
    key: "id",
    header: "Payment",
    render: (row) => (
      <div>
        <p className="font-medium">{row.id}</p>
        <p className="text-xs text-muted-foreground">{row.rentalId}</p>
      </div>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    render: (row) => (
      <div>
        <p className="font-medium">{row.customer}</p>
        <p className="text-xs text-muted-foreground">{row.customerEmail}</p>
      </div>
    ),
  },
  { key: "method", header: "Method", render: (row) => row.method },
  { key: "date", header: "Date", render: (row) => formatDate(row.date) },
  {
    key: "amount",
    header: "Amount",
    render: (row) => (
      <span className="font-medium">
        {row.currency} {row.amount.toLocaleString()}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
]

export default function PaymentsPage() {
  const { adminId } = useAdminId()
  const { rows, loading, error } = useAdminRentals(adminId)
  const payments = useMemo(() => buildAdminPayments(rows), [rows])

  return (
    <DashboardPage
      title="Payments"
      description="A record of every transaction on Equipora."
    >
      <AdminDataStatus
        loading={loading}
        error={error}
        count={payments.length}
        label="payments"
      />
      {!loading && !error && (
        <DataTable
          columns={columns}
          rows={payments}
          emptyMessage="No payments have been recorded yet."
        />
      )}
    </DashboardPage>
  )
}
