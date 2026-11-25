"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { useSessionUser } from "@/hooks/use-session-user"
import { adminApiClient } from "@/lib/admin-api-client"
import type { AdminRental, AdminUser } from "@/lib/admin-data"
import type { Equipment } from "@/lib/owner-equipment"

/** Signed-in admin id used by every admin backend call. */
export function useAdminId() {
  const { userId, role, isPending } = useSessionUser()
  const adminId = role === "admin" ? userId : ""
  return { adminId, isAdmin: Boolean(adminId), isPending }
}

/** Generic list loader shared by the three admin tables. */
function useAdminList<T>(
  adminId: string,
  request: (adminId: string) => Promise<{ items: T[] }>
) {
  const [rows, setRows] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef(0)

  const refresh = useCallback(async () => {
    if (!adminId) return
    const requestId = ++requestIdRef.current
    setLoading(true)
    setError(null)
    try {
      const result = await request(adminId)
      if (requestId === requestIdRef.current) setRows(result.items)
    } catch (error) {
      if (requestId === requestIdRef.current) {
        setError(error instanceof Error ? error.message : "Could not load data")
      }
    } finally {
      if (requestId === requestIdRef.current) setLoading(false)
    }
  }, [adminId, request])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { rows, loading, error, refresh }
}

const fetchUsers = (adminId: string) =>
  adminApiClient.listUsers(adminId).then((result) => ({ items: result.users }))

const fetchEquipment = (adminId: string) =>
  adminApiClient
    .listEquipment(adminId)
    .then((result) => ({ items: result.equipment }))

const fetchRentals = (adminId: string) =>
  adminApiClient.listRentals(adminId).then((result) => ({ items: result.rentals }))

export function useAdminUsers(adminId: string) {
  return useAdminList<AdminUser>(adminId, fetchUsers)
}

export function useAdminEquipment(adminId: string) {
  return useAdminList<Equipment>(adminId, fetchEquipment)
}

export function useAdminRentals(adminId: string) {
  return useAdminList<AdminRental>(adminId, fetchRentals)
}
