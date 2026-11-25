/** Shared loading/error/count line used above every admin table. */
export function AdminDataStatus({
  loading,
  error,
  count,
  label,
}: {
  loading: boolean
  error: string | null
  count: number
  label: string
}) {
  if (error) return <p className="text-sm text-destructive">{error}</p>
  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading {label} from backend…</p>
  }
  return (
    <p className="text-sm text-muted-foreground">
      {count} {label}
    </p>
  )
}
