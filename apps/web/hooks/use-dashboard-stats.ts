"use client"

import { useMemo } from "react"

import { useAdminAnalytics } from "@/hooks/use-admin-data"
import { useCustomerFavorites, useCustomerRentals } from "@/hooks/use-customer-data"
import { useOwnerEquipment, useOwnerRentals } from "@/hooks/use-owner-data"
import { useSessionUser } from "@/hooks/use-session-user"
import { adminSummaryStats } from "@/lib/admin-analytics"
import { toDashboardRole } from "@/lib/dashboard-nav"
import {
  customerDashboardStats,
  ownerDashboardStats,
} from "@/lib/dashboard-stats"
import { buildOwnerSummary } from "@/lib/owner-summary"

/**
 * One source of truth for the dashboard overview cards.
 * Each role uses the same hooks already used by its own screens; only the
 * enabled id differs, and idle hooks skip their backend request.
 */
export function useDashboardStats() {
  const { userId, role: sessionRole, name, isPending } = useSessionUser()
  const role = toDashboardRole(sessionRole)
  const firstName = name.split(" ")[0] || "there"

  const isAdmin = role === "admin"
  const isOwner = role === "owner"
  const adminId = isAdmin ? userId : ""
  const ownerId = isOwner ? userId : ""
  const customerId = role === "customer" ? userId : ""

  const admin = useAdminAnalytics(adminId)
  const ownerEquipment = useOwnerEquipment(ownerId)
  const ownerRentals = useOwnerRentals(ownerId)
  const customerBookings = useCustomerRentals(customerId)
  const favorites = useCustomerFavorites(customerId)

  const stats = useMemo(() => {
    if (isAdmin) return adminSummaryStats(admin.summary)
    if (isOwner) {
      return ownerDashboardStats(
        buildOwnerSummary(ownerEquipment.rows, ownerRentals.rows)
      )
    }
    return customerDashboardStats(customerBookings.rows, favorites.rows)
  }, [
    isAdmin,
    isOwner,
    admin.summary,
    ownerEquipment.rows,
    ownerRentals.rows,
    customerBookings.rows,
    favorites.rows,
  ])

  const loading =
    isPending ||
    (isAdmin
      ? admin.loading
      : isOwner
        ? ownerEquipment.loading || ownerRentals.loading
        : customerBookings.loading || favorites.loading)

  const error = isAdmin
    ? admin.error
    : isOwner
      ? ownerEquipment.error ?? ownerRentals.error
      : customerBookings.error ?? favorites.error

  return { role, firstName, stats, loading, error }
}
