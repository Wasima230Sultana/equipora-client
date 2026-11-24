"use client"

import { useEffect } from "react"

import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import type { OwnerRental } from "@/lib/owner-equipment"

type EquipmentRentalsTableProps = {
  initialRentals: OwnerRental[]
}

/** Bookings for equipment owned by the logged-in owner. */
export function EquipmentRentalsTable({
  initialRentals,
}: EquipmentRentalsTableProps) {
  useEffect(() => {
    console.log(
      "[Owner UI] EquipmentRentalsTable mounted",
      initialRentals.length,
      "booking(s)"
    )
  }, [initialRentals.length])

  const columns: DataTableColumn<OwnerRental>[] = [
    {
      key: "customer",
      header: "Customer Information",
      render: (row) => (
        <div>
          <p className="font-medium">{row.customer.name}</p>
          <p className="text-xs text-muted-foreground">{row.customer.email}</p>
          <p className="text-xs text-muted-foreground">{row.customer.phone}</p>
        </div>
      ),
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
      render: (row) => row.duration,
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
          ${row.bookingAmount.toLocaleString()}
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
        {initialRentals.length} booking(s) against your equipment
      </p>
      <DataTable
        columns={columns}
        rows={initialRentals}
        emptyMessage="No one has rented your equipment yet."
      />
    </div>
  )
}
