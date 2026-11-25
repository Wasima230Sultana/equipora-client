import { PackageSearch } from "lucide-react"

import { BrowseEquipmentCard } from "@/components/browse/equipment-card"
import type { Equipment } from "@/lib/owner-equipment"

type BrowseEquipmentGridProps = {
  equipment: Equipment[]
  loading: boolean
  error: string | null
}

/** Three-column results grid with loading, error and empty states. */
export function BrowseEquipmentGrid({
  equipment,
  loading,
  error,
}: BrowseEquipmentGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[420px] animate-pulse rounded-2xl border border-border bg-muted/50"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-10 text-center text-sm text-destructive">
        {error}
      </div>
    )
  }

  // if (equipment.length === 0) {
  //   return (
  //     <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
  //       <PackageSearch className="size-10 text-muted-foreground" />
  //       <p className="font-medium">No approved equipment matches your search</p>
  //       <p className="text-sm text-muted-foreground">
  //         Try changing the filters or clearing the search.
  //       </p>
  //     </div>
  //   )
  // }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {equipment.map((item) => (
        <BrowseEquipmentCard key={item.id} equipment={item} />
      ))}
    </div>
  )
}
