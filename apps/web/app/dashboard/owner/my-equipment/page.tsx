"use client"

import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { MyEquipmentTable } from "@/components/dashboard/owner/my-equipment-table"
import { useOwnerId, useOwnerInfo } from "@/hooks/use-owner-data"

export default function MyEquipmentPage() {
  const { ownerId, isPending } = useOwnerId()
  const { owner, loading, error } = useOwnerInfo(ownerId)

  return (
    <DashboardPage
      title="My Equipment"
      description="Manage the machines you have listed."
    >
      {isPending || loading ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
          Loading your owner details from the backend...
        </div>
      ) : error || !owner ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
          {error ?? "Please sign in as an owner to manage equipment."}
        </div>
      ) : (
        <MyEquipmentTable owner={owner} ownerId={ownerId} />
      )}
    </DashboardPage>
  )
}
