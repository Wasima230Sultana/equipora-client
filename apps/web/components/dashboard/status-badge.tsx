import type { VariantProps } from "class-variance-authority"

import { Badge, badgeVariants } from "@workspace/ui/components/badge"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

const statusVariants: Record<string, BadgeVariant> = {
  Active: "success",
  Approved: "success",
  Confirmed: "success",
  Paid: "success",
  Completed: "secondary",
  Rented: "warning",
  Pending: "warning",
  Processing: "warning",
  Cancelled: "destructive",
  Failed: "destructive",
  Rejected: "destructive",
  Refunded: "destructive",
}

/** Consistent pill for table statuses. */
export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={statusVariants[status] ?? "outline"}>{status}</Badge>
}
