"use client"

import { authClient } from "@/lib/auth-client"
import { apiRequest as request, type BackendRequestInit } from "@/lib/backend-client"

/**
 * Browser-side backend requests.
 * Attaches the signed-in user's session token when a session exists; public
 * endpoints simply ignore the header.
 */
export async function apiRequest<T>(
  path: string,
  init?: BackendRequestInit
): Promise<T> {
  const { data: session } = await authClient.getSession()
  return request<T>(path, {
    ...init,
    token: init?.token ?? session?.session?.token,
  })
}
