import type { Metadata } from "next"
import { OrderHistory } from "@/components/account/order-history"

export const metadata: Metadata = {
  title: "Orders | Hello Space",
  description: "View your order history",
}

export default function OrdersPage() {
  return <OrderHistory />
}
