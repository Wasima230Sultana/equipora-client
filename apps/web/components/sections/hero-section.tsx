import Image from "next/image"
import { ArrowRight, CircleCheck } from "lucide-react"

import { Container } from "@/components/ui/container"
import { lightCtaClass, outlineOnDarkCtaClass } from "@/lib/button-styles"
import { heroImage, heroStats } from "@/lib/site-data"

export function HeroSection() {
  return (
    <>
      <section
        id="home"
        className="relative isolate overflow-hidden bg-brand-950"
      >
        <Image
          src={heroImage}
          alt="Excavator working on a construction site"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />

        <Container className="relative z-10">
          <div className="max-w-3xl py-24 sm:py-28 lg:py-36">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-brand-300" />
              The equipment marketplace for modern builders
            </span>

            <h1 className="mt-7 text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              Rent the right equipment.{" "}
              <span className="text-brand-200">Build without limits.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              From excavators to cranes, find verified machinery, compare
              transparent prices and get to work faster — all in one place.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#equipment" className={lightCtaClass}>
                Explore equipment
                <ArrowRight className="size-4" />
              </a>
              <a href="#list" className={outlineOnDarkCtaClass}>
                List your equipment
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-card">
        <Container>
          <div className="grid gap-8 py-10 sm:grid-cols-3 sm:divide-x sm:divide-border">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 sm:justify-center sm:px-6"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  <CircleCheck className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
