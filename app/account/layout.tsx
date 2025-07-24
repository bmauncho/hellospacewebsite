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
      <div className="bg-[#f8f5f2] min-h-screen">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-64 shrink-0">
              <AccountSidebar />
            </div>
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
