"use client"

/* eslint-disable @next/next/no-img-element -- image URLs come from ImgBB */

import { useEffect } from "react"

import { StatusBadge } from "@/components/dashboard/status-badge"
import { Modal } from "@/components/dashboard/owner/modal"
import type { Equipment } from "@/lib/owner-equipment"

type EquipmentDetailsDialogProps = {
  equipment: Equipment | null
  onClose: () => void
}

/** Shared "View Details" dialog used by owner and customer tables. */
export function EquipmentDetailsDialog({
  equipment,
  onClose,
}: EquipmentDetailsDialogProps) {
  useEffect(() => {
    if (equipment) console.log("[UI] viewing equipment details", equipment.id)
  }, [equipment])

  if (!equipment) return null

  return (
    <Modal
      open
      title={equipment.name}
      description={`Listing ${equipment.id}`}
      onClose={onClose}
      className="max-w-3xl"
    >
      {equipment.image && (
        <img
          src={equipment.image}
          alt={equipment.name}
          className="mb-5 h-48 w-full rounded-xl object-cover"
        />
      )}

      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        <Detail label="Category" value={equipment.category} />
        <Detail label="Location" value={equipment.location} />
        <Detail
          label="Rental Price"
          value={`$${equipment.rentalPrice} / ${equipment.rentalType.toLowerCase()}`}
        />
        <Detail
          label="Available Quantity"
          value={String(equipment.availableQuantity)}
        />
        <Detail label="Condition" value={equipment.condition} />
        <Detail
          label="Brand / Model"
          value={[equipment.brand, equipment.model].filter(Boolean).join(" ") || "—"}
        />
        <div className="flex items-center gap-2">
          <dt className="text-muted-foreground">Status:</dt>
          <dd>
            <StatusBadge status={equipment.status} />
          </dd>
        </div>
        <Detail
          label="Listed on"
          value={new Date(equipment.createdAt).toLocaleDateString()}
        />
        <Detail label="Owner" value={equipment.owner?.name || "—"} />
        <Detail label="Owner email" value={equipment.owner?.email || "—"} />
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Description</dt>
          <dd className="mt-1 leading-relaxed">{equipment.description || "—"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Rental Terms and Conditions</dt>
          <dd className="mt-1 leading-relaxed">{equipment.terms || "—"}</dd>
        </div>
      </dl>
    </Modal>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}
