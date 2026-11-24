import { ChevronDown } from "lucide-react"

import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"
import { roleOptions, type UserRole } from "@/lib/roles"

type RoleSelectProps = {
  value: UserRole
  onChange: (role: UserRole) => void
  id?: string
  className?: string
}

/** Reusable account-type selector used during registration. */
export function RoleSelect({
  value,
  onChange,
  id = "role",
  className,
}: RoleSelectProps) {
  const selected = roleOptions.find((option) => option.value === value)

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>Account type</Label>
      <span className="relative block">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value as UserRole)}
          className="h-11 w-full appearance-none rounded-lg border border-input bg-background px-3 pr-10 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
      {selected && (
        <p className="text-xs text-muted-foreground">{selected.description}</p>
      )}
    </div>
  )
}
