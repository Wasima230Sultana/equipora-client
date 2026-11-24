import Image from "next/image"
import {
  CalendarDays,
  Headphones,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { benefits, storyImage } from "@/lib/site-data"

const benefitIcons = {
  shield: ShieldCheck,
  lock: LockKeyhole,
  calendar: CalendarDays,
  headphones: Headphones,
}

export function WhyChooseSection() {
  return (
    <section id="why-equipora" className="bg-background py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={storyImage}
              alt="Construction team reviewing plans on site"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/85 to-transparent p-6 pt-20">
              <p className="text-lg font-semibold text-white">
                Trusted by 12,000+ teams
              </p>
              <p className="mt-1 text-sm text-white/70">
                On job sites across the UAE and beyond.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Why Equipora"
              title="A better way to rent equipment"
              description="We take the friction out of renting machines so you can focus on the work that matters."
            />

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefitIcons[benefit.icon]
                return (
                  <div key={benefit.title}>
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
