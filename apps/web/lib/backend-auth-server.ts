import "server-only"

import { headers } from "next/headers"

import { apiRequest as request, type BackendRequestInit } from "@/lib/backend-client"
import { auth } from "@/lib/auth"

/**
 * Server-side backend requests (route handlers / server actions).
 * Reads the session token from the incoming request cookies, never from a body.
 */
export async function serverApiRequest<T>(
  path: string,
  init?: BackendRequestInit
): Promise<T> {
  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  })

  return request<T>(path, {
    ...init,
    token: init?.token ?? session?.session?.token,
  })
}
