"use client"

import { useState, type FormEvent } from "react"
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
  Truck,
} from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { categories, locations } from "@/lib/site-data"

const popularSearches = [
  "Excavators in Dubai",
  "Cranes in Sharjah",
  "Forklifts in Ajman",
]

const controlClass =
  "h-12 w-full rounded-xl border border-border bg-background text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20"

function SelectField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string
  icon: typeof Search
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: string[]
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${controlClass} appearance-none pr-10 pl-11`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  )
}

/** Homepage search with dummy filter state and a scroll-to-results action. */
export function SearchSection() {
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    document.getElementById("equipment")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="search" className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Find your machine"
          title="The right equipment is a few clicks away"
          description="Tell us what you need, where you need it and when. We'll show you verified machines that fit."
        />

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-border bg-card p-5 shadow-[0_20px_60px_-35px_rgba(16,52,35,0.45)] sm:p-7"
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
            <SelectField
              label="Equipment type"
              icon={Truck}
              value={category}
              onChange={setCategory}
              placeholder="All categories"
              options={categories.map((item) => item.name)}
            />
            <SelectField
              label="Location"
              icon={MapPin}
              value={location}
              onChange={setLocation}
              placeholder="All locations"
              options={locations}
            />
            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                Rental date
              </span>
              <span className="relative block">
                <CalendarDays className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  aria-label="Rental date"
                  className={`${controlClass} pl-11`}
                />
              </span>
            </label>
            <button
              type="submit"
              className={buttonVariants({
                size: "lg",
                className: "h-12 w-full gap-2 px-6 lg:w-auto",
              })}
            >
              <Search className="size-4" />
              Search equipment
              <ArrowRight className="size-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Popular:</span>
          {popularSearches.map((term) => (
            <a
              key={term}
              href="#equipment"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              {term}
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
