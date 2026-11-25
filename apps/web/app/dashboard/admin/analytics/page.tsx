"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { AdminDataStatus } from "@/components/dashboard/admin/admin-data-status"
import { AdminKeyMetrics } from "@/components/dashboard/admin/admin-key-metrics"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import { useAdminAnalytics, useAdminId } from "@/hooks/use-admin-data"
import { adminSummaryMetrics, adminSummaryStats } from "@/lib/admin-analytics"

export default function AnalyticsPage() {
  const { adminId } = useAdminId()
  const { summary, loading, error } = useAdminAnalytics(adminId)
  const stats = adminSummaryStats(summary)
  const metrics = adminSummaryMetrics(summary)
  const hasRevenue = summary.monthlyRevenue.some((month) => month.amount > 0)

  return (
    <DashboardPage
      title="Analytics"
      description="A snapshot of marketplace performance."
    >
      <AdminDataStatus
        loading={loading}
        error={error}
        count={summary.totalBookings}
        label="bookings analysed"
      />

      {!loading && !error && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {hasRevenue ? (
                <RevenueChart
                  data={summary.monthlyRevenue}
                  title="Revenue from paid bookings"
                />
              ) : (
                <Card className="gap-0 py-0">
                  <CardHeader className="border-b border-border px-6 py-5">
                    <CardTitle className="text-base">Monthly revenue</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 py-8 text-sm text-muted-foreground">
                    No paid bookings have been recorded yet.
                  </CardContent>
                </Card>
              )}
            </div>

            <AdminKeyMetrics metrics={metrics} />
          </div>
        </div>
      )}
    </DashboardPage>
  )
}
