"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"

export function CheckoutSummary() {
  const { items, subtotal } = useCart()

  // Calculate shipping (free over $100)
  const shipping = subtotal >= 100 ? 0 : 10

  // Calculate tax (8.5%)
  const tax = subtotal * 0.085

  // Calculate total
  const total = subtotal + shipping + tax

  return (
    <div className="rounded-lg border border-[#e2ded9] bg-white p-6 sticky top-6">
      <h2 className="mb-4 font-serif text-xl font-medium text-[#3c3a36]">Order Summary</h2>

      <div className="max-h-[300px] overflow-auto space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex space-x-3">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <h4 className="text-sm font-medium">{item.name}</h4>
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (8.5%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 text-xs text-muted-foreground">
        <p>Free shipping on orders over $100</p>
        <p className="mt-2">
          By placing your order, you agree to our{" "}
          <Link href="/terms" className="text-brand-accent hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
