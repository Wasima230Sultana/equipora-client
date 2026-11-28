import type { CustomerContact } from "@/lib/customer-data"

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { SummaryRow } from "@/components/checkout/booking-summary"

/** Reusable customer information block (session data before payment, profile data after). */
export function CustomerDetails({
  customer,
  title = "Customer details",
}: {
  customer: Pick<CustomerContact, "name" | "email"> &
    Partial<Pick<CustomerContact, "phone" | "address">>
  title?: string
}) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b border-border px-6 py-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-6 py-4 text-sm">
        <SummaryRow label="Name" value={customer.name } />
        <SummaryRow label="Email" value={customer.email} />
        {customer.phone !== undefined && (
          <SummaryRow label="Phone" value={customer.phone} />
        )}
        {customer.address !== undefined && (
          <SummaryRow label="Address" value={customer.address} />
        )}
      </CardContent>
    </Card>
  )
}
