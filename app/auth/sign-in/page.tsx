import { SignInForm } from "@/components/auth/sign-in-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - Hello Space",
  description: "Sign in to your Hello Space account to access your profile and checkout faster.",
}

export default function SignInPage() {
  return (
    <div className="bg-[#f8f5f2] min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <SignInForm />
      </div>
    </div>
  )
}
