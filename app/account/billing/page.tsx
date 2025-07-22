import type { Metadata } from "next"
import { BillingSettings } from "@/components/account/billing-settings"

export const metadata: Metadata = {
  title: "Billing | Hello Space",
  description: "Manage your billing information",
}

export default function BillingPage() {
  return <BillingSettings />
}
