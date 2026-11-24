"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, LayoutDashboard, LogOut, UserRound } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@workspace/ui/lib/utils"
import { signOut, useSession } from "@/lib/auth-client"
import { Avatar } from "@/components/ui/avatar"

type UserMenuProps = {
  /** Called when a menu item is selected (used to close the mobile menu). */
  onNavigate?: () => void
  className?: string
}

/** Avatar + name button with profile / dashboard / sign-out dropdown. */
export function UserMenu({ onNavigate, className }: UserMenuProps) {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  if (isPending) {
    return <span className="size-9 animate-pulse rounded-full bg-muted" />
  }

  const user = session?.user
  if (!user) return null

  function close() {
    setOpen(false)
    onNavigate?.()
  }

  async function handleSignOut() {
    const { error } = await signOut()
    if (error) {
      toast.error("Could not sign out", {
        description: error.message || "Please try again.",
      })
      return
    }

    close()
    toast.success("Signed out successfully")
    router.push("/")
    router.refresh()
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pr-3 pl-1 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Avatar src={user.image} name={user.name} className="size-8" />
        <span className="max-w-28 truncate text-sm font-medium">
          {user.name}
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-56 rounded-2xl border border-border bg-card p-1.5 shadow-xl"
        >
          <div className="border-b border-border px-3 py-2">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile"
            role="menuitem"
            onClick={close}
            className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            <UserRound className="size-4 text-muted-foreground" />
            Profile
          </Link>
          <Link
            href="/"
            role="menuitem"
            onClick={close}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            <LayoutDashboard className="size-4 text-muted-foreground" />
            Dashboard
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
