"use client"

/* eslint-disable @next/next/no-img-element -- image URLs come from ImgBB */

import { useState } from "react"
import Link from "next/link"
import { Eye, Pencil, Plus, Trash2, Truck } from "lucide-react"
import { toast } from "sonner"

import {
  Button,
  buttonVariants,
} from "@workspace/ui/components/button"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { AddEquipmentForm } from "@/components/dashboard/owner/add-equipment-form"
import { EquipmentDetailsDialog } from "@/components/dashboard/owner/equipment-details-dialog"
import { Modal } from "@/components/dashboard/owner/modal"
import { useOwnerEquipment } from "@/hooks/use-owner-data"
import { ownerApiClient } from "@/lib/owner-api-client"
import type { Equipment, OwnerInfo } from "@/lib/owner-equipment"

type MyEquipmentTableProps = {
  owner: OwnerInfo
  ownerId: string
}

/** Lists the logged-in owner's equipment with Update / Delete / View actions. */
export function MyEquipmentTable({ owner, ownerId }: MyEquipmentTableProps) {
  const {
    rows,
    loading: refreshing,
    error: loadError,
    refresh,
  } = useOwnerEquipment(ownerId)
  const [viewing, setViewing] = useState<Equipment | null>(null)
  const [editing, setEditing] = useState<Equipment | null>(null)
  const [deleting, setDeleting] = useState<Equipment | null>(null)

  console.log("[Owner UI] MyEquipmentTable rendering", rows.length, "item(s)")

  async function confirmDelete() {
    if (!deleting) return
    console.log("[Owner UI] delete requested", deleting.id)

    try {
      await ownerApiClient.deleteEquipment(ownerId, deleting.id)
      console.log("[Owner UI] delete succeeded", deleting.id)
      toast.success("Equipment deleted")
      setDeleting(null)
      await refresh()
    } catch (error) {
      console.error("[Owner UI] delete failed", error)
      toast.error(error instanceof Error ? error.message : "Delete failed")
    }
  }

  const columns: DataTableColumn<Equipment>[] = [
    {
      key: "name",
      header: "Equipment Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <img
              src={row.image}
              alt={row.name}
              className="size-10 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Truck className="size-4" />
            </div>
          )}
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.id}</p>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Category", render: (row) => row.category },
    {
      key: "price",
      header: "Rental Price",
      render: (row) => (
        <span className="font-medium">
          ${row.rentalPrice}{" "}
          <span className="text-xs font-normal text-muted-foreground">
            / {row.rentalType.toLowerCase()}
          </span>
        </span>
      ),
    },
    {
      key: "quantity",
      header: "Available Quantity",
      render: (row) => row.availableQuantity,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="View details"
            aria-label={`View details for ${row.name}`}
            onClick={() => {
              console.log("[Owner UI] view details clicked", row.id)
              setViewing(row)
            }}
          >
            <Eye />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Update"
            aria-label={`Update ${row.name}`}
            onClick={() => {
              console.log("[Owner UI] update clicked", row.id)
              setEditing(row)
            }}
          >
            <Pencil />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Delete"
            aria-label={`Delete ${row.name}`}
            onClick={() => {
              console.log("[Owner UI] delete clicked", row.id)
              setDeleting(row)
            }}
          >
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {loadError
            ? loadError
            : refreshing
              ? "Loading from backend..."
              : `${rows.length} listing(s)`}
        </p>
        <Link
          href="/dashboard/owner/add-equipment"
          className={buttonVariants({ size: "lg", className: "h-10" })}
        >
          <Plus />
          Add equipment
        </Link>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="You have not added any equipment yet."
      />

      <EquipmentDetailsDialog
        equipment={viewing}
        onClose={() => setViewing(null)}
      />

      <Modal
        open={Boolean(editing)}
        title="Update equipment"
        description="Change the details below and save your updates."
        onClose={() => setEditing(null)}
        className="max-w-4xl"
      >
        {editing && (
          <AddEquipmentForm
            owner={owner}
            ownerId={ownerId}
            initialEquipment={editing}
            onCancel={() => setEditing(null)}
            onSaved={() => {
              setEditing(null)
              void refresh()
            }}
          />
        )}
      </Modal>

      <Modal
        open={Boolean(deleting)}
        title="Delete equipment?"
        description={`"${deleting?.name ?? ""}" will be removed from your listings.`}
        onClose={() => setDeleting(null)}
        className="max-w-md"
      >
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setDeleting(null)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={() => void confirmDelete()}>
            <Trash2 />
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
