import Link from "next/link"
import { Construction, MoveLeft, Search } from "lucide-react"

import { BrandLogo } from "@/components/ui/brand-logo"
import { buttonVariants } from "@workspace/ui/components/button"

/**
 * Root 404 page. Next.js renders this for any URL that does not match a route,
 * as well as when a page calls notFound().
 */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-7xl items-center px-6 py-6 lg:px-8">
        <Link href="/" aria-label="Equipora home">
          <BrandLogo />
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-16 lg:px-8">
        <div className="flex max-w-xl flex-col items-center text-center">
          <span className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Construction className="size-8" strokeWidth={1.8} />
          </span>

          <p className="mt-8 text-7xl font-semibold tracking-tighter text-primary sm:text-8xl">
            404
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back to the right equipment.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className={buttonVariants({ size: "lg", className: "h-11" })}>
              <MoveLeft />
              Back to home
            </Link>
            <Link
              href="/browse-equipment"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-11",
              })}
            >
              <Search />
              Browse equipment
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}