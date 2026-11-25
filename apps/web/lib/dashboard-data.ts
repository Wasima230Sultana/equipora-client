import type { LucideIcon } from "lucide-react"

/** Legacy dummy dashboard data; live screens derive their figures from the backend. */

export type Stat = {
  label: string
  value: string
  change?: string
  icon: LucideIcon
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

