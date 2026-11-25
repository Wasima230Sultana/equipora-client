"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { recentUploadsApiClient } from "@/lib/recent-uploads-api-client"
import type { RecentUpload } from "@/lib/recent-uploads"

/**
 * Most recent equipment uploads across the platform. The feed is shared by
 * every dashboard role, so it does not depend on the signed-in user id.
 */
export function useRecentUploads(limit = 4) {
  const [uploads, setUploads] = useState<RecentUpload[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef(0)

  const refresh = useCallback(async () => {
    const requestId = ++requestIdRef.current
    console.log("[Dashboard UI] loading recent uploads from backend")
    setLoading(true)
    setError(null)

    try {
      const result = await recentUploadsApiClient.list(limit)
      if (requestId === requestIdRef.current) setUploads(result.uploads)
    } catch (error) {
      if (requestId === requestIdRef.current) {
        console.error("[Dashboard UI] recent uploads load failed", error)
        setError(
          error instanceof Error
            ? error.message
            : "Could not load recent uploads"
        )
      }
    } finally {
      if (requestId === requestIdRef.current) setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { uploads, loading, error, refresh }
}
