/** Password rules shared by the sign-up form and the requirements checklist. */
export const passwordRules = [
  {
    label: "One uppercase letter",
    isValid: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    isValid: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "At least 6 characters",
    isValid: (value: string) => value.length >= 6,
  },
]

/** Returns the unmet requirements so the form can show a clear toast. */
export function getPasswordErrors(password: string) {
  return passwordRules
    .filter((rule) => !rule.isValid(password))
    .map((rule) => rule.label)
}

export function isPasswordValid(password: string) {
  return getPasswordErrors(password).length === 0
}
