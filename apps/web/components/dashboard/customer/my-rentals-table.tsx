"use client"

import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { useCustomerRentals } from "@/hooks/use-customer-data"
import type { CustomerRental } from "@/lib/customer-data"

function formatDate(value: string) {
  if (!value) return "—"
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString()
}

/** All rental bookings of the signed-in customer, loaded from the backend. */
export function MyRentalsTable({ customerId }: { customerId: string }) {
  const { rows, loading, error } = useCustomerRentals(customerId)

  const columns: DataTableColumn<CustomerRental>[] = [
    {
      key: "equipment",
      header: "Equipment Name",
      render: (row) => (
        <div>
          <p className="font-medium">{row.equipmentName}</p>
          <p className="text-xs text-muted-foreground">{row.id}</p>
        </div>
      ),
    },
    {
      key: "start",
      header: "Rental Start Date",
      render: (row) => formatDate(row.rentalStartDate),
    },
    {
      key: "end",
      header: "Rental End Date",
      render: (row) => formatDate(row.rentalEndDate),
    },
    {
      key: "bookingDate",
      header: "Booking Date",
      render: (row) => formatDate(row.bookingDate),
    },
    {
      key: "amount",
      header: "Total Amount",
      render: (row) => (
        <span className="font-medium">${row.totalAmount.toLocaleString()}</span>
      ),
    },
    {
      key: "payment",
      header: "Payment Status",
      render: (row) => <StatusBadge status={row.paymentStatus} />,
    },
    {
      key: "bookingStatus",
      header: "Booking Status",
      render: (row) => <StatusBadge status={row.bookingStatus} />,
    },
  ]

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {error
          ? error
          : loading
            ? "Loading bookings from backend..."
            : `${rows.length} booking(s)`}
      </p>
      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="You have not made any rental bookings yet."
      />
    </div>
  )
}
