/** Small "or" separator between password and social sign-in options. */
export function AuthDivider({
  label = "or continue with",
}: {
  label?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}
