"use client"

import { useSession } from "@/lib/auth-client"

/** Current signed-in user id/role from the auth session (frontend only). */
export function useSessionUser() {
  const { data: session, isPending } = useSession()
  const user = session?.user
  // console.log("[Session] user id:", user?.id ?? "none")

  return {
    userId: user?.id ?? "",
    role: user?.role ?? "",
    name: user?.name ?? "",
    email: user?.email ?? "",
    isPending,
  }
}
