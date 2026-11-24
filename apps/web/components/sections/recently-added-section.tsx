import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { EquipmentCard } from "@/components/ui/equipment-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { recentEquipment } from "@/lib/site-data"

export function RecentlyAddedSection() {
  return (
    <section id="recent" className="bg-card py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Fresh on Equipora"
          title="Recently added equipment"
          description="New arrivals from trusted owners, available to book today."
          action={
            <a
              href="#equipment"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See all listings
              <ArrowUpRight className="size-4" />
            </a>
          }
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentEquipment.map((equipment) => (
            <EquipmentCard key={equipment.id} equipment={equipment} />
          ))}
        </div>
      </Container>
    </section>
  )
}
