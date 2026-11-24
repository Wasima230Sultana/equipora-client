import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

type RevenueChartProps = {
  data: { month: string; amount: number }[]
  title?: string
}

/** Simple CSS bar chart shared by analytics and earnings screens. */
export function RevenueChart({
  data,
  title = "Monthly revenue",
}: RevenueChartProps) {
  const max = Math.max(...data.map((item) => item.amount), 1)

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-6">
        <div className="flex h-52 items-end gap-3">
          {data.map((item) => (
            <div
              key={item.month}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="flex h-40 w-full items-end">
                <div
                  className="w-full rounded-t-lg bg-primary/85 transition-all hover:bg-primary"
                  style={{ height: `${(item.amount / max) * 100}%` }}
                  title={`$${item.amount.toLocaleString()}`}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
