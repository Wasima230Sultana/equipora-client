import "server-only"

import Stripe from "stripe"

let client: Stripe | undefined

/** Lazily create the Stripe server client so a missing key gives a clear error. */
export function getStripe(): Stripe {
  if (!client) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is missing. Add it to apps/web/.env.local."
      )
    }
    client = new Stripe(secretKey)
  }
  return client
}
