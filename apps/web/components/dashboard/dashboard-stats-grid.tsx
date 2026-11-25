import { StatCard } from "@/components/dashboard/stat-card"
import type { Stat } from "@/lib/dashboard-data"

/** Shared KPI grid with loading and error states for role dashboards. */
export function DashboardStatsGrid({
  stats,
  loading,
  error,
}: {
  stats: Stat[]
  loading: boolean
  error: string | null
}) {
  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading your stats…</p>
  }
  if (error) {
    return <p className="text-sm text-destructive">{error}</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  )
}
