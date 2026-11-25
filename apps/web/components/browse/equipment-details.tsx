/* eslint-disable @next/next/no-img-element -- listing images come from remote hosts */

import { CalendarDays, MapPin, Package } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { isAvailable } from "@/lib/browse-equipment"
import type { Equipment } from "@/lib/owner-equipment"

/** Presentational listing details shared by the protected details page. */
export function EquipmentDetails({ equipment }: { equipment: Equipment }) {
  const available = isAvailable(equipment)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[16/9] bg-muted">
        {equipment.image ? (
          <img
            src={equipment.image}
            alt={equipment.name}
            className="size-full object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <Package className="size-16" />
          </div>
        )}
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{equipment.category || "Uncategorized"}</Badge>
          <StatusBadge status={equipment.status} />
          <Badge variant={available ? "success" : "destructive"}>
            {available ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{equipment.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Listed by {equipment.owner?.name || "an Equipora owner"}
            {equipment.createdAt
              ? ` on ${new Date(equipment.createdAt).toLocaleDateString()}`
              : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4" />
            {equipment.location || "Location not specified"}
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="size-4" />
            {equipment.rentalType} rental
          </span>
          <span>
            <strong className="text-xl font-semibold text-foreground">
              ${equipment.rentalPrice.toLocaleString()}
            </strong>{" "}
            / {equipment.rentalType.toLowerCase()}
          </span>
          <span>{equipment.availableQuantity} available</span>
        </div>

        <dl className="grid gap-5 border-t border-border pt-6 text-sm sm:grid-cols-2">
          <Detail label="Brand / Model" value={[equipment.brand, equipment.model].filter(Boolean).join(" ") || "—"} />
          <Detail label="Condition" value={equipment.condition || "—"} />
          <Detail label="Owner" value={equipment.owner?.name || "—"} />
          <Detail label="Owner email" value={equipment.owner?.email || "—"} />
          <Detail label="Description" value={equipment.description || "—"} wide />
          <Detail label="Rental terms" value={equipment.terms || "—"} wide />
        </dl>
      </div>
    </div>
  )
}

function Detail({
  label,
  value,
  wide = false,
}: {
  label: string
  value: string
  wide?: boolean
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 leading-relaxed font-medium whitespace-pre-line">{value}</dd>
    </div>
  )
}
