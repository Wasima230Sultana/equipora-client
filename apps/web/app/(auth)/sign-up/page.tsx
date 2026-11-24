import type { Metadata } from "next"

import { AuthShell } from "@/components/auth/auth-shell"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Create your account | Equipora",
  description: "Register with Equipora to rent or list construction equipment.",
}

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Join Equipora in a few simple steps."
    >
      <SignUpForm />
    </AuthShell>
  )
}
