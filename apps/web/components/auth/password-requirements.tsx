import { Check, X } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { passwordRules } from "@/lib/password"

/** Live checklist shown under the password field on the sign-up page. */
export function PasswordRequirements({ password }: { password: string }) {
  return (
    <ul className="grid gap-1.5 sm:grid-cols-3">
      {passwordRules.map((rule) => {
        const valid = rule.isValid(password)
        return (
          <li
            key={rule.label}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              valid ? "text-primary" : "text-muted-foreground"
            )}
          >
            {valid ? (
              <Check className="size-3.5 shrink-0" />
            ) : (
              <X className="size-3.5 shrink-0" />
            )}
            {rule.label}
          </li>
        )
      })}
    </ul>
  )
}
