import type { Metadata } from "next"
import { OrderDetail } from "@/components/account/order-detail"

export const metadata: Metadata = {
  title: "Order Details | Hello Space",
  description: "View your order details",
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <OrderDetail orderId={id} />
}
