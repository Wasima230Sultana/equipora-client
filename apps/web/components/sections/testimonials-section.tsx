import Image from "next/image"
import { Quote, Star } from "lucide-react"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { testimonials } from "@/lib/site-data"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-card py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Customer stories"
          title="What our customers say"
          description="Real experiences from the teams and owners who use Equipora every day."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-3xl border border-border bg-background p-7 sm:p-8"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                <Quote className="size-5" />
              </span>

              <blockquote className="mt-5 text-base leading-relaxed text-foreground">
                “{testimonial.quote}”
              </blockquote>

              <div className="mt-5 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
