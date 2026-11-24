import type { ComponentProps } from "react"

import { cn } from "@workspace/ui/lib/utils"

/** Shared page width and horizontal padding for every section. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",
        className
      )}
      {...props}
    />
  )
}
