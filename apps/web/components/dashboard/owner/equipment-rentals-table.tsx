"use client"

import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { useCustomerProfiles } from "@/hooks/use-customer-profiles"
import { useOwnerRentals } from "@/hooks/use-owner-data"
import { rentalDays } from "@/lib/browse-equipment"
import type { OwnerRental } from "@/lib/owner-equipment"

type EquipmentRentalsTableProps = {
  ownerId: string
}

function formatDate(value: string) {
  if (!value) return "—"
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString()
}

/** Bookings for equipment owned by the logged-in owner. */
export function EquipmentRentalsTable({ ownerId }: EquipmentRentalsTableProps) {
  const { rows, loading, error } = useOwnerRentals(ownerId)
  const customers = useCustomerProfiles(rows.map((row) => row.customerId))
  console.log("[Owner UI] EquipmentRentalsTable rendering", rows.length, "booking(s)")

  const columns: DataTableColumn<OwnerRental>[] = [
    {
      key: "customer",
      header: "Customer Information",
      render: (row) => {
        const customer = customers[row.customerId]
        return (
          <div>
            <p className="font-medium">{customer?.name ?? row.customerId}</p>
            {customer?.email && (
              <p className="text-xs text-muted-foreground">{customer.email}</p>
            )}
            {customer?.phone && (
              <p className="text-xs text-muted-foreground">{customer.phone}</p>
            )}
          </div>
        )
      },
    },
    {
      key: "equipment",
      header: "Equipment Information",
      render: (row) => (
        <div>
          <p className="font-medium">{row.equipmentName}</p>
          <p className="text-xs text-muted-foreground">{row.equipmentId}</p>
        </div>
      ),
    },
    {
      key: "duration",
      header: "Rental Duration",
      render: (row) => (
        <div>
          <p>
            {formatDate(row.rentalStartDate)} – {formatDate(row.rentalEndDate)}
          </p>
          <p className="text-xs text-muted-foreground">
            {rentalDays(row.rentalStartDate, row.rentalEndDate)} day(s)
          </p>
        </div>
      ),
    },
    {
      key: "quantity",
      header: "Required Quantity",
      render: (row) => row.requiredQuantity,
    },
    {
      key: "amount",
      header: "Booking Amount",
      render: (row) => (
        <span className="font-medium">
          ${Number(row.totalAmount).toLocaleString()}
        </span>
      ),
    },
    {
      key: "payment",
      header: "Payment Status",
      render: (row) => <StatusBadge status={row.paymentStatus} />,
    },
    {
      key: "booking",
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
            : `${rows.length} booking(s) against your equipment`}
      </p>
      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="No one has rented your equipment yet."
      />
    </div>
  )
}
