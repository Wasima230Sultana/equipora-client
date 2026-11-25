"use client"

import { useCallback, useEffect, useState } from "react"

import { visibleEquipment } from "@/lib/browse-equipment"
import { customerApiClient } from "@/lib/customer-api-client"
import type { CustomerRental } from "@/lib/customer-data"
import type { Equipment } from "@/lib/owner-equipment"

/** Customer bookings loaded from equipora-server. */
export function useCustomerRentals(customerId: string) {
  const [rows, setRows] = useState<CustomerRental[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!customerId) return
    let cancelled = false
    console.log("[Customer UI] loading rentals", customerId)
    setLoading(true)

    customerApiClient
      .listRentals(customerId)
      .then((result) => {
        if (!cancelled) {
          setRows(result.rentals)
          console.log("[Customer UI] rentals loaded", result.rentals.length)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("[Customer UI] rentals failed", error)
          setError(error instanceof Error ? error.message : "Could not load rentals")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [customerId])

  return { rows, loading, error }
}

/** Customer favorites loaded from equipora-server, with refresh after removal. */
export function useCustomerFavorites(customerId: string) {
  const [rows, setRows] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!customerId) return
    console.log("[Customer UI] loading favorites", customerId)
    setLoading(true)
    try {
      const result = await customerApiClient.listFavorites(customerId)
      setRows(visibleEquipment(result.favorites))
      console.log("[Customer UI] favorites loaded", result.favorites.length)
    } catch (error) {
      console.error("[Customer UI] favorites failed", error)
      setError(error instanceof Error ? error.message : "Could not load favorites")
    } finally {
      setLoading(false)
    }
  }, [customerId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { rows, loading, error, refresh }
}
