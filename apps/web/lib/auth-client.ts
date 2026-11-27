import { createAuthClient } from "better-auth/react"
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins"

import type { auth } from "@/lib/auth"

// BETTER_AUTH_URL is a server-only env var, so in the browser it is undefined.
// Fall back to the current origin there to keep OAuth callbacks on the right host.

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL ,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
})

export const { signIn, signUp, signOut, useSession } = authClient
