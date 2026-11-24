"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, ChevronRight, Menu, Search, ShieldCheck, X } from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"
import { useSession } from "@/lib/auth-client"
import {
  canAccessRoute,
  dashboardNav,
  roleLabels,
  toDashboardRole,
} from "@/lib/dashboard-nav"
import { UserMenu } from "@/components/layout/user-menu"
import { BrandLogo } from "@/components/ui/brand-logo"

/** Shared dashboard chrome: role-based sidebar, topbar and route guard. */
export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isPending && !session?.user) router.replace("/sign-in")
  }, [isPending, session, router])

  if (isPending) return <DashboardSkeleton />

  if (!session?.user) {
    return (
      <div className="grid min-h-svh place-items-center p-6">
        <p className="text-sm text-muted-foreground">
          Redirecting you to sign in...
        </p>
      </div>
    )
  }

  const role = toDashboardRole(session.user.role)
  const navItems = dashboardNav[role]
  const allowed = canAccessRoute(role, pathname)
  const currentItem = navItems.find((item) => item.href === pathname)

  return (
    <div className="min-h-svh bg-background">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-brand-950/50 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Link href="/dashboard" aria-label="Equipora dashboard">
            <BrandLogo />
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mx-4 mt-5 flex items-center gap-2.5 rounded-xl bg-brand-50 px-3 py-2.5 dark:bg-brand-950/40">
          <ShieldCheck className="size-4 shrink-0 text-primary" />
          <span className="truncate text-xs font-semibold text-primary uppercase">
            {roleLabels[role]} workspace
          </span>
        </div>

        <nav
          className="mt-6 flex-1 space-y-1 overflow-y-auto px-3 pb-4"
          aria-label="Dashboard navigation"
        >
          <p className="px-3 pb-2 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
            Workspace
          </p>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="rounded-xl bg-muted/70 p-3">
            <p className="text-xs font-semibold">Need a hand?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Our support team is available 24/7.
            </p>
            <Link
              href="/"
              className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
            >
              Visit help center
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-5 backdrop-blur-xl sm:px-8">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
            className="grid size-9 place-items-center rounded-lg border border-border hover:bg-muted lg:hidden"
          >
            <Menu className="size-4" />
          </button>

          <div className="flex min-w-0 items-center gap-1.5 text-sm">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <ChevronRight className="size-4 text-muted-foreground" />
            <span className="truncate font-medium">
              {currentItem?.label ?? (allowed ? "Overview" : "Access denied")}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="h-9 w-48 pl-9 lg:w-56"
              />
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="relative grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
            </button>
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-7xl">
            {allowed ? (
              children
            ) : (
              <div className="rounded-2xl border border-border bg-card p-10 text-center">
                <h1 className="text-xl font-semibold">Access denied</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  This page is not available for your account type.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
                >
                  Back to overview
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex min-h-svh bg-background">
      <div className="hidden w-64 shrink-0 border-r border-border bg-card lg:block" />
      <div className="flex-1">
        <div className="h-16 border-b border-border" />
        <div className="space-y-6 p-8">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
