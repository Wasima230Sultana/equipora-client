import Image from "next/image"
import { ArrowUpRight, BadgeCheck, MapPin, Star } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import type { Equipment } from "@/lib/site-data"

type EquipmentCardProps = {
  equipment: Equipment
  className?: string
}

/** Reusable listing card for featured and recently added equipment. */
export function EquipmentCard({ equipment, className }: EquipmentCardProps) {
  const {
    name,
    category,
    location,
    pricePerDay,
    rating,
    reviews,
    image,
    badge,
  } = equipment

  return (
    <a
      href="#equipment"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-800 shadow-sm backdrop-blur-sm">
            {badge === "Verified" && <BadgeCheck className="size-3.5" />}
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          {category}
        </p>
        <h3 className="mt-2 text-lg leading-snug font-semibold">{name}</h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" />
            {location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">
              {rating.toFixed(1)}
            </span>
            <span>({reviews})</span>
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            <span className="text-xl font-semibold text-foreground">
              ${pricePerDay}
            </span>
            <span> / day</span>
          </p>
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-brand-900/40 dark:text-brand-300">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </a>
  )
}
