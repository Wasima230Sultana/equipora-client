import { DashboardPage } from "@/components/dashboard/dashboard-page"

/** Shown while an admin screen and its backend data are loading. */
export default function AdminLoading() {
  return (
    <DashboardPage
      title="Loading admin workspace…"
      description="Fetching the latest data from the backend."
    >
      <div className="space-y-4">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-72 animate-pulse rounded-2xl border border-border bg-muted/40" />
      </div>
    </DashboardPage>
  )
}
