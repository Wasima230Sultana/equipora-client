/** Account roles offered during registration. Admin accounts are created by the platform. */
export const roles = ["customer", "owner"] as const

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
]

export const defaultRole: UserRole = "customer"
