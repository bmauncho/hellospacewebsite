import type { Metadata } from "next"
import { AccountSettings } from "@/components/account/account-settings"

export const metadata: Metadata = {
  title: "Account Settings | Hello Space",
  description: "Manage your account settings",
}

export default function AccountSettingsPage() {
  return <AccountSettings />
}
