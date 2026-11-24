"use client"

/* eslint-disable @next/next/no-img-element -- image URLs come from ImgBB */

import { useState } from "react"
import { Eye, Heart, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { EquipmentDetailsDialog } from "@/components/dashboard/equipment-details-dialog"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Modal } from "@/components/dashboard/owner/modal"
import { useCustomerFavorites } from "@/hooks/use-customer-data"
import { customerApiClient } from "@/lib/customer-api-client"
import type { Equipment } from "@/lib/owner-equipment"

/** Customer's favorite equipment with View Details and Remove Favorite. */
export function FavoritesTable({ customerId }: { customerId: string }) {
  const { rows, loading, error, refresh } = useCustomerFavorites(customerId)
  const [viewing, setViewing] = useState<Equipment | null>(null)
  const [removing, setRemoving] = useState<Equipment | null>(null)

  async function confirmRemove() {
    if (!removing) return
    console.log("[Customer UI] remove favorite", removing.id)
    try {
      await customerApiClient.removeFavorite(customerId, removing.id)
      console.log("[Customer UI] favorite removed", removing.id)
      toast.success("Removed from favorites")
      setRemoving(null)
      await refresh()
    } catch (error) {
      console.error("[Customer UI] remove favorite failed", error)
      toast.error(error instanceof Error ? error.message : "Could not remove favorite")
    }
  }

  const columns: DataTableColumn<Equipment>[] = [
    {
      key: "equipment",
      header: "Equipment",
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
              <Heart className="size-4" />
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
      render: (row) => `$${row.rentalPrice} / ${row.rentalType.toLowerCase()}`,
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
            title="View Details"
            aria-label={`View details for ${row.name}`}
            onClick={() => {
              console.log("[Customer UI] view details", row.id)
              setViewing(row)
            }}
          >
            <Eye />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Remove Favorite"
            aria-label={`Remove ${row.name} from favorites`}
            onClick={() => {
              console.log("[Customer UI] remove clicked", row.id)
              setRemoving(row)
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
      <p className="text-sm text-muted-foreground">
        {error
          ? error
          : loading
            ? "Loading favorites from backend..."
            : `${rows.length} favorite(s)`}
      </p>
      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="You have not added any equipment to your favorites yet."
      />

      <EquipmentDetailsDialog
        equipment={viewing}
        onClose={() => setViewing(null)}
      />

      <Modal
        open={Boolean(removing)}
        title="Remove from favorites?"
        description={`"${removing?.name ?? ""}" will be removed from your favorites.`}
        onClose={() => setRemoving(null)}
        className="max-w-md"
      >
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setRemoving(null)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={() => void confirmRemove()}>
            <Trash2 />
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  )
}
