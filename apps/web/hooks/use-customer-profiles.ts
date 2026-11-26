"use client"

import { useEffect, useState } from "react"

import { profileApiClient } from "@/lib/profile-api-client"
import type { UserProfile } from "@/lib/profile-data"

type CustomerProfiles = Record<string, UserProfile>

/**
 * Loads customer profiles for the user ids referenced by a list of rentals.
 * Profiles are keyed by id so each row can look up its customer instantly.
 */
export function useCustomerProfiles(customerIds: string[]) {
  const [profiles, setProfiles] = useState<CustomerProfiles>({})

  // A string key keeps the effect stable even when the ids array is rebuilt
  // on every render, so profiles are fetched only when the ids actually change.
  const idsKey = [...new Set(customerIds)].sort().join(",")

  useEffect(() => {
    const ids = idsKey ? idsKey.split(",") : []
    if (ids.length === 0) {
      setProfiles({})
      return
    }

    let cancelled = false

    void Promise.all(
      ids.map(async (id) => {
        try {
          const { profile } = await profileApiClient.getProfile(id)
          return [id, profile] as const
        } catch {
          // Keep the rest of the profiles if one lookup fails.
          return null
        }
      })
    ).then((results) => {
      if (cancelled) return
      const next: CustomerProfiles = {}
      for (const result of results) {
        if (result) next[result[0]] = result[1]
      }
      setProfiles(next)
    })

    return () => {
      cancelled = true
    }
  }, [idsKey])

  return profiles
}
