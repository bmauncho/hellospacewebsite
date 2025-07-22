import type { Metadata } from "next"
import { AccountOverview } from "@/components/account/account-overview"

export const metadata: Metadata = {
  title: "Account | Hello Space",
  description: "Manage your Hello Space account",
}

export default function AccountPage() {
  return <AccountOverview />
}
