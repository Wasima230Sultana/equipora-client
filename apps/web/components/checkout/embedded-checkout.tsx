"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import type { StripeEmbeddedCheckout } from "@stripe/stripe-js"

import { buttonVariants } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { getStripeClient } from "@/lib/stripe-client"

/** Reusable Stripe Checkout panel mounted with the browser publishable key. */
export function EmbeddedCheckout({
  sessionId,
  clientSecret,
}: {
  sessionId: string
  clientSecret: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let checkout: StripeEmbeddedCheckout | undefined
    let cancelled = false

    async function mountCheckout() {
      try {
        const stripe = await getStripeClient()
        const container = containerRef.current
        if (!stripe || !container || cancelled) {
          throw new Error("Stripe could not be loaded. Please try again.")
        }
        if (typeof stripe.createEmbeddedCheckoutPage !== "function") {
          throw new Error("Embedded Checkout is not available in Stripe.js.")
        }

        checkout = await stripe.createEmbeddedCheckoutPage({ clientSecret })
        if (!cancelled) checkout.mount(container)
      } catch (error) {
        if (!cancelled) {
          setError(error instanceof Error ? error.message : "Could not load checkout.")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void mountCheckout()
    return () => {
      cancelled = true
      checkout?.destroy()
    }
  }, [clientSecret])

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="text-base">Secure checkout</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-6">
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <>
            {loading && (
              <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Loading secure checkout…
              </p>
            )}
            <div ref={containerRef} />
          </>
        )}

        <Link
          href={`/checkout/cancel?session_id=${encodeURIComponent(sessionId)}`}
          className={buttonVariants({ variant: "ghost", className: "mt-4 w-full" })}
        >
          Cancel and go back
        </Link>
      </CardContent>
    </Card>
  )
}
