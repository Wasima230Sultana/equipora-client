"use client"

import { useCallback, useEffect, useState } from "react"

import { useSessionUser } from "@/hooks/use-session-user"
import { ownerApiClient } from "@/lib/owner-api-client"
import type { Equipment, OwnerInfo, OwnerRental } from "@/lib/owner-equipment"

/**
 * Client hooks for the owner workspace.
 * They read the signed-in user id from the auth session and call the
 * equipora-server API client. No backend logic lives in this file.
 */

export function useOwnerId() {
  const { userId, role, isPending } = useSessionUser()
  const ownerId = role === "owner" ? userId : ""
  console.log("[Owner UI] session owner id:", ownerId || "none")
  return { ownerId, isPending, isOwner: Boolean(ownerId) }
}

export function useOwnerInfo(ownerId: string) {
  const [owner, setOwner] = useState<OwnerInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ownerId) return
    let cancelled = false
    console.log("[Owner UI] loading owner from backend", ownerId)
    setLoading(true)

    ownerApiClient
      .getOwner(ownerId)
      .then((result) => {
        if (!cancelled) setOwner(result.owner)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("[Owner UI] owner load failed", error)
          setError(error instanceof Error ? error.message : "Could not load owner")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [ownerId])

  return { owner, loading, error }
}

export function useOwnerEquipment(ownerId: string) {
  const [rows, setRows] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!ownerId) return
    console.log("[Owner UI] loading equipment from backend", ownerId)
    setLoading(true)
    try {
      const result = await ownerApiClient.listEquipment(ownerId)
      setRows(result.equipment)
      console.log("[Owner UI] equipment loaded", result.equipment.length)
    } catch (error) {
      console.error("[Owner UI] equipment load failed", error)
      setError(error instanceof Error ? error.message : "Could not load equipment")
    } finally {
      setLoading(false)
    }
  }, [ownerId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { rows, loading, error, refresh }
}

export function useOwnerRentals(ownerId: string) {
  const [rows, setRows] = useState<OwnerRental[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ownerId) return
    let cancelled = false
    console.log("[Owner UI] loading rentals from backend", ownerId)
    setLoading(true)

    ownerApiClient
      .listRentals(ownerId)
      .then((result) => {
        if (!cancelled) {
          setRows(result.rentals)
          console.log("[Owner UI] rentals loaded", result.rentals.length)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("[Owner UI] rentals load failed", error)
          setError(error instanceof Error ? error.message : "Could not load rentals")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [ownerId])

  return { rows, loading, error }
}
