import { cn } from "@workspace/ui/lib/utils"

/** One label/value line reused by the booking form and the receipt. */
export function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className={cn("text-muted-foreground", strong && "text-foreground")}>
        {label}
      </span>
      <span className={cn("text-right", strong && "font-semibold")}>
        {value || "—"}
      </span>
    </div>
  )
}

/** Price breakdown shared by the booking form and the payment success page. */
export function BookingSummary({
  days,
  rate,
  quantity,
  total,
  paid = false,
}: {
  days: number
  rate: number
  quantity: number
  total: number
  paid?: boolean
}) {
  return (
    <div className="space-y-1 rounded-xl bg-muted p-4 text-sm">
      <SummaryRow label="Rental period" value={`${days} day(s)`} />
      <SummaryRow label="Rate" value={`$${rate.toLocaleString()}`} />
      <SummaryRow label="Quantity" value={`${quantity}`} />
      <div className="border-t border-border pt-2">
        <SummaryRow
          label={paid ? "Amount paid" : "Estimated total"}
          value={`$${total.toLocaleString()}`}
          strong
        />
      </div>
    </div>
  )
}
