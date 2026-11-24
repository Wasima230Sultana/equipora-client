import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import { analytics, dashboardStats, earnings } from "@/lib/dashboard-data"

export default function AnalyticsPage() {
  return (
    <DashboardPage
      title="Analytics"
      description="A snapshot of marketplace performance."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.admin.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={earnings} />
        </div>

        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border px-6 py-5">
            <CardTitle className="text-base">Key metrics</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-2">
            <ul className="divide-y divide-border">
              {analytics.map((item) => (
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
          </CardContent>
        </Card>
      </div>
    </DashboardPage>
  )
}
