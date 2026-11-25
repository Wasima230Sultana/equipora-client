"use client"

import { RotateCcw, Search } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import {
  FormField,
  SelectInput,
} from "@/components/dashboard/form-controls"
import {
  availabilityOptions,
  categoryOptions,
  rentalTypeOptions,
  sortOptions,
  type BrowseFilters,
  type UpdateBrowseFilter,
} from "@/lib/browse-equipment"

type BrowseFiltersProps = {
  filters: BrowseFilters
  onChange: UpdateBrowseFilter
  onReset: () => void
  count: number
  loading: boolean
}

/** Search, filters and sorting. Every change is sent to the backend. */
export function BrowseFiltersPanel({
  filters,
  onChange,
  onReset,
  count,
  loading,
}: BrowseFiltersProps) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b border-border px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">Search &amp; filters</CardTitle>
          <p className="text-sm text-muted-foreground">
            {loading ? "Updating results…" : `${count} equipment found`}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 px-6 py-6">
        <FormField
          label="Search by equipment name or location"
          htmlFor="browse-search"
          className="max-w-xl"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="browse-search"
              className="pl-9"
              placeholder="Try “excavator” or “Dubai”"
              value={filters.search}
              onChange={(event) => onChange("search", event.target.value)}
            />
          </div>
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FormField label="Category" htmlFor="browse-category">
            <SelectInput
              id="browse-category"
              value={filters.category}
              onChange={(event) => onChange("category", event.target.value)}
            >
              <option value="">All categories</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </SelectInput>
          </FormField>

          <FormField label="Rental type" htmlFor="browse-rental-type">
            <SelectInput
              id="browse-rental-type"
              value={filters.rentalType}
              onChange={(event) => onChange("rentalType", event.target.value)}
            >
              <option value="">Any rental type</option>
              {rentalTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectInput>
          </FormField>

          <FormField label="Availability" htmlFor="browse-availability">
            <SelectInput
              id="browse-availability"
              value={filters.availability}
              onChange={(event) => onChange("availability", event.target.value)}
            >
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectInput>
          </FormField>

          <FormField label="Sort by" htmlFor="browse-sort">
            <SelectInput
              id="browse-sort"
              value={filters.sort}
              onChange={(event) => onChange("sort", event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectInput>
          </FormField>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <FormField
            label="Min price"
            htmlFor="browse-min-price"
            className="w-40"
          >
            <Input
              id="browse-min-price"
              type="number"
              min="0"
              placeholder="0"
              value={filters.minPrice}
              onChange={(event) => onChange("minPrice", event.target.value)}
            />
          </FormField>
          <FormField
            label="Max price"
            htmlFor="browse-max-price"
            className="w-40"
          >
            <Input
              id="browse-max-price"
              type="number"
              min="0"
              placeholder="Any"
              value={filters.maxPrice}
              onChange={(event) => onChange("maxPrice", event.target.value)}
            />
          </FormField>
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="mb-0.5"
          >
            <RotateCcw />
            Reset filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
