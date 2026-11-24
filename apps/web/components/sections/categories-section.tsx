import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { categories } from "@/lib/site-data"

export function CategoriesSection() {
  return (
    <section id="categories" className="bg-card py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Browse by category"
          title="Popular categories"
          description="Explore the machines trusted on job sites across the region."
          action={
            <a
              href="#equipment"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View all equipment
              <ArrowUpRight className="size-4" />
            </a>
          }
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <a
              key={category.id}
              href="#equipment"
              className="group relative isolate aspect-[4/3] overflow-hidden rounded-3xl bg-muted"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/15 to-transparent" />

              <span className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-brand-800">
                <ArrowUpRight className="size-4" />
              </span>

              <div className="absolute right-6 bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold tracking-tight">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-white/75">
                  {category.count} machines available
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
