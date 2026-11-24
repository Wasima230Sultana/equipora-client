import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, BadgeCheck, ShieldCheck, Zap } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { BrandLogo } from "@/components/ui/brand-logo"

const highlights = [
  { icon: BadgeCheck, text: "Verified equipment from trusted owners" },
  { icon: ShieldCheck, text: "Secure bookings and transparent pricing" },
  { icon: Zap, text: "Get your machine on site in record time" },
]

type AuthShellProps = {
  title: string
  description: string
  children: ReactNode
}

/** Shared layout for sign-in and sign-up pages. */
export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-brand-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(87,167,126,0.35),transparent_55%)]" />

        <Link href="/" className="w-fit">
          <BrandLogo inverse />
        </Link>

        <div className="max-w-lg">
          <h2 className="text-4xl leading-tight font-semibold tracking-tight text-balance">
            Everything you need to keep building.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Join Equipora to rent verified machinery or put your own equipment
            to work — all from one simple account.
          </p>
          <ul className="mt-10 space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 text-sm text-white/85"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10">
                  <Icon className="size-4 text-brand-200" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-white/45">
          © {new Date().getFullYear()} Equipora. All rights reserved.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 py-6 lg:hidden">
          <Link href="/">
            <BrandLogo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-8 sm:px-10 lg:py-12">
          <Card className="w-full max-w-md gap-0 overflow-hidden rounded-3xl py-0 shadow-[0_20px_60px_-35px_rgba(16,52,35,0.4)]">
            <CardHeader className="border-b border-border bg-brand-50/60 px-7 py-7 dark:bg-brand-950/30">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="px-7 py-7">{children}</CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
