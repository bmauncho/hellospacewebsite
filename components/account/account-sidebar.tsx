"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Package, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const accountLinks = [
  {
    href: "/account",
    label: "Overview",
    icon: User,
  },
  {
    href: "/account/orders",
    label: "Orders",
    icon: Package,
  },
  {
    href: "/account/billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    href: "/account/settings",
    label: "Settings",
    icon: Settings,
  },
]

export function AccountSidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-white rounded-lg border border-[#e2ded9] overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 border-b border-[#e2ded9]">
        <h2 className="font-medium text-lg text-[#3c3a36]">Account</h2>
      </div>
      <nav className="p-2 md:p-4">
        <ul className="space-y-1">
          {accountLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-md text-sm transition-colors w-full",
                    isActive ? "bg-[#c17c60] text-white" : "text-[#6b6963] hover:bg-[#e2ded9] hover:text-[#3c3a36]",
                  )}
                >
                  <link.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
