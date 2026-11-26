"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { LoaderCircle, Upload } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Avatar } from "@/components/ui/avatar"

const MAX_IMAGE_BYTES = 32 * 1024 * 1024 // ImgBB's free upload limit

type PhotoFieldProps = {
  value: string
  onChange: (url: string) => void
  id?: string
  /** Used for the preview's alt text and initials fallback. */
  name?: string
}

/**
 * Photo URL field with ImgBB upload and a live preview.
 * Shared by the sign-up form and the profile form.
 */
export function PhotoField({
  value,
  onChange,
  id = "photo",
  name = "",
}: PhotoFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file")
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Image must be smaller than 32 MB")
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
    if (!apiKey) {
      toast.error("ImgBB upload is not configured", {
        description: "Paste a direct image link instead.",
      })
      return
    }

    setUploading(true)
    try {
      const body = new FormData()
      body.append("image", file)
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
        { method: "POST", body }
      )
      const result = await response.json()
      const url = result?.data?.display_url ?? result?.data?.url

      if (!response.ok || !url) {
        throw new Error(result?.error?.message ?? "Upload failed. Please try again.")
      }

      onChange(url)
      toast.success("Photo uploaded successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Photo</Label>
      <div className="flex items-start gap-3">
        <Avatar
          src={value}
          name={name}
          className="size-12 rounded-xl border border-border"
        />
        <div className="flex min-w-0 flex-1 gap-2">
          <Input
            id={id}
            type="url"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Paste a direct image link"
            className="h-11"
          />
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11 shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <LoaderCircle className="animate-spin" /> : <Upload />}
            Upload
          </Button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
      <p className="text-xs text-muted-foreground">
        Upload an image (max 32 MB) to ImgBB, or paste a direct image link.
      </p>
    </div>
  )
}
