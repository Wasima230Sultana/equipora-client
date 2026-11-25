/* eslint-disable @next/next/no-img-element -- listing images come from remote hosts */

import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin, Package } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { buttonVariants } from "@workspace/ui/components/button"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { isAvailable } from "@/lib/browse-equipment"
import type { Equipment } from "@/lib/owner-equipment"

/** One listing in the browse grid. */
export function BrowseEquipmentCard({ equipment }: { equipment: Equipment }) {
  const available = isAvailable(equipment)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-muted">
        {equipment.image ? (
          <img
            src={equipment.image}
            alt={equipment.name}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <Package className="size-10" />
          </div>
        )}
        <Badge
          variant={available ? "success" : "destructive"}
          className="absolute top-3 left-3 bg-background/95 shadow-sm"
        >
          {available ? "Available" : "Unavailable"}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold tracking-wider text-primary uppercase">
            {equipment.category || "Uncategorized"}
          </p>
          <StatusBadge status={equipment.status} />
        </div>

        <h3 className="text-lg leading-snug font-semibold">{equipment.name}</h3>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            {equipment.location || "Location not specified"}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            {equipment.rentalType} rental
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            <span className="text-xl font-semibold text-foreground">
              ${equipment.rentalPrice.toLocaleString()}
            </span>{" "}
            / {equipment.rentalType.toLowerCase()}
          </p>
          <span className="text-xs text-muted-foreground">
            {equipment.availableQuantity} in stock
          </span>
        </div>

        <Link
          href={`/browse-equipment/${equipment.id}`}
          className={buttonVariants({ variant: "outline", className: "w-full" })}
        >
          View Details
          <ArrowUpRight />
        </Link>
      </div>
    </article>
  )
}
