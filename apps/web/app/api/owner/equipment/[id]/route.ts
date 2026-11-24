import {
  deleteEquipment,
  getEquipment,
  getCurrentOwner,
  updateEquipment,
  type EquipmentInput,
} from "@/lib/owner-equipment"

// Next.js 16: dynamic route params are async, so we await them.
type RouteContext = { params: Promise<{ id: string }> }

/** GET /api/owner/equipment/:id - full details for one listing. */
export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params
  console.log("[Owner API] GET /api/owner/equipment/", id)

  const owner = getCurrentOwner()
  const equipment = getEquipment(id, owner.id)
  if (!equipment) {
    console.warn("[Owner API] GET - equipment not found", id)
    return Response.json({ error: "Equipment not found." }, { status: 404 })
  }
  return Response.json({ equipment })
}

/** PATCH /api/owner/equipment/:id - update an existing listing. */
export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params
  console.log("[Owner API] PATCH /api/owner/equipment/", id)

  try {
    const patch = (await request.json()) as Partial<EquipmentInput>
    console.log("[Owner API] PATCH fields", Object.keys(patch))

    const owner = getCurrentOwner()
    const equipment = updateEquipment(id, owner.id, patch)
    if (!equipment) {
      console.warn("[Owner API] PATCH - equipment not found", id)
      return Response.json({ error: "Equipment not found." }, { status: 404 })
    }
    console.log("[Owner API] PATCH finished", id)
    return Response.json({ equipment })
  } catch (error) {
    console.error("[Owner API] PATCH failed", error)
    return Response.json({ error: "Could not update the equipment." }, { status: 500 })
  }
}

/** DELETE /api/owner/equipment/:id - remove a listing. */
export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params
  console.log("[Owner API] DELETE /api/owner/equipment/", id)

  const owner = getCurrentOwner()
  const removed = deleteEquipment(id, owner.id)
  if (!removed) {
    console.warn("[Owner API] DELETE - equipment not found", id)
    return Response.json({ error: "Equipment not found." }, { status: 404 })
  }
  console.log("[Owner API] DELETE finished", id)
  return Response.json({ success: true })
}
