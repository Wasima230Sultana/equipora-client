import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { ProfileForm } from "@/components/profile/profile-form"

/** Profile screen shared by Customer, Owner and Admin accounts. */
export default function DashboardProfilePage() {
  return (
    <DashboardPage
      title="My Profile"
      description="Update your personal information."
    >
      <div className="max-w-3xl">
        <ProfileForm />
      </div>
    </DashboardPage>
  )
}
