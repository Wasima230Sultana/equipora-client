"use client"

import { useState } from "react"
import { toast } from "sonner"

import { SelectInput } from "@/components/dashboard/form-controls"
import { AdminDataStatus } from "@/components/dashboard/admin/admin-data-status"
import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { adminApiClient } from "@/lib/admin-api-client"
import {
  bookingStatuses,
  formatDate,
  paymentStatuses,
  type AdminRental,
} from "@/lib/admin-data"
import { rentalDays } from "@/lib/browse-equipment"
import type { BookingStatus, PaymentStatus } from "@/lib/owner-equipment"

/** All bookings with customer/owner details and editable statuses. */
export function AdminRentalsTable({
  adminId,
  rows,
  loading,
  error,
  onChanged,
}: {
  adminId: string
  rows: AdminRental[]
  loading: boolean
  error: string | null
  onChanged: () => void
}) {
  const [busyId, setBusyId] = useState("")

  async function updateStatus(
    rental: AdminRental,
    patch: { paymentStatus?: PaymentStatus; bookingStatus?: BookingStatus }
  ) {
    setBusyId(rental.id)
    try {
      await adminApiClient.updateRentalStatus(adminId, rental.id, patch)
      toast.success("Rental updated")
      onChanged()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update rental")
    } finally {
      setBusyId("")
    }
  }

  const columns: DataTableColumn<AdminRental>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div>
          <p className="font-medium">{row.customerName || "—"}</p>
          <p className="text-xs text-muted-foreground">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      key: "owner",
      header: "Owner",
      render: (row) => (
        <div>
          <p className="font-medium">{row.ownerName || "—"}</p>
          <p className="text-xs text-muted-foreground">{row.ownerEmail}</p>
        </div>
      ),
    },
    {
      key: "equipment",
      header: "Equipment",
      render: (row) => (
        <div>
          <p className="font-medium">{row.equipmentName}</p>
          <p className="text-xs text-muted-foreground">{row.equipmentId}</p>
        </div>
      ),
    },
    {
      key: "duration",
      header: "Rental duration",
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
      key: "amount",
      header: "Booking amount",
      render: (row) => (
        <span className="font-medium">${row.totalAmount.toLocaleString()}</span>
      ),
    },
    {
      key: "payment",
      header: "Payment status",
      render: (row) => (
        <div className="space-y-2">
          <StatusBadge status={row.paymentStatus} />
          <SelectInput
            aria-label={`Change payment status for rental ${row.id}`}
            className="h-8 w-32 text-xs"
            value={row.paymentStatus}
            disabled={busyId === row.id}
            onChange={(event) =>
              void updateStatus(row, {
                paymentStatus: event.target.value as PaymentStatus,
              })
            }
          >
            {paymentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </SelectInput>
        </div>
      ),
    },
    {
      key: "booking",
      header: "Booking status",
      render: (row) => (
        <div className="space-y-2">
          <StatusBadge status={row.bookingStatus} />
          <SelectInput
            aria-label={`Change booking status for rental ${row.id}`}
            className="h-8 w-32 text-xs"
            value={row.bookingStatus}
            disabled={busyId === row.id}
            onChange={(event) =>
              void updateStatus(row, {
                bookingStatus: event.target.value as BookingStatus,
              })
            }
          >
            {bookingStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </SelectInput>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <AdminDataStatus
        loading={loading}
        error={error}
        count={rows.length}
        label="rentals"
      />
      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="No rental bookings have been made yet."
      />
    </div>
  )
}
