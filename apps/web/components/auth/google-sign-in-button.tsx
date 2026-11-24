"use client"

import { useState } from "react"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { signIn } from "@/lib/auth-client"
import { GoogleIcon } from "@/components/ui/google-icon"

type GoogleSignInButtonProps = {
  label?: string
  callbackURL?: string
}

/** Shared Google OAuth button for sign-up and sign-in pages. */
export function GoogleSignInButton({
  label = "Continue with Google",
  callbackURL = "/",
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const { error } = await signIn.social({ provider: "google", callbackURL })
      if (error) {
        toast.error("Google sign-in failed", {
          description: error.message || "Please try again.",
        })
      }
    } catch (error) {
      toast.error("Google sign-in failed", {
        description: error instanceof Error ? error.message : undefined,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="h-11 w-full"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <GoogleIcon className="size-4" />
      )}
      {label}
    </Button>
  )
}
