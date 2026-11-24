import {
  createEquipment,
  getCurrentOwner,
  listEquipment,
  type EquipmentInput,
} from "@/lib/owner-equipment"

/** GET /api/owner/equipment - all equipment owned by the logged-in owner. */
export async function GET() {
  console.log("[Owner API] GET /api/owner/equipment")
  const owner = getCurrentOwner()
  const equipment = listEquipment(owner.id)
  return Response.json({ owner, equipment })
}

/** POST /api/owner/equipment - add a new listing (status starts as Pending). */
export async function POST(request: Request) {
  console.log("[Owner API] POST /api/owner/equipment - started")

  try {
    const body = (await request.json()) as Partial<EquipmentInput>
    console.log("[Owner API] received payload", body.name)

    if (
      !body.name?.trim() ||
      !body.category ||
      Number(body.rentalPrice) <= 0
    ) {
      console.warn("[Owner API] validation failed", body)
      return Response.json(
        { error: "Name, category and a valid rental price are required." },
        { status: 400 }
      )
    }

    const input: EquipmentInput = {
      name: body.name.trim(),
      description: body.description ?? "",
      category: body.category,
      location: body.location ?? "",
      rentalPrice: Number(body.rentalPrice),
      rentalType: body.rentalType ?? "Daily",
      availableQuantity: Number(body.availableQuantity ?? 1),
      condition: body.condition ?? "Good",
      brand: body.brand ?? "",
      model: body.model ?? "",
      image: body.image ?? "",
      terms: body.terms ?? "",
    }

    const owner = getCurrentOwner()
    const equipment = createEquipment(input, owner)
    console.log("[Owner API] POST finished - created", equipment.id)

    return Response.json({ equipment }, { status: 201 })
  } catch (error) {
    console.error("[Owner API] POST failed", error)
    return Response.json({ error: "Could not save the equipment." }, { status: 500 })
  }
}
