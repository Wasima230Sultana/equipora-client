import { Badge } from "@workspace/ui/components/badge"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { users } from "@/lib/dashboard-data"

type UserRow = (typeof users)[number]

const columns: DataTableColumn<UserRow>[] = [
  {
    key: "name",
    header: "User",
    render: (row) => (
      <div>
        <p className="font-medium">{row.name}</p>
        <p className="text-xs text-muted-foreground">{row.email}</p>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (row) => <Badge variant="secondary">{row.role}</Badge>,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  { key: "joined", header: "Joined", render: (row) => row.joined },
  { key: "id", header: "ID", render: (row) => row.id },
]

export default function UsersPage() {
  return (
    <DashboardPage
      title="All Users"
      description="Review everyone with an Equipora account."
    >
      <DataTable columns={columns} rows={users} />
    </DashboardPage>
  )
}
