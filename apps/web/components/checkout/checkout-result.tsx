import Link from "next/link"
import type { ReactNode } from "react"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { Container } from "@/components/ui/container"

type CheckoutStatus = "success" | "cancel" | "error"

const statusStyles = {
  success: { Icon: CheckCircle2, tone: "text-emerald-600" },
  cancel: { Icon: XCircle, tone: "text-amber-600" },
  error: { Icon: AlertCircle, tone: "text-destructive" },
} as const

const defaultActions = (
  <>
    <Link href="/dashboard/customer/my-rentals" className={buttonVariants()}>
      View my rentals
    </Link>
    <Link
      href="/browse-equipment"
      className={buttonVariants({ variant: "outline" })}
    >
      Back to browse
    </Link>
  </>
)

/** Shared layout for the payment success, cancel and error pages. */
export function CheckoutResult({
  status,
  title,
  description,
  children,
  actions = defaultActions,
}: {
  status: CheckoutStatus
  title: string
  description: string
  children?: ReactNode
  actions?: ReactNode
}) {
  const { Icon, tone } = statusStyles[status]

  return (
    <main className="min-h-[70vh] py-12">
      <Container className="max-w-2xl">
        <Card className="gap-0 py-0">
          <CardHeader className="items-center border-b border-border px-6 py-8 text-center">
            <Icon className={cn("size-12", tone)} />
            <CardTitle className="text-2xl">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardHeader>
          <CardContent className="space-y-6 px-6 py-8">
            {children}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              {actions}
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}
