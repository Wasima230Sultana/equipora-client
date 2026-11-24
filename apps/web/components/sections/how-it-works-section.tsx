import { CircleCheck, FileCheck, Search, Truck } from "lucide-react"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { steps } from "@/lib/site-data"

const stepIcons = [Search, FileCheck, Truck, CircleCheck]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-card py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Simple process"
          title="How Equipora works"
          description="Four straightforward steps from searching to handing the keys back."
          align="center"
        />

        <div className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-8 right-0 left-0 hidden h-px bg-border lg:block" />
          {steps.map((step, index) => {
            const Icon = stepIcons[index] ?? CircleCheck
            return (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-2xl border border-border bg-background shadow-sm">
                  <Icon className="size-7 text-primary" strokeWidth={1.8} />
                </div>
                <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
