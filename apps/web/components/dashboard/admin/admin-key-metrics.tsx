import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import type { AdminMetric } from "@/lib/admin-analytics"

/** Shared key-metrics panel for admin reporting screens. */
export function AdminKeyMetrics({ metrics }: { metrics: AdminMetric[] }) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="text-base">Key metrics</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-2">
        {metrics.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No metrics available yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {metrics.map((item) => (
              <li key={item.label} className="py-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
                <p className="mt-1 text-xl font-semibold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.change}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
