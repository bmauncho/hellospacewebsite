"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    notes: "",
  })
  const { clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would submit the order to your backend
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart after successful order
      clearCart()

      // Show success toast
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. We'll send you a confirmation email shortly.",
      })

      // Redirect to order confirmation page
      router.push("/checkout/confirmation")
    } catch (error) {
      console.error("Error placing order:", error)
      toast({
        title: "Error placing order",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-lg border border-[#e2ded9] bg-white p-6">
        <h2 className="mb-4 font-serif text-xl font-medium text-[#3c3a36]">Contact Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#e2ded9] bg-white p-6">
        <h2 className="mb-4 font-serif text-xl font-medium text-[#3c3a36]">Shipping Address</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#e2ded9] bg-white p-6">
        <h2 className="mb-4 font-serif text-xl font-medium text-[#3c3a36]">Payment Method</h2>
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={handleRadioChange}
          className="space-y-4"
          disabled={isLoading}
        >
          <div className="flex items-center space-x-2 rounded-md border border-[#e2ded9] p-3">
            <RadioGroupItem value="credit-card" id="credit-card" />
            <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
              Credit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border border-[#e2ded9] p-3">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex-1 cursor-pointer">
              PayPal
            </Label>
          </div>
        </RadioGroup>

        {formData.paymentMethod === "credit-card" && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                required
                className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Expiration Date</Label>
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                  className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardCvc">CVC</Label>
                <Input
                  id="cardCvc"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  placeholder="123"
                  required
                  className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-[#e2ded9] bg-white p-6">
        <h2 className="mb-4 font-serif text-xl font-medium text-[#3c3a36]">Additional Information</h2>
        <div className="space-y-2">
          <Label htmlFor="notes">Order Notes (Optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Special instructions for delivery or any other notes"
            className="min-h-[100px] border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
            disabled={isLoading}
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-brand-accent text-white hover:bg-brand-accent/90" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </form>
  )
}
