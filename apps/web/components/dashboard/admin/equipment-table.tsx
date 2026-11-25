"use client"

import { useState } from "react"
import { Check, Pencil, Trash2, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { AdminDataStatus } from "@/components/dashboard/admin/admin-data-status"
import { ConfirmDialog } from "@/components/dashboard/admin/confirm-dialog"
import { EquipmentUpdateForm } from "@/components/dashboard/admin/equipment-update-form"
import { Modal } from "@/components/dashboard/owner/modal"
import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { adminApiClient } from "@/lib/admin-api-client"
import type { Equipment } from "@/lib/owner-equipment"

/** All listings with approve, reject, update and delete actions. */
export function AdminEquipmentTable({
  adminId,
  rows,
  loading,
  error,
  onChanged,
}: {
  adminId: string
  rows: Equipment[]
  loading: boolean
  error: string | null
  onChanged: () => void
}) {
  const [busyId, setBusyId] = useState("")
  const [editing, setEditing] = useState<Equipment | null>(null)
  const [deleting, setDeleting] = useState<Equipment | null>(null)
  const [deletingBusy, setDeletingBusy] = useState(false)

  async function setStatus(item: Equipment, status: "Approved" | "Rejected") {
    setBusyId(item.id)
    try {
      await adminApiClient.setEquipmentStatus(adminId, item.id, status)
      toast.success(`Equipment ${status.toLowerCase()}`)
      onChanged()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update status")
    } finally {
      setBusyId("")
    }
  }

  async function confirmDelete() {
    if (!deleting) return
    setDeletingBusy(true)
    try {
      await adminApiClient.deleteEquipment(adminId, deleting.id)
      toast.success("Equipment deleted")
      setDeleting(null)
      onChanged()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete equipment")
    } finally {
      setDeletingBusy(false)
    }
  }

  const columns: DataTableColumn<Equipment>[] = [
    {
      key: "name",
      header: "Equipment",
      render: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.id}</p>
        </div>
      ),
    },
    { key: "category", header: "Category", render: (row) => row.category },
    { key: "owner", header: "Owner", render: (row) => row.owner?.name || "—" },
    {
      key: "price",
      header: "Price",
      render: (row) => `$${row.rentalPrice} / ${row.rentalType.toLowerCase()}`,
    },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Approve"
            aria-label={`Approve ${row.name}`}
            disabled={row.status === "Approved" || busyId === row.id}
            onClick={() => void setStatus(row, "Approved")}
          >
            <Check className="text-emerald-600" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Reject"
            aria-label={`Reject ${row.name}`}
            disabled={row.status === "Rejected" || busyId === row.id}
            onClick={() => void setStatus(row, "Rejected")}
          >
            <X className="text-destructive" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Update"
            aria-label={`Update ${row.name}`}
            onClick={() => setEditing(row)}
          >
            <Pencil />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Delete"
            aria-label={`Delete ${row.name}`}
            onClick={() => setDeleting(row)}
          >
            <Trash2 className="text-destructive" />
          </Button>
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
        label="equipment items"
      />
      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="No equipment has been listed yet."
      />

      <Modal
        open={Boolean(editing)}
        title="Update equipment"
        description={editing?.name}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <EquipmentUpdateForm
            adminId={adminId}
            equipment={editing}
            onSaved={() => {
              setEditing(null)
              onChanged()
            }}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete equipment?"
        description={`"${deleting?.name ?? ""}" and its related bookings will be removed.`}
        busy={deletingBusy}
        onConfirm={() => void confirmDelete()}
        onClose={() => setDeleting(null)}
      />
    </div>
  )
}
