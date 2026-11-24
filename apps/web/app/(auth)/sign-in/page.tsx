import type { Metadata } from "next"

import { AuthShell } from "@/components/auth/auth-shell"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign in | Equipora",
  description: "Sign in to your Equipora account.",
}

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to continue to your Equipora account."
    >
      <SignInForm />
    </AuthShell>
  )
}
