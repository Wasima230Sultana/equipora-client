"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { BrowseEquipmentCard } from "@/components/browse/equipment-card"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { useFeaturedEquipment } from "@/hooks/use-browse-equipment"
import { useSession } from "@/lib/auth-client"

const FEATURED_LIMIT = 6

export function FeaturedEquipmentSection() {
  const { data: session, isPending } = useSession()
  const { equipment, loading, error } = useFeaturedEquipment(FEATURED_LIMIT)
  const isLoggedIn = Boolean(session?.user)

  return (
    <section id="equipment" className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Approved listings"
          title="Featured equipment"
          description="Six verified machines ready for your next project, with transparent daily rates."
          action={
            <Link
              href="/browse-equipment"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Browse all listings
              <ArrowUpRight className="size-4" />
            </Link>
          }
        />

        {loading || isPending ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: FEATURED_LIMIT }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-3xl bg-muted/50"
              />
            ))}
          </div>
        ) : error ? (
          <p className="mt-10 text-sm text-destructive">{error}</p>
        ) : equipment.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">
            No approved equipment is featured yet. Check back soon.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item) => (
              <BrowseEquipmentCard
                key={item.id}
                equipment={item}
                viewHref={isLoggedIn ? undefined : "/sign-in"}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
