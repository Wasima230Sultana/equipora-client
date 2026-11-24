import type { ReactNode } from "react"

type DashboardPageProps = {
  title: string
  description: string
  actions?: ReactNode
  children: ReactNode
}

/** Shared page header and spacing for every dashboard screen. */
export function DashboardPage({
  title,
  description,
  actions,
  children,
}: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </div>
  )
}
