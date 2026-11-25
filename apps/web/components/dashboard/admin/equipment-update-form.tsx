"use client"

import { useState, type FormEvent } from "react"
import { Save } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  FormField,
  SelectInput,
} from "@/components/dashboard/form-controls"
import { adminApiClient } from "@/lib/admin-api-client"
import {
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_CONDITIONS,
  RENTAL_TYPES,
  equipmentToInput,
  type Equipment,
  type EquipmentInput,
} from "@/lib/owner-equipment"

/** Compact edit form reused by the All Equipment "Update" action. */
export function EquipmentUpdateForm({
  adminId,
  equipment,
  onSaved,
  onCancel,
}: {
  adminId: string
  equipment: Equipment
  onSaved: () => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<EquipmentInput>(() =>
    equipmentToInput(equipment)
  )
  const [saving, setSaving] = useState(false)

  function setValue<K extends keyof EquipmentInput>(
    key: K,
    value: EquipmentInput[K]
  ) {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.name.trim() || !form.category || form.rentalPrice <= 0) {
      toast.error("Name, category and price are required")
      return
    }

    setSaving(true)
    try {
      await adminApiClient.updateEquipment(adminId, equipment.id, form)
      toast.success("Equipment updated")
      onSaved()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update equipment")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
      <FormField label="Equipment name" htmlFor="admin-eq-name" required>
        <Input
          id="admin-eq-name"
          value={form.name}
          onChange={(event) => setValue("name", event.target.value)}
        />
      </FormField>
      <FormField label="Category" htmlFor="admin-eq-category" required>
        <SelectInput
          id="admin-eq-category"
          value={form.category}
          onChange={(event) => setValue("category", event.target.value)}
        >
          {EQUIPMENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </SelectInput>
      </FormField>
      <FormField label="Location" htmlFor="admin-eq-location">
        <Input
          id="admin-eq-location"
          value={form.location}
          onChange={(event) => setValue("location", event.target.value)}
        />
      </FormField>
      <FormField label="Rental price" htmlFor="admin-eq-price" required>
        <Input
          id="admin-eq-price"
          type="number"
          min="0"
          value={form.rentalPrice}
          onChange={(event) => setValue("rentalPrice", Number(event.target.value))}
        />
      </FormField>
      <FormField label="Rental type" htmlFor="admin-eq-rental-type">
        <SelectInput
          id="admin-eq-rental-type"
          value={form.rentalType}
          onChange={(event) =>
            setValue("rentalType", event.target.value as EquipmentInput["rentalType"])
          }
        >
          {RENTAL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </SelectInput>
      </FormField>
      <FormField label="Available quantity" htmlFor="admin-eq-quantity">
        <Input
          id="admin-eq-quantity"
          type="number"
          min="0"
          value={form.availableQuantity}
          onChange={(event) =>
            setValue("availableQuantity", Number(event.target.value))
          }
        />
      </FormField>
      <FormField label="Condition" htmlFor="admin-eq-condition">
        <SelectInput
          id="admin-eq-condition"
          value={form.condition}
          onChange={(event) =>
            setValue("condition", event.target.value as EquipmentInput["condition"])
          }
        >
          {EQUIPMENT_CONDITIONS.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <div className="flex items-end justify-end gap-2 sm:col-span-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          <Save />
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  )
}
