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
import { Label } from "@workspace/ui/components/label"
import { authClient, useSession } from "@/lib/auth-client"
import { PhotoField } from "@/components/auth/photo-field"
import { Avatar } from "@/components/ui/avatar"

/** Profile settings form: update name and photo for the signed-in user. */
export function ProfileForm() {
  const router = useRouter()
  const { data: session, isPending, refetch } = useSession()
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")
  const [saving, setSaving] = useState(false)

  const userName = session?.user.name
  const userImage = session?.user.image

  useEffect(() => {
    if (userName) setName(userName)
    setPhoto(userImage ?? "")
  }, [userName, userImage])

  if (isPending) {
    return (
      <Card className="gap-0 py-0">
        <CardContent className="py-10">
          <div className="mx-auto h-40 w-full max-w-md animate-pulse rounded-xl bg-muted" />
        </CardContent>
      </Card>
    )
  }

  if (!session?.user) {
    return (
      <Card className="gap-0 py-0">
        <CardHeader className="px-7 py-7">
          <CardTitle>Sign in to view your profile</CardTitle>
          <CardDescription>
            You need an account before you can update your details.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-7 pb-7">
          <Link
            href="/sign-in"
            className={buttonVariants({ size: "lg", className: "h-11" })}
          >
            Sign in
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter your name")
      return
    }

    setSaving(true)
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: photo.trim() || undefined,
      })

      if (error) {
        toast.error("Could not update your profile", {
          description: error.message || "Please try again.",
        })
        return
      }

      await refetch()
      router.refresh()
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : undefined,
      })
    } finally {
      setSaving(false)
    }
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
            <Avatar
              src={photo}
              name={name || session.user.name}
              className="size-14"
            />
            <div>
              <p className="font-medium">{name || session.user.name}</p>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              value={session.user.email}
              readOnly
              disabled
              className="h-11"
            />
          </div>

          <PhotoField id="profile-photo" value={photo} onChange={setPhoto} />

          <Button
            type="submit"
            size="lg"
            className="h-11 w-full"
            disabled={saving}
          >
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
