import { ArrowRight, Phone } from "lucide-react"

import { Container } from "@/components/ui/container"
import { lightCtaClass, outlineOnDarkCtaClass } from "@/lib/button-styles"

const highlights = [
  { value: "10 min", label: "To create a listing" },
  { value: "$4.2k", label: "Average monthly earning" },
  { value: "0%", label: "Listing fees" },
]

export function ListEquipmentCtaSection() {
  return (
    <section id="list" className="bg-background py-20 lg:py-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-16 text-center sm:px-12 lg:py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(87,167,126,0.3),transparent_55%)]" />

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/90">
            For equipment owners
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Turn idle equipment into steady income
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
            List your machines in minutes, reach trusted renters and manage
            every booking from one simple dashboard.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="/sign-up" className={lightCtaClass}>
              Start listing today
              <ArrowRight className="size-4" />
            </a>
            <a href="#" className={outlineOnDarkCtaClass}>
              <Phone className="size-4" />
              Talk to our team
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
