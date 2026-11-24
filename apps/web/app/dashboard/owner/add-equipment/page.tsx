"use client"

import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { AddEquipmentForm } from "@/components/dashboard/owner/add-equipment-form"
import { useOwnerId, useOwnerInfo } from "@/hooks/use-owner-data"

export default function AddEquipmentPage() {
  const { ownerId, isPending } = useOwnerId()
  const { owner, loading, error } = useOwnerInfo(ownerId)

  return (
    <DashboardPage
      title="Add Equipment"
      description="List a machine and start earning from it."
    >
      {isPending || loading ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
          Loading your owner details from the backend...
        </div>
      ) : error || !owner ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
          {error ?? "Please sign in as an owner to add equipment."}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <AddEquipmentForm owner={owner} ownerId={ownerId} />
        </div>
      )}
    </DashboardPage>
  )
}
