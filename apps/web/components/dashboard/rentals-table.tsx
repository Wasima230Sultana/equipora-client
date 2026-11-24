import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"

export type RentalRow = {
  id: string
  equipment: string
  period: string
  status: string
  amount: string
  customer?: string
}

type RentalsTableProps = {
  rows: RentalRow[]
  /** Show the customer column for admin / owner views. */
  showCustomer?: boolean
}

/** Shared rentals table for admin, owner and customer screens. */
export function RentalsTable({
  rows,
  showCustomer = false,
}: RentalsTableProps) {
  const columns: DataTableColumn<RentalRow>[] = [
    {
      key: "equipment",
      header: "Equipment",
      render: (row) => (
        <div>
          <p className="font-medium">{row.equipment}</p>
          <p className="text-xs text-muted-foreground">{row.id}</p>
        </div>
      ),
    },
    ...(showCustomer
      ? [
          {
            key: "customer",
            header: "Customer",
            render: (row: RentalRow) => row.customer ?? "—",
          },
        ]
      : []),
    { key: "period", header: "Period", render: (row) => row.period },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "amount", header: "Amount", render: (row) => row.amount },
  ]

  return <DataTable columns={columns} rows={rows} />
}
