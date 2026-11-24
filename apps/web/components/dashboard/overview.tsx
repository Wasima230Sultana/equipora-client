"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { useSession } from "@/lib/auth-client"
import { toDashboardRole } from "@/lib/dashboard-nav"
import { dashboardStats, recentActivity } from "@/lib/dashboard-data"
import { StatCard } from "@/components/dashboard/stat-card"

/** Role-aware dashboard landing page. */
export function Overview() {
  const { data: session } = useSession()
  const role = toDashboardRole(session?.user.role)
  const firstName = session?.user.name?.split(" ")[0] ?? "there"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here is what is happening across your workspace today.
          </p>
        </div>
        <Link
          href={
            role === "owner"
              ? "/dashboard/owner/add-equipment"
              : "/dashboard/profile"
          }
          className={buttonVariants({ size: "lg", className: "h-10" })}
        >
          {role === "owner" ? "Add equipment" : "View profile"}
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats[role].map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="gap-0 py-0 lg:col-span-2">
          <CardHeader className="border-b border-border px-6 py-5">
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-2">
            <ul className="divide-y divide-border">
              {recentActivity.map((item) => (
                <li key={item.title} className="flex items-center gap-4 py-4">
                  <span className="size-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border px-6 py-5">
            <CardTitle className="text-base">Quick links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 px-6 py-5">
            <Link href="/dashboard/profile" className={QuickLinkClass}>
              Manage your profile
              <ArrowUpRight className="size-4" />
            </Link>
            <Link href="/dashboard" className={QuickLinkClass}>
              Refresh overview
              <ArrowUpRight className="size-4" />
            </Link>
            <Link href="/" className={QuickLinkClass}>
              Back to website
              <ArrowUpRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const QuickLinkClass =
  "flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
