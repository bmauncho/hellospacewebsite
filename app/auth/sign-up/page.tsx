import { SignUpForm } from "@/components/auth/sign-up-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up - Hello Space",
  description: "Create a Hello Space account to access exclusive features and checkout faster.",
}

export default function SignUpPage() {
  return (
    <div className="bg-[#f8f5f2] min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <SignUpForm />
      </div>
    </div>
  )
}
