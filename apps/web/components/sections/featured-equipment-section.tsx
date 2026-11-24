import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { EquipmentCard } from "@/components/ui/equipment-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { featuredEquipment } from "@/lib/site-data"

export function FeaturedEquipmentSection() {
  return (
    <section id="equipment" className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Approved listings"
          title="Featured equipment"
          description="Six verified machines ready for your next project, with transparent daily rates."
          action={
            <a
              href="#recent"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Browse all listings
              <ArrowUpRight className="size-4" />
            </a>
          }
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEquipment.map((equipment) => (
            <EquipmentCard key={equipment.id} equipment={equipment} />
          ))}
        </div>
      </Container>
    </section>
  )
}
