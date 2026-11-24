/** Account roles offered during registration. */
export const roles = ["customer", "owner", "admin"] as const

export type UserRole = (typeof roles)[number]

export const roleOptions: {
  value: UserRole
  label: string
  description: string
}[] = [
  {
    value: "customer",
    label: "Customer",
    description: "Rent equipment for your projects.",
  },
  {
    value: "owner",
    label: "Equipment owner",
    description: "List and manage your own machines.",
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage the Equipora platform.",
  },
]

export const defaultRole: UserRole = "customer"
