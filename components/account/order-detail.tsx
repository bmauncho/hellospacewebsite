"use client"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Steps, Step } from "@/components/ui/steps"

// Mock data for order details
const mockOrderDetails = {
  "ORD-001": {
    id: "ORD-001",
    date: new Date(2023, 4, 15),
    status: "Delivered",
    total: 249.99,
    subtotal: 229.99,
    shipping: 10.0,
    tax: 10.0,
    items: [
      {
        id: 1,
        name: "Minimalist Ceramic Vase",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Modern Coffee Table",
        price: 149.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
    paymentMethod: "Credit Card (ending in 4242)",
    trackingNumber: "TRK12345678",
    deliveryDate: new Date(2023, 4, 20),
    orderSteps: [
      {
        status: "Order Placed",
        date: new Date(2023, 4, 15),
        completed: true,
        icon: Package,
      },
      {
        status: "Order Shipped",
        date: new Date(2023, 4, 17),
        completed: true,
        icon: Truck,
      },
      {
        status: "Order Delivered",
        date: new Date(2023, 4, 20),
        completed: true,
        icon: CheckCircle,
      },
    ],
  },
  "ORD-002": {
    id: "ORD-002",
    date: new Date(2023, 3, 28),
    status: "Processing",
    total: 129.5,
    subtotal: 119.5,
    shipping: 5.0,
    tax: 5.0,
    items: [
      {
        id: 3,
        name: "Decorative Throw Pillow",
        price: 39.99,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 4,
        name: "Wooden Wall Shelf",
        price: 39.52,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
    paymentMethod: "PayPal",
    trackingNumber: null,
    deliveryDate: null,
    orderSteps: [
      {
        status: "Order Placed",
        date: new Date(2023, 3, 28),
        completed: true,
        icon: Package,
      },
      {
        status: "Order Shipped",
        date: null,
        completed: false,
        icon: Truck,
      },
      {
        status: "Order Delivered",
        date: null,
        completed: false,
        icon: CheckCircle,
      },
    ],
  },
  "ORD-003": {
    id: "ORD-003",
    date: new Date(2023, 2, 10),
    status: "Delivered",
    total: 349.99,
    subtotal: 329.99,
    shipping: 10.0,
    tax: 10.0,
    items: [
      {
        id: 5,
        name: "Scandinavian Armchair",
        price: 349.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
    paymentMethod: "Credit Card (ending in 4242)",
    trackingNumber: "TRK87654321",
    deliveryDate: new Date(2023, 2, 15),
    orderSteps: [
      {
        status: "Order Placed",
        date: new Date(2023, 2, 10),
        completed: true,
        icon: Package,
      },
      {
        status: "Order Shipped",
        date: new Date(2023, 2, 12),
        completed: true,
        icon: Truck,
      },
      {
        status: "Order Delivered",
        date: new Date(2023, 2, 15),
        completed: true,
        icon: CheckCircle,
      },
    ],
  },
};

export function OrderDetail({ orderId }: { orderId: string }) {
  const order = mockOrderDetails[orderId as keyof typeof mockOrderDetails]

  if (!order) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-[#3c3a36]">Order not found</h3>
        <p className="text-[#6b6963] mt-1">The order you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild className="mt-4">
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button asChild variant="ghost" className="pl-0 mb-2">
            <Link href="/account/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold text-[#3c3a36]">Order {order.id}</h1>
          <p className="text-[#6b6963] mt-1">Placed on {format(order.date, "MMMM d, yyyy")}</p>
        </div>
        <div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "Processing"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "Shipped"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-red-100 text-red-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Order Progress */}
      <div className="bg-[#f8f5f2] rounded-lg border border-[#e2ded9] p-6">
        <h2 className="text-lg font-medium text-[#3c3a36] mb-4">Order Progress</h2>
        <Steps>
          {order.orderSteps.map((step, index) => (
            <Step key={index} completed={step.completed}>
              <div className="flex items-center gap-2">
                <step.icon className="h-5 w-5" />
                <div>
                  <p className="font-medium">{step.status}</p>
                  {step.date && <p className="text-sm text-[#6b6963]">{format(step.date, "MMM d, yyyy")}</p>}
                </div>
              </div>
            </Step>
          ))}
        </Steps>
        {order.trackingNumber && (
          <div className="mt-4 text-sm">
            <span className="text-[#6b6963]">Tracking Number: </span>
            <span className="font-medium">{order.trackingNumber}</span>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg border border-[#e2ded9] overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-[#3c3a36] mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="h-20 w-20 bg-[#f8f5f2] rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#3c3a36] truncate">{item.name}</h3>
                  <p className="text-sm text-[#6b6963]">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-[#6b6963]">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#6b6963]">Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b6963]">Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b6963]">Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-[#e2ded9] p-6">
          <h2 className="text-lg font-medium text-[#3c3a36] mb-4">Shipping Information</h2>
          <div className="space-y-2">
            <p className="font-medium">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e2ded9] p-6">
          <h2 className="text-lg font-medium text-[#3c3a36] mb-4">Payment Information</h2>
          <div className="space-y-2">
            <p>
              <span className="text-[#6b6963]">Payment Method: </span>
              <span className="font-medium">{order.paymentMethod}</span>
            </p>
            <p>
              <span className="text-[#6b6963]">Billing Address: </span>
              <span className="font-medium">{order.billingAddress.name}</span>
            </p>
            <p>{order.billingAddress.street}</p>
            <p>
              {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
            </p>
            <p>{order.billingAddress.country}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild variant="outline">
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>
    </div>
  )
}
