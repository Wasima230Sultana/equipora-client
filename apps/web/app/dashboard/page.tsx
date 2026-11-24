import type { Metadata } from "next"

import { Overview } from "@/components/dashboard/overview"

export const metadata: Metadata = {
  title: "Dashboard | Equipora",
  description: "Your Equipora workspace.",
}

export default function DashboardPage() {
  return <Overview />
}
