import type { Metadata } from "next"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm />
    </div>
  )
}

