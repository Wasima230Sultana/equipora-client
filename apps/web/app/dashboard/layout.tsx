import { DashboardShell } from "@/components/dashboard/dashboard-shell"

/** All dashboard screens share the role-aware shell. */
export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>
}
