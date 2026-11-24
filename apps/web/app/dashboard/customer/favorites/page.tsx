import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { EquipmentCard } from "@/components/ui/equipment-card"
import { featuredEquipment } from "@/lib/site-data"

export default function FavoritesPage() {
  return (
    <DashboardPage
      title="Favorites"
      description="Machines you have saved for later."
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {featuredEquipment.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>
    </DashboardPage>
  )
}
