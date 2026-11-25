"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { SelectInput } from "@/components/dashboard/form-controls"
import { AdminDataStatus } from "@/components/dashboard/admin/admin-data-status"
import { ConfirmDialog } from "@/components/dashboard/admin/confirm-dialog"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/dashboard/data-table"
import { adminApiClient } from "@/lib/admin-api-client"
import { formatDate, userRoles, type AdminUser } from "@/lib/admin-data"

/** All registered users with role changes and account removal. */
export function UsersTable({
  adminId,
  rows,
  loading,
  error,
  onChanged,
}: {
  adminId: string
  rows: AdminUser[]
  loading: boolean
  error: string | null
  onChanged: () => void
}) {
  const [changingId, setChangingId] = useState("")
  const [deleting, setDeleting] = useState<AdminUser | null>(null)
  const [busy, setBusy] = useState(false)

  async function changeRole(user: AdminUser, role: string) {
    setChangingId(user.id)
    try {
      await adminApiClient.changeRole(adminId, user.id, role)
      toast.success("Role updated", { description: `${user.name} is now ${role}.` })
      onChanged()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not change role")
    } finally {
      setChangingId("")
    }
  }

  async function confirmDelete() {
    if (!deleting) return
    setBusy(true)
    try {
      await adminApiClient.deleteUser(adminId, deleting.id)
      toast.success("User removed")
      setDeleting(null)
      onChanged()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not remove user")
    } finally {
      setBusy(false)
    }
  }

  const columns: DataTableColumn<AdminUser>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => <span className="font-medium">{row.name}</span>,
    },
    { key: "email", header: "Email", render: (row) => row.email },
    {
      key: "role",
      header: "Role",
      render: (row) => <Badge variant="secondary">{row.role}</Badge>,
    },
    { key: "joined", header: "Registration date", render: (row) => formatDate(row.createdAt) },
    {
      key: "changeRole",
      header: "Change role",
      render: (row) => (
        <SelectInput
          aria-label={`Change role for ${row.name}`}
          className="h-9 w-32"
          value={row.role}
          disabled={changingId === row.id}
          onChange={(event) => void changeRole(row, event.target.value)}
        >
          {userRoles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </SelectInput>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          title="Remove user"
          aria-label={`Remove ${row.name}`}
          disabled={row.id === adminId}
          onClick={() => setDeleting(row)}
        >
          <Trash2 className="text-destructive" />
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <AdminDataStatus
        loading={loading}
        error={error}
        count={rows.length}
        label="users"
      />
      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="No registered users found."
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Remove user?"
        description={`"${deleting?.name ?? ""}" will be removed from the platform.`}
        busy={busy}
        onConfirm={() => void confirmDelete()}
        onClose={() => setDeleting(null)}
      />
    </div>
  )
}
