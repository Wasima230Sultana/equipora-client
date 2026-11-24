import { Card } from "@workspace/ui/components/card"
import type { Stat } from "@/lib/dashboard-data"

/** Compact KPI card used on every dashboard overview. */
export function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon

  return (
    <Card className="gap-0 rounded-2xl p-5 py-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{stat.label}</p>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-primary dark:bg-brand-900/40 dark:text-brand-200">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight">{stat.value}</p>
      {stat.change && (
        <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
      )}
    </Card>
  )
}
