"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { toast } from "sonner"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { PhotoField } from "@/components/auth/photo-field"
import { Avatar } from "@/components/ui/avatar"
import { FormField, TextArea } from "@/components/dashboard/form-controls"
import { useSessionUser } from "@/hooks/use-session-user"
import { useSession } from "@/lib/auth-client"
import { profileApiClient } from "@/lib/profile-api-client"
import type { ProfileInput, UserProfile } from "@/lib/profile-data"

const emptyForm: ProfileInput = {
  name: "",
  email: "",
  image: "",
  phone: "",
  address: "",
}

/**
 * Shared profile page for Customer, Owner and Admin.
 * Data is read from and saved to the user collection via equipora-server.
 */
export function ProfileForm() {
  const router = useRouter()
  const { userId, isPending } = useSessionUser()
  const { refetch } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [form, setForm] = useState<ProfileInput>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    let cancelled = false
    console.log("[Profile UI] loading profile from backend", userId)
    setLoading(true)

    profileApiClient
      .getProfile(userId)
      .then((result) => {
        if (!cancelled) {
          setProfile(result.profile)
          setForm({
            name: result.profile.name,
            email: result.profile.email,
            image: result.profile.image,
            phone: result.profile.phone,
            address: result.profile.address,
          })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("[Profile UI] profile load failed", error)
          setError(error instanceof Error ? error.message : "Could not load profile")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [userId])

  function setValue(key: keyof ProfileInput, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required")
      return
    }

    setSaving(true)
    try {
      console.log("[Profile UI] saving profile", userId)
      const result = await profileApiClient.updateProfile(userId, {
        name: form.name.trim(),
        email: form.email.trim(),
        image: form.image,
        phone: form.phone,
        address: form.address,
      })
      setProfile(result.profile)
      // Keep the Better Auth session in sync with the database values.
      await refetch()
      router.refresh()
      console.log("[Profile UI] profile saved", result.profile.id)
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("[Profile UI] profile save failed", error)
      toast.error(error instanceof Error ? error.message : "Could not save profile")
    } finally {
      setSaving(false)
    }
  }

  if (isPending || loading) {
    return (
      <Card className="gap-0 py-0">
        <CardContent className="py-10">
          <div className="mx-auto h-40 w-full max-w-md animate-pulse rounded-xl bg-muted" />
        </CardContent>
      </Card>
    )
  }

  if (!userId || error || !profile) {
    return (
      <Card className="gap-0 py-0">
        <CardHeader className="px-7 py-7">
          <CardTitle>Sign in to view your profile</CardTitle>
          <CardDescription>
            {error ?? "You need an account before you can update your details."}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-7 pb-7">
          <Link
            href="/sign-in"
            className={buttonVariants({ size: "lg", className: "h-11" })}
          >
            Sign in
            <ArrowRight />
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-7 py-7">
        <CardTitle>Edit profile</CardTitle>
        <CardDescription>Keep your account details up to date.</CardDescription>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="flex items-center gap-4 rounded-xl bg-muted/60 p-4">
            <Avatar src={form.image} name={form.name} className="size-14" />
            <div>
              <p className="font-medium">{form.name}</p>
              <p className="text-sm text-muted-foreground">{form.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{profile.role}</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Name" htmlFor="profile-name" required>
              <Input
                id="profile-name"
                value={form.name}
                onChange={(event) => setValue("name", event.target.value)}
                autoComplete="name"
                className="h-11"
                required
              />
            </FormField>

            <FormField label="Email" htmlFor="profile-email" required>
              <Input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(event) => setValue("email", event.target.value)}
                autoComplete="email"
                className="h-11"
                required
              />
            </FormField>

            <FormField label="Phone Number" htmlFor="profile-phone">
              <Input
                id="profile-phone"
                type="tel"
                value={form.phone}
                onChange={(event) => setValue("phone", event.target.value)}
                placeholder="+971 50 123 4567"
                className="h-11"
              />
            </FormField>

            <div className="sm:col-span-2">
              <PhotoField
                id="profile-photo"
                value={form.image}
                onChange={(url) => setValue("image", url)}
              />
            </div>

            <FormField
              label="Address"
              htmlFor="profile-address"
              className="sm:col-span-2"
            >
              <TextArea
                id="profile-address"
                value={form.address}
                onChange={(event) => setValue("address", event.target.value)}
                placeholder="Street, city, country"
              />
            </FormField>
          </div>

          <Button type="submit" size="lg" className="h-11 w-full" disabled={saving}>
            {saving ? (
              <>
                <LoaderCircle className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Save changes
                <ArrowRight />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
