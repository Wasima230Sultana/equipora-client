import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { adminEquipment } from "@/lib/dashboard-data"

export type EquipmentRow = (typeof adminEquipment)[number]

const columns: DataTableColumn<EquipmentRow>[] = [
  {
    key: "name",
    header: "Equipment",
    render: (row) => (
      <div>
        <p className="font-medium">{row.name}</p>
        <p className="text-xs text-muted-foreground">{row.id}</p>
      </div>
    ),
  },
  { key: "category", header: "Category", render: (row) => row.category },
  { key: "owner", header: "Owner", render: (row) => row.owner },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  { key: "price", header: "Price", render: (row) => row.price },
]

/** Shared listing table for admin and owner equipment screens. */
export function EquipmentTable({ rows }: { rows: EquipmentRow[] }) {
  return <DataTable columns={columns} rows={rows} />
}
