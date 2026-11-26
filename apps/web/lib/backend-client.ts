/**
 * Shared HTTP helper for the separate equipora-server backend.
 *
 * Auth headers are added by the client / server wrappers in
 * `backend-auth-client.ts` and `backend-auth-server.ts`, which know where the
 * current Better Auth session token comes from. This file only sends it.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_EQUIPORA_SERVER_URL ?? "http://localhost:5000"

export type BackendRequestInit = RequestInit & {
  /** Better Auth session token, sent as `Authorization: Bearer <token>`. */
  token?: string
}

export async function apiRequest<T>(
  path: string,
  { token, ...init }: BackendRequestInit = {}
): Promise<T> {
  console.log("[Backend Client]", init.method ?? "GET", path)

  const headers = new Headers(init.headers)
  headers.set("Content-Type", "application/json")
  if (token) headers.set("Authorization", `Bearer ${token}`)

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(
      result.error ?? result.message ?? "The backend request failed."
    )
  }

  console.log("[Backend Client] success", path)
  return result as T
}
