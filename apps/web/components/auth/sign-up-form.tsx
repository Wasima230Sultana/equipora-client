"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, LoaderCircle, Upload } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { signUp } from "@/lib/auth-client"
import { getPasswordErrors } from "@/lib/password"
import { PasswordInput } from "@/components/auth/password-input"
import { PasswordRequirements } from "@/components/auth/password-requirements"

/** Email + password registration, including an optional ImgBB photo upload. */
export function SignUpForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")
  const [password, setPassword] = useState("")
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
    if (!apiKey) {
      toast.error("ImgBB upload is not configured", {
        description: "Paste a direct image link instead.",
      })
      return
    }

    setUploading(true)
    try {
      const body = new FormData()
      body.append("image", file)
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body }
      )
      const result = await response.json()

      if (!response.ok || !result?.data?.url) {
        throw new Error("Upload failed. Please try again.")
      }

      setPhoto(result.data.url)
      toast.success("Photo uploaded successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter your name")
      return
    }
    if (!email.trim()) {
      toast.error("Please enter your email")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address")
      return
    }

    const errors = getPasswordErrors(password)
    if (errors.length > 0) {
      toast.error("Password does not meet the requirements", {
        description: errors.join(" • "),
      })
      return
    }

    setSubmitting(true)
    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photo.trim() || undefined,
      })

      if (error) {
        toast.error("Registration failed", {
          description: error.message || "Please try again.",
        })
        return
      }

      toast.success("Account created successfully!", {
        description: "Welcome to Equipora.",
      })
      router.push("/")
    } catch (error) {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : undefined,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ahmed Al Mansouri"
          autoComplete="name"
          className="h-11"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="h-11"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Photo</Label>
        <div className="flex gap-2">
          <Input
            id="photo"
            type="url"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
            placeholder="Paste a direct image link"
            className="h-11"
          />
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11 shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <LoaderCircle className="animate-spin" /> : <Upload />}
            Upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Direct image link or upload to ImgBB.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          placeholder="Create a password"
        />
        <PasswordRequirements password={password} />
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-11 w-full"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <LoaderCircle className="animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
