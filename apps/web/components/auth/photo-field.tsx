"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { LoaderCircle, Upload } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

type PhotoFieldProps = {
  value: string
  onChange: (url: string) => void
  id?: string
}

/** Photo URL field with optional ImgBB upload, reused by sign-up and profile. */
export function PhotoField({ value, onChange, id = "photo" }: PhotoFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

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
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body }
      )
      const result = await response.json()

      if (!response.ok || !result?.data?.url) {
        throw new Error("Upload failed. Please try again.")
      }

      onChange(result.data.url)
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
      <div className="flex gap-2">
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Direct image link or upload to ImgBB.
      </p>
    </div>
  )
}
