import type { Metadata } from "next"
import { OrderDetail } from "@/components/account/order-detail"

export const metadata: Metadata = {
  title: "Order Details | Hello Space",
  description: "View your order details",
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetail orderId={params.id} />
}
