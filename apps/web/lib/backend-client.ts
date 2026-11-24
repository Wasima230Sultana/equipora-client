/**
 * Shared frontend HTTP helper for the separate equipora-server backend.
 * Used by owner, customer and profile API clients.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_EQUIPORA_SERVER_URL ?? "http://localhost:5000"

export async function apiRequest<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  console.log("[Backend Client]", init?.method ?? "GET", path)
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...init?.headers },
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error ?? "The backend request failed.")
  }
  console.log("[Backend Client] success", path)
  return result as T
}
