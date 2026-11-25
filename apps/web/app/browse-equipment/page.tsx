"use client"

import { useMemo, useState } from "react"

import { BrowseEquipmentGrid } from "@/components/browse/equipment-grid"
import { BrowseFiltersPanel } from "@/components/browse/browse-filters"
import { Container } from "@/components/ui/container"
import { useBrowseEquipment } from "@/hooks/use-browse-equipment"
import {
  defaultBrowseFilters,
  toBrowseQuery,
  type BrowseFilters,
} from "@/lib/browse-equipment"

export default function BrowseEquipmentPage() {
  const [filters, setFilters] = useState<BrowseFilters>(defaultBrowseFilters)
  const query = useMemo(() => toBrowseQuery(filters), [filters])
  const { equipment, loading, error } = useBrowseEquipment(query)

  function updateFilter<K extends keyof BrowseFilters>(
    key: K,
    value: BrowseFilters[K]
  ) {
    setFilters((previous) => ({ ...previous, [key]: value }))
  }

  return (
    <main className="min-h-[70vh] pb-20">
      <section className="border-b border-border bg-card py-12">
        <Container>
          <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            Equipment marketplace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Browse equipment
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Explore machinery from trusted owners. Sign in to view full details,
            save favorites and request a booking.
          </p>
        </Container>
      </section>

      <Container className="mt-8 space-y-8">
        <BrowseFiltersPanel
          filters={filters}
          onChange={updateFilter}
          onReset={() => setFilters(defaultBrowseFilters)}
          count={equipment.length}
          loading={loading}
        />
        <BrowseEquipmentGrid
          equipment={equipment}
          loading={loading}
          error={error}
        />
      </Container>
    </main>
  )
}
