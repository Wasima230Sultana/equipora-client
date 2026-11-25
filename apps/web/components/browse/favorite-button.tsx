"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { customerApiClient } from "@/lib/customer-api-client"

/** Add/remove favorite for the signed-in user on the details page. */
export function FavoriteButton({
  userId,
  equipmentId,
}: {
  userId: string
  equipmentId: string
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    customerApiClient
      .isFavorite(userId, equipmentId)
      .then((result) => {
        if (!cancelled) setIsFavorite(result.isFavorite)
      })
      .catch((error: unknown) => {
        if (!cancelled) console.error("[Browse UI] favorite lookup failed", error)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [userId, equipmentId])

  async function toggleFavorite() {
    setSaving(true)
    try {
      if (isFavorite) {
        await customerApiClient.removeFavorite(userId, equipmentId)
        setIsFavorite(false)
        toast.success("Removed from favorites")
      } else {
        await customerApiClient.addFavorite(userId, equipmentId)
        setIsFavorite(true)
        toast.success("Added to favorites")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update favorites")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={() => void toggleFavorite()}
      disabled={loading || saving}
    >
      <Heart className={isFavorite ? "fill-rose-500 text-rose-500" : ""} />
      {isFavorite ? "Saved to favorites" : "Add to favorites"}
    </Button>
  )
}
