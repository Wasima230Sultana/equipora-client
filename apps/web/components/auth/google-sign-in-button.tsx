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
      const result = await signIn.social({
        provider: "google",
        callbackURL,
        errorCallbackURL: "/sign-in",
      })

      if (result.error) {
        toast.error("Google sign-in failed", {
          description: result.error.message || "Please try again.",
        })
        return
      }

      // Better Auth normally redirects automatically. Do it explicitly as well
      // so the button still works if that redirect hook is unavailable.
      const url = result.data?.url
      if (url) window.location.assign(url)
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
