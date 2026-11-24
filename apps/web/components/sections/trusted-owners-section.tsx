import Image from "next/image"
import { BadgeCheck } from "lucide-react"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { owners } from "@/lib/site-data"

export function TrustedOwnersSection() {
  return (
    <section
      id="owners"
      className="bg-brand-50/60 py-20 lg:py-28 dark:bg-brand-950/30"
    >
      <Container>
        <SectionHeading
          eyebrow="Our community"
          title="Trusted equipment owners"
          description="A network of verified owners keeping great machines on site and on schedule."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {owners.map((owner) => (
            <article
              key={owner.name}
              className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="relative mx-auto w-fit">
                <Image
                  src={owner.avatar}
                  alt={owner.name}
                  width={72}
                  height={72}
                  className="size-18 rounded-full object-cover"
                />
                <span className="absolute -right-1 -bottom-1 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-card">
                  <BadgeCheck className="size-3.5" />
                </span>
              </div>
              <h3 className="mt-4 font-semibold">{owner.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{owner.role}</p>
              <p className="text-sm text-muted-foreground">{owner.location}</p>
              <p className="mt-4 border-t border-border pt-4 text-xs font-semibold tracking-wide text-primary uppercase">
                {owner.detail}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
