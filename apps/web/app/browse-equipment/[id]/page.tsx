"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, LockKeyhole } from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { BookingForm } from "@/components/browse/booking-form"
import { EquipmentDetails } from "@/components/browse/equipment-details"
import { FavoriteButton } from "@/components/browse/favorite-button"
import { CustomerDetails } from "@/components/checkout/customer-details"
import { Container } from "@/components/ui/container"
import { useEquipmentDetails } from "@/hooks/use-browse-equipment"
import { useSessionUser } from "@/hooks/use-session-user"
import { useSession } from "@/lib/auth-client"

/** Protected details page: only signed-in users can see and book a listing. */
export default function EquipmentDetailsPage() {
  const params = useParams<{ id: string }>()
  const id = typeof params.id === "string" ? params.id : ""
  const { isPending } = useSession()
  const { userId, name, email } = useSessionUser()
  const isLoggedIn = Boolean(userId)
  const { equipment, loading, error } = useEquipmentDetails(
    id,
    !isPending && isLoggedIn
  )

  return (
    <main className="min-h-[70vh] py-12">
      <Container>
        <Link
          href="/browse-equipment"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to browse
        </Link>

        {isPending ? (
          <p className="mt-10 text-sm text-muted-foreground">
            Checking your session…
          </p>
        ) : !isLoggedIn ? (
          <Card className="mx-auto mt-10 max-w-xl">
            <CardHeader className="items-center text-center">
              <LockKeyhole className="size-8 text-primary" />
              <CardTitle className="text-xl">Sign in to view details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                Equipment details, favorites and bookings are available to
                signed-in users only.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/sign-in"
                  className={buttonVariants({ size: "lg" })}
                >
                  Sign in
                </Link>
                <Link
                  href="/browse-equipment"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Back to browse
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : loading ? (
          <p className="mt-10 text-sm text-muted-foreground">
            Loading equipment details…
          </p>
        ) : error ? (
          <p className="mt-10 text-sm text-destructive">{error}</p>
        ) : !equipment ? (
          <p className="mt-10 text-sm text-muted-foreground">
            This equipment could not be found.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <EquipmentDetails equipment={equipment} />
            </div>
            <div className="space-y-6">
              <Card className="gap-0 py-0">
                <CardHeader className="border-b border-border px-6 py-5">
                  <CardTitle className="text-base">Save this listing</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-5">
                  <FavoriteButton
                    userId={userId}
                    equipmentId={equipment.id}
                  />
                </CardContent>
              </Card>
              <CustomerDetails
                customer={{ name, email }}
                title="Booking as"
              />
              <BookingForm equipment={equipment} />
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}
