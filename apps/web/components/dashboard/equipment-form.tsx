"use client"

import { useState, type FormEvent } from "react"
import { LoaderCircle, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { PhotoField } from "@/components/auth/photo-field"

/** Demo listing form: validates input and confirms with a toast. */
export function EquipmentForm() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !category.trim() || !price.trim()) {
      toast.error("Please complete the required fields")
      return
    }

    setSaving(true)
    try {
      // Dummy submit – connect this to your listings API when available.
      await new Promise((resolve) => setTimeout(resolve, 600))
      toast.success("Equipment submitted for review", {
        description: `${name.trim()} will appear once approved.`,
      })
      setName("")
      setCategory("")
      setLocation("")
      setPrice("")
      setPhoto("")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="gap-0 py-0">
      <CardContent className="px-6 py-6">
        <form
          onSubmit={handleSubmit}
          className="grid gap-5 sm:grid-cols-2"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="equipment-name">Equipment name</Label>
            <Input
              id="equipment-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="CAT 320 Excavator"
              className="h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="equipment-category">Category</Label>
            <Input
              id="equipment-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Excavators"
              className="h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="equipment-location">Location</Label>
            <Input
              id="equipment-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Dubai, UAE"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="equipment-price">Price per day</Label>
            <Input
              id="equipment-price"
              type="number"
              min={1}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="420"
              className="h-11"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <PhotoField value={photo} onChange={setPhoto} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="h-11" disabled={saving}>
              {saving ? <LoaderCircle className="animate-spin" /> : <Plus />}
              {saving ? "Submitting..." : "Submit for review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
