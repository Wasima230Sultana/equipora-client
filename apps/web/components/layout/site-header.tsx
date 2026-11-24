"use client"

import { useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { useSession } from "@/lib/auth-client"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Container } from "@/components/ui/container"
import { UserMenu } from "@/components/layout/user-menu"
import { navLinks } from "@/lib/site-data"
import Link from "next/link"

/** Sticky navigation with session-aware account actions and a mobile menu. */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session, isPending } = useSession()
  const isLoggedIn = Boolean(session?.user)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="Equipora home">
            <BrandLogo />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {isPending ? (
              <span className="size-9 animate-pulse rounded-full bg-muted" />
            ) : isLoggedIn ? (
              <UserMenu />
            ) : (
              <>
                <a
                  href="/sign-in"
                  className="px-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  Login
                </a>
                <a
                  href="/sign-up"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "h-10 px-4",
                  })}
                >
                  Register
                </a>
                <a
                  href="/sign-in"
                  className={buttonVariants({
                    size: "lg",
                    className: "h-10 px-4",
                  })}
                >
                  Dashboard
                  <ArrowUpRight className="size-4" />
                </a>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-xl border border-border text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "border-t border-border bg-background lg:hidden",
          menuOpen ? "block" : "hidden"
        )}
      >
        <Container>
          <nav className="flex flex-col py-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}

            {isPending ? (
              <span className="mt-3 size-9 animate-pulse rounded-full bg-muted" />
            ) : isLoggedIn ? (
              <div className="mt-3 border-t border-border pt-4">
                <UserMenu onNavigate={() => setMenuOpen(false)} />
              </div>
            ) : (
              <div className="mt-3 grid gap-2 border-t border-border pt-4 sm:grid-cols-3">
                <a
                  href="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "h-11",
                  })}
                >
                  Login
                </a>
                <a
                  href="/sign-up"
                  onClick={() => setMenuOpen(false)}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "h-11",
                  })}
                >
                  Register
                </a>
                <a
                  href="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className={buttonVariants({ size: "lg", className: "h-11" })}
                >
                  Dashboard
                </a>
              </div>
            )}
          </nav>
        </Container>
      </div>
    </header>
  )
}
