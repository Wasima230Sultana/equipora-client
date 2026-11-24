import {
  CalendarRange,
  ChartNoAxesCombined,
  CirclePlus,
  CreditCard,
  Heart,
  LayoutDashboard,
  PackagePlus,
  Truck,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type DashboardRole = "admin" | "owner" | "customer"

export type DashboardNavItem = {
  label: string
  href: string
  icon: LucideIcon
}

/** Navigation shown in the dashboard sidebar for each account role. */
export const dashboardNav: Record<DashboardRole, DashboardNavItem[]> = {
  admin: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "All Users", href: "/dashboard/users", icon: Users },
    { label: "All Equipment", href: "/dashboard/all-equipment", icon: Truck },
    {
      label: "All Rentals",
      href: "/dashboard/all-rentals",
      icon: CalendarRange,
    },
    { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: ChartNoAxesCombined,
    },
    { label: "My Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  owner: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Add Equipment",
      href: "/dashboard/owner/add-equipment",
      icon: CirclePlus,
    },
    {
      label: "My Equipment",
      href: "/dashboard/owner/my-equipment",
      icon: PackagePlus,
    },
    {
      label: "Equipment Rentals",
      href: "/dashboard/owner/equipment-rentals",
      icon: CalendarRange,
    },
    { label: "Earnings", href: "/dashboard/owner/earnings", icon: Wallet },
    { label: "My Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  customer: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Rentals", href: "/dashboard/my-rentals", icon: CalendarRange },
    { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { label: "My Profile", href: "/dashboard/profile", icon: UserRound },
  ],
}

export const roleLabels: Record<DashboardRole, string> = {
  admin: "Admin",
  owner: "Owner",
  customer: "Customer",
}

/** Normalize a session role so unknown/missing values stay usable. */
export function toDashboardRole(role?: string | null): DashboardRole {
  return role === "admin" || role === "owner" || role === "customer"
    ? role
    : "customer"
}

/** Simple route guard used by the dashboard shell. */
export function canAccessRoute(role: DashboardRole, pathname: string) {
  return dashboardNav[role].some((item) => item.href === pathname)
}
