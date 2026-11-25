import {
  CircleDollarSign,
  ClipboardList,
  Heart,
  PackagePlus,
  Star,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import type { DashboardRole } from "@/lib/dashboard-nav"

/** Dummy dashboard content. Replace with API data when the backend is ready. */

export type Stat = {
  label: string
  value: string
  change?: string
  icon: LucideIcon
}

export const dashboardStats: Record<DashboardRole, Stat[]> = {
  admin: [
    {
      label: "Total revenue",
      value: "$128,430",
      change: "+12.5%",
      icon: CircleDollarSign,
    },
    {
      label: "Active rentals",
      value: "348",
      change: "+8.2%",
      icon: ClipboardList,
    },
    { label: "Total users", value: "12,480", change: "+5.1%", icon: Users },
    { label: "Equipment listed", value: "2,540", change: "+3.8%", icon: Truck },
  ],
  owner: [
    {
      label: "My equipment",
      value: "18",
      change: "+2 this month",
      icon: PackagePlus,
    },
    {
      label: "Active rentals",
      value: "7",
      change: "+3 this week",
      icon: ClipboardList,
    },
    {
      label: "Earnings this month",
      value: "$12,480",
      change: "+9.4%",
      icon: Wallet,
    },
    {
      label: "Average rating",
      value: "4.9",
      change: "from 216 reviews",
      icon: Star,
    },
  ],
  customer: [
    {
      label: "My rentals",
      value: "4",
      change: "+1 this month",
      icon: ClipboardList,
    },
    { label: "Active rentals", value: "1", icon: Truck },
    { label: "Saved machines", value: "6", icon: Heart },
    { label: "Wallet balance", value: "$1,200", icon: Wallet },
  ],
}

export const users = [
  {
    id: "USR-1042",
    name: "Ahmed Al Mansouri",
    email: "ahmed@example.com",
    role: "Owner",
    status: "Active",
    joined: "Mar 12, 2026",
  },
  {
    id: "USR-1043",
    name: "Sarah Collins",
    email: "sarah@example.com",
    role: "Owner",
    status: "Active",
    joined: "Mar 18, 2026",
  },
  {
    id: "USR-1044",
    name: "Daniel Ross",
    email: "daniel@example.com",
    role: "Customer",
    status: "Active",
    joined: "Apr 02, 2026",
  },
  {
    id: "USR-1045",
    name: "Priya Nair",
    email: "priya@example.com",
    role: "Customer",
    status: "Pending",
    joined: "Apr 09, 2026",
  },
  {
    id: "USR-1046",
    name: "James Miller",
    email: "james@example.com",
    role: "Owner",
    status: "Active",
    joined: "Apr 21, 2026",
  },
]

export const adminEquipment = [
  {
    id: "EQ-101",
    name: "CAT 320 Excavator",
    category: "Excavators",
    owner: "Ahmed Al Mansouri",
    status: "Approved",
    price: "$420 / day",
  },
  {
    id: "EQ-102",
    name: "Liebherr LTM Crane",
    category: "Cranes",
    owner: "Sarah Collins",
    status: "Approved",
    price: "$890 / day",
  },
  {
    id: "EQ-103",
    name: "Volvo A40G Truck",
    category: "Dump Trucks",
    owner: "James Miller",
    status: "Rented",
    price: "$360 / day",
  },
  {
    id: "EQ-104",
    name: "Toyota 8FG Forklift",
    category: "Forklifts",
    owner: "Ahmed Al Mansouri",
    status: "Pending",
    price: "$180 / day",
  },
  {
    id: "EQ-105",
    name: "CASE 821F Loader",
    category: "Loaders",
    owner: "Sarah Collins",
    status: "Approved",
    price: "$440 / day",
  },
]

export const myEquipment = adminEquipment.filter((item) =>
  ["EQ-101", "EQ-104", "EQ-105"].includes(item.id)
)

export const rentals = [
  {
    id: "RNT-2048",
    equipment: "CAT 320 Excavator",
    customer: "Daniel Ross",
    period: "Nov 20 – Nov 27",
    status: "Active",
    amount: "$2,940",
  },
  {
    id: "RNT-2049",
    equipment: "Volvo A40G Truck",
    customer: "Priya Nair",
    period: "Nov 18 – Nov 24",
    status: "Completed",
    amount: "$2,160",
  },
  {
    id: "RNT-2050",
    equipment: "Liebherr LTM Crane",
    customer: "Marcus Bell",
    period: "Nov 22 – Nov 29",
    status: "Active",
    amount: "$6,230",
  },
  {
    id: "RNT-2051",
    equipment: "Toyota 8FG Forklift",
    customer: "Aisha Karim",
    period: "Nov 25 – Dec 02",
    status: "Pending",
    amount: "$1,260",
  },
]

export const myRentals = [
  {
    id: "RNT-2048",
    equipment: "CAT 320 Excavator",
    period: "Nov 20 – Nov 27",
    status: "Active",
    amount: "$2,940",
  },
  {
    id: "RNT-2031",
    equipment: "Toyota 8FG Forklift",
    period: "Oct 12 – Oct 19",
    status: "Completed",
    amount: "$1,260",
  },
  {
    id: "RNT-2022",
    equipment: "CASE 821F Loader",
    period: "Sep 08 – Sep 15",
    status: "Completed",
    amount: "$3,080",
  },
]

export const payouts = [
  { id: "PO-3401", date: "Nov 20, 2026", amount: "$3,120", status: "Paid" },
  { id: "PO-3402", date: "Nov 13, 2026", amount: "$2,480", status: "Paid" },
  {
    id: "PO-3403",
    date: "Nov 06, 2026",
    amount: "$1,940",
    status: "Processing",
  },
]

