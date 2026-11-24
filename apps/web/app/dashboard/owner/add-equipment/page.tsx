import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { AddEquipmentForm } from "@/components/dashboard/owner/add-equipment-form"
import { getCurrentOwner } from "@/lib/owner-equipment"

// Demo data can change, so render on every request instead of at build time.
export const dynamic = "force-dynamic"

export default function AddEquipmentPage() {
  const owner = getCurrentOwner()
  console.log("[Owner Page] rendering Add Equipment")

  return (
    <DashboardPage
      title="Add Equipment"
      description="List a machine and start earning from it."
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <AddEquipmentForm owner={owner} />
      </div>
    </DashboardPage>
  )
}
