import type { Metadata } from "next"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ProfileForm } from "@/components/profile/profile-form"

export const metadata: Metadata = {
  title: "Your profile | Equipora",
  description: "Update your Equipora account details.",
}

export default function ProfilePage() {
  return (
    <main className="bg-background py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Account"
            title="Your profile"
            description="Manage your name and profile picture."
          />
          <div className="mt-10">
            <ProfileForm />
          </div>
        </div>
      </Container>
    </main>
  )
}
