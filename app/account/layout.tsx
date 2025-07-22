import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AccountSidebar } from "@/components/account/account-sidebar"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 shrink-0">
            <AccountSidebar />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
