import { HardHat } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

type BrandLogoProps = {
  /** Use on dark backgrounds such as the footer. */
  inverse?: boolean
  className?: string
}

export function BrandLogo({ inverse = false, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm",
          inverse && "bg-white text-brand-800"
        )}
      >
        <HardHat className="size-5" strokeWidth={2.2} />
      </span>
      <span
        className={cn(
          "text-xl font-semibold tracking-tight",
          inverse ? "text-white" : "text-foreground"
        )}
      >
        Equipora
      </span>
    </span>
  )
}
