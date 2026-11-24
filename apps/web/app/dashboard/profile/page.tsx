import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { ProfileForm } from "@/components/profile/profile-form"

export default function DashboardProfilePage() {
  return (
    <DashboardPage
      title="My Profile"
      description="Update your name and profile picture."
    >
      <div className="max-w-2xl">
        <ProfileForm />
      </div>
    </DashboardPage>
  )
}
