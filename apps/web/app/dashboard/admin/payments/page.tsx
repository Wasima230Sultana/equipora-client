import { DashboardPage } from "@/components/dashboard/dashboard-page"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { payments } from "@/lib/dashboard-data"

type PaymentRow = (typeof payments)[number]

const columns: DataTableColumn<PaymentRow>[] = [
  { key: "id", header: "Payment", render: (row) => row.id },
  {
    key: "rental",
    header: "Rental",
    render: (row) => (
      <div>
        <p className="font-medium">{row.rental}</p>
        <p className="text-xs text-muted-foreground">{row.customer}</p>
      </div>
    ),
  },
  { key: "method", header: "Method", render: (row) => row.method },
  { key: "date", header: "Date", render: (row) => row.date },
  {
    key: "amount",
    header: "Amount",
    render: (row) => <span className="font-medium">{row.amount}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
]

export default function PaymentsPage() {
  return (
    <DashboardPage
      title="Payments"
      description="A record of every transaction on Equipora."
    >
      <DataTable columns={columns} rows={payments} />
    </DashboardPage>
  )
}
