/** Profile data stored in the user collection of equipora-server. */
export type UserProfile = {
  id: string
  name: string
  email: string
  image: string
  phone: string
  address: string
  role: string
}

/** Fields the user is allowed to change. */
export type ProfileInput = Pick<
  UserProfile,
  "name" | "email" | "image" | "phone" | "address"
>
