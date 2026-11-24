import type { ComponentProps, ReactNode } from "react"

import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

type FormFieldProps = {
  label: string
  htmlFor: string
  children: ReactNode
  hint?: string
  required?: boolean
  className?: string
}

/** Label + control + optional hint. Keeps every form field consistent. */
export function FormField({
  label,
  htmlFor,
  children,
  hint,
  required = false,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

/** Native select styled like the shared Input component. */
export function SelectInput({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow]",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

/** Native textarea styled like the shared Input component. */
export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input"
      className={cn(
        "flex min-h-24 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
        className
      )}
      {...props}
    />
  )
}
