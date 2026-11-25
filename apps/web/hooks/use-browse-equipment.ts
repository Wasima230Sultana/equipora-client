"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { browseApiClient } from "@/lib/browse-api-client"
import type { Equipment } from "@/lib/owner-equipment"

/** Approved equipment for the current backend query (search/filter/sort). */
export function useBrowseEquipment(query: string) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef(0)

  const refresh = useCallback(async () => {
    const requestId = ++requestIdRef.current
    setLoading(true)
    setError(null)
    try {
      const result = await browseApiClient.list(query)
      if (requestId === requestIdRef.current) setEquipment(result.equipment)
    } catch (error) {
      if (requestId === requestIdRef.current) {
        setError(error instanceof Error ? error.message : "Could not load equipment")
      }
    } finally {
      if (requestId === requestIdRef.current) setLoading(false)
    }
  }, [query])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { equipment, loading, error, refresh }
}

/** Approved listings for the homepage, limited by the backend. */
export function useFeaturedEquipment(limit = 6) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    browseApiClient
      .featured(limit)
      .then((result) => {
        if (!cancelled) setEquipment(result.equipment)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setError(error instanceof Error ? error.message : "Could not load featured equipment")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [limit])

  return { equipment, loading, error }
}

/** One listing for the signed-in details page; not fetched while locked. */
export function useEquipmentDetails(id: string, enabled: boolean) {
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || !id) return
    let cancelled = false
    setLoading(true)
    setError(null)
    console.log("[Browse UI] loading equipment details", id)

    browseApiClient
      .getById(id)
      .then((result) => {
        if (!cancelled) setEquipment(result.equipment)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setError(error instanceof Error ? error.message : "Could not load details")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, enabled])

  return { equipment, loading, error }
}
