"use client"

import { useEffect } from "react"

import { Button } from "@workspace/ui/components/button"
import { DashboardPage } from "@/components/dashboard/dashboard-page"

/** Error boundary for every admin screen, with a retry action. */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[Admin UI] screen failed", error)
  }, [error])

  return (
    <DashboardPage
      title="Something went wrong"
      description="The admin workspace could not be loaded."
    >
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8">
        <p className="text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button type="button" className="mt-5" onClick={reset}>
          Try again
        </Button>
      </div>
    </DashboardPage>
  )
}
