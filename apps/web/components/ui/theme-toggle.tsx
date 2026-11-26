"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type ThemeToggleProps = {
  className?: string
}

/**
 * Reusable light/dark theme button.
 *
 * `next-themes` persists the selected theme in localStorage (key: "theme")
 * and applies the `dark` class to <html> before hydration, so there is no
 * flash of the wrong theme on reload.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // The active theme is only known on the client. Waiting for mount keeps
  // server and client markup identical (no hydration mismatch).
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"
  const label = isDark ? "Switch to light mode" : "Switch to dark mode"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon-lg" }),
        className
      )}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
