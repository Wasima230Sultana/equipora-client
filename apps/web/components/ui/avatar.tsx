"use client"

import { useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

type AvatarProps = {
  name: string
  src?: string | null
  className?: string
}

/** User avatar with an initials fallback for missing or broken image links. */
export function Avatar({ name, src, className }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-100 text-xs font-semibold text-brand-800 dark:bg-brand-900/50 dark:text-brand-200",
        className
      )}
    >
      {src && !imageFailed ? (
        // User-provided URLs can be on any host, so a plain img is the safest option.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          onError={() => setImageFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        initials || "?"
      )}
    </span>
  )
}
