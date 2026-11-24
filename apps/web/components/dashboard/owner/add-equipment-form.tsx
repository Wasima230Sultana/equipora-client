"use client"

import { useEffect, useState } from "react"
import { LoaderCircle, Save, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { PhotoField } from "@/components/auth/photo-field"
import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  FormField,
  SelectInput,
  TextArea,
} from "@/components/dashboard/owner/form-controls"
import {
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_CONDITIONS,
  RENTAL_TYPES,
  emptyEquipmentInput,
  equipmentToInput,
  type Equipment,
  type EquipmentInput,
  type OwnerInfo,
} from "@/lib/owner-equipment"

type AddEquipmentFormProps = {
  owner: OwnerInfo
  /** Pass an item to reuse this form for the Update action. */
  initialEquipment?: Equipment
  onSaved?: () => void
  onCancel?: () => void
}

/**
 * One form for both "Add Equipment" and "Update Equipment".
 * It posts to the demo API; replace the fetch URLs with a real backend later.
 */
export function AddEquipmentForm({
  owner,
  initialEquipment,
  onSaved,
  onCancel,
}: AddEquipmentFormProps) {
  const [form, setForm] = useState<EquipmentInput>(() =>
    initialEquipment ? equipmentToInput(initialEquipment) : { ...emptyEquipmentInput }
  )
  const [saving, setSaving] = useState(false)
  const editingId = initialEquipment?.id

  useEffect(() => {
    console.log(
      "[Owner UI] equipment form mounted",
      editingId ? `editing ${editingId}` : "create mode"
    )
  }, [editingId])

  /** Update one field without touching the rest of the form. */
  function setValue<K extends keyof EquipmentInput>(
    key: K,
    value: EquipmentInput[K]
  ) {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("[Owner UI] submit clicked for", form.name)

    const isValid =
      form.name.trim() !== "" &&
      form.category !== "" &&
      form.location.trim() !== "" &&
      form.rentalPrice > 0 &&
      form.availableQuantity >= 0
    if (!isValid) {
      console.warn("[Owner UI] validation failed - required fields missing")
      toast.error("Please complete the required fields with valid values")
      return
    }

    setSaving(true)
    try {
      const url = editingId
        ? `/api/owner/equipment/${editingId}`
        : "/api/owner/equipment"
      console.log("[Owner UI] sending", editingId ? "PATCH" : "POST", url)

      const response = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error ?? "The request could not be completed.")
      }

      console.log("[Owner UI] save succeeded", result.equipment?.id)
      toast.success(
        editingId ? "Equipment updated" : "Equipment submitted for review",
        {
          description: editingId
            ? "Your changes have been saved."
            : `${form.name} will appear after admin approval.`,
        }
      )

      if (!editingId) setForm({ ...emptyEquipmentInput })
      onSaved?.()
    } catch (error) {
      console.error("[Owner UI] save failed", error)
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
      <FormField label="Equipment Name" htmlFor="equipment-name" required>
        <Input
          id="equipment-name"
          name="name"
          value={form.name}
          onChange={(event) => setValue("name", event.target.value)}
          placeholder="CAT 320 Excavator"
          className="h-11"
          required
        />
      </FormField>

      <FormField label="Category" htmlFor="equipment-category" required>
        <SelectInput
          id="equipment-category"
          name="category"
          value={form.category}
          onChange={(event) => setValue("category", event.target.value)}
          required
        >
          <option value="">Select a category</option>
          {EQUIPMENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <FormField label="Brand" htmlFor="equipment-brand">
        <Input
          id="equipment-brand"
          name="brand"
          value={form.brand}
          onChange={(event) => setValue("brand", event.target.value)}
          placeholder="Caterpillar"
          className="h-11"
        />
      </FormField>

      <FormField label="Model" htmlFor="equipment-model">
        <Input
          id="equipment-model"
          name="model"
          value={form.model}
          onChange={(event) => setValue("model", event.target.value)}
          placeholder="320 D"
          className="h-11"
        />
      </FormField>

      <FormField label="Location" htmlFor="equipment-location" required>
        <Input
          id="equipment-location"
          name="location"
          value={form.location}
          onChange={(event) => setValue("location", event.target.value)}
          placeholder="Dubai, UAE"
          className="h-11"
          required
        />
      </FormField>

      <FormField label="Rental Price" htmlFor="equipment-price" required>
        <Input
          id="equipment-price"
          name="rentalPrice"
          type="number"
          min={1}
          value={form.rentalPrice || ""}
          onChange={(event) => setValue("rentalPrice", Number(event.target.value))}
          placeholder="420"
          className="h-11"
          required
        />
      </FormField>

      <FormField label="Rental Type" htmlFor="equipment-rental-type" required>
        <SelectInput
          id="equipment-rental-type"
          name="rentalType"
          value={form.rentalType}
          onChange={(event) =>
            setValue(
              "rentalType",
              event.target.value as EquipmentInput["rentalType"]
            )
          }
        >
          {RENTAL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <FormField
        label="Available Quantity"
        htmlFor="equipment-quantity"
        required
      >
        <Input
          id="equipment-quantity"
          name="availableQuantity"
          type="number"
          min={0}
          value={form.availableQuantity}
          onChange={(event) =>
            setValue("availableQuantity", Number(event.target.value))
          }
          className="h-11"
          required
        />
      </FormField>

      <FormField
        label="Equipment Condition"
        htmlFor="equipment-condition"
        required
      >
        <SelectInput
          id="equipment-condition"
          name="condition"
          value={form.condition}
          onChange={(event) =>
            setValue(
              "condition",
              event.target.value as EquipmentInput["condition"]
            )
          }
        >
          {EQUIPMENT_CONDITIONS.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <FormField label="Status" htmlFor="equipment-status">
        <div
          id="equipment-status"
          className="flex h-11 items-center gap-3 rounded-lg border border-input bg-muted/40 px-3"
        >
          <StatusBadge status={initialEquipment?.status ?? "Pending"} />
          <span className="text-xs text-muted-foreground">
            {initialEquipment
              ? "Managed by the admin team"
              : "New listings start as Pending"}
          </span>
        </div>
      </FormField>

      <div className="sm:col-span-2">
        <PhotoField
          id="equipment-image"
          value={form.image}
          onChange={(url) => {
            console.log("[Owner UI] image value changed", url ? "set" : "cleared")
            setValue("image", url)
          }}
        />
      </div>

      <FormField
        label="Description"
        htmlFor="equipment-description"
        className="sm:col-span-2"
      >
        <TextArea
          id="equipment-description"
          name="description"
          value={form.description}
          onChange={(event) => setValue("description", event.target.value)}
          placeholder="Describe the machine, its capacity and what it is best used for..."
        />
      </FormField>

      <FormField
        label="Rental Terms and Conditions"
        htmlFor="equipment-terms"
        className="sm:col-span-2"
      >
        <TextArea
          id="equipment-terms"
          name="terms"
          value={form.terms}
          onChange={(event) => setValue("terms", event.target.value)}
          placeholder="Minimum rental period, fuel policy, deposit, operator requirements..."
        />
      </FormField>

      <div className="rounded-xl border border-border bg-muted/40 p-4 sm:col-span-2">
        <p className="text-sm font-semibold">Owner Information</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <p>
            <span className="text-muted-foreground">Name: </span>
            {owner.name}
          </p>
          <p>
            <span className="text-muted-foreground">Email: </span>
            {owner.email}
          </p>
          <p>
            <span className="text-muted-foreground">Phone: </span>
            {owner.phone}
          </p>
          <p>
            <span className="text-muted-foreground">Company: </span>
            {owner.company}
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Filled automatically from your account.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <Button type="submit" size="lg" className="h-11" disabled={saving}>
          {saving ? (
            <LoaderCircle className="animate-spin" />
          ) : editingId ? (
            <Save />
          ) : null}
          {saving
            ? "Saving..."
            : editingId
              ? "Save changes"
              : "Submit for review"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11"
            onClick={() => {
              console.log("[Owner UI] form cancelled")
              onCancel()
            }}
          >
            <X />
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
