"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Mock data for payment methods
const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2025,
    isDefault: false,
  },
]

// Mock data for addresses
const mockAddresses = [
  {
    id: "addr_1",
    name: "John Doe",
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
    isDefault: true,
  },
  {
    id: "addr_2",
    name: "John Doe",
    street: "456 Market St",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
    isDefault: false,
  },
]

export function BillingSettings() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [addresses, setAddresses] = useState(mockAddresses)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddCardOpen, setIsAddCardOpen] = useState(false)
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false)

  // New card form state
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  })

  // New address form state
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCard((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add new card to state
      const newPaymentMethod = {
        id: `pm_${Date.now()}`,
        type: "card",
        brand: "visa",
        last4: newCard.cardNumber.slice(-4),
        expMonth: Number.parseInt(newCard.expMonth),
        expYear: Number.parseInt(newCard.expYear),
        isDefault: paymentMethods.length === 0,
      }

      setPaymentMethods((prev) => [...prev, newPaymentMethod])

      toast({
        title: "Card added",
        description: "Your payment method has been added successfully.",
      })

      // Reset form and close dialog
      setNewCard({
        cardNumber: "",
        cardName: "",
        expMonth: "",
        expYear: "",
        cvc: "",
      })
      setIsAddCardOpen(false)
    } catch (error) {
      console.error("Card addition error:", error)
      toast({
        title: "Error",
        description: "There was an error adding your payment method.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add new address to state
      const newAddressObj = {
        id: `addr_${Date.now()}`,
        ...newAddress,
        isDefault: addresses.length === 0,
      }

      setAddresses((prev) => [...prev, newAddressObj])

      toast({
        title: "Address added",
        description: "Your address has been added successfully.",
      })

      // Reset form and close dialog
      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      })
      setIsAddAddressOpen(false)
    } catch (error) {
      console.error("Address addition error:", error)
      toast({
        title: "Error",
        description: "There was an error adding your address.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePaymentMethod = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this payment method?")) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Remove payment method from state
        setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id))

        toast({
          title: "Payment method removed",
          description: "Your payment method has been removed successfully.",
        })
      } catch (error) {
        console.error("Payment method removal error:", error);
        toast({
          title: "Error",
          description: "There was an error removing your payment method.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDeleteAddress = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this address?")) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Remove address from state
        setAddresses((prev) => prev.filter((addr) => addr.id !== id))

        toast({
          title: "Address removed",
          description: "Your address has been removed successfully.",
        })
      } catch (error) {
        console.error("Address removal error:", error);
        toast({
          title: "Error",
          description: "There was an error removing your address.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSetDefaultPaymentMethod = async (id: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update payment methods state
      setPaymentMethods((prev) =>
        prev.map((pm) => ({
          ...pm,
          isDefault: pm.id === id,
        })),
      )

      toast({
        title: "Default payment method updated",
        description: "Your default payment method has been updated successfully.",
      })
    } catch (error) {
      console.error("Default payment method update error:", error)
      toast({
        title: "Error",
        description: "There was an error updating your default payment method.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetDefaultAddress = async (id: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update addresses state
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        })),
      )

      toast({
        title: "Default address updated",
        description: "Your default address has been updated successfully.",
      })
    } catch (error) {
      console.error("Default address update error:", error);
      toast({
        title: "Error",
        description: "There was an error updating your default address.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#3c3a36]">Billing</h1>
        <p className="text-[#6b6963] mt-1">Manage your payment methods and addresses</p>
      </div>

      {/* Payment Methods */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#3c3a36]">Payment Methods</h2>
          <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCard}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={newCard.cardName}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={newCard.cardNumber}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expMonth">Exp. Month</Label>
                      <Input
                        id="expMonth"
                        name="expMonth"
                        value={newCard.expMonth}
                        onChange={handleCardChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="expYear">Exp. Year</Label>
                      <Input id="expYear" name="expYear" value={newCard.expYear} onChange={handleCardChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" name="cvc" value={newCard.cvc} onChange={handleCardChange} required />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Card"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {paymentMethods.length > 0 ? (
            paymentMethods.map((pm) => (
              <Card key={pm.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[#c17c60]" />
                      <CardTitle className="text-base">
                        {pm.brand.charAt(0).toUpperCase() + pm.brand.slice(1)} •••• {pm.last4}
                      </CardTitle>
                    </div>
                    {pm.isDefault && (
                      <span className="text-xs bg-[#f8f5f2] text-[#6b6963] px-2 py-1 rounded-full">Default</span>
                    )}
                  </div>
                  <CardDescription>
                    Expires {pm.expMonth}/{pm.expYear}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between pt-2">
                  {!pm.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefaultPaymentMethod(pm.id)}
                      disabled={isLoading}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeletePaymentMethod(pm.id)}
                    disabled={isLoading || paymentMethods.length === 1}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <p className="text-[#6b6963] mb-4">You don&apos;t have any payment methods yet.</p>
                <Button variant="outline" onClick={() => setIsAddCardOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Separator />

      {/* Addresses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#3c3a36]">Addresses</h2>
          <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Address</DialogTitle>
                <DialogDescription>Add a new shipping or billing address to your account.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAddress}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={newAddress.name} onChange={handleAddressChange} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      name="street"
                      value={newAddress.street}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={newAddress.city} onChange={handleAddressChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" value={newAddress.state} onChange={handleAddressChange} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" name="zip" value={newAddress.zip} onChange={handleAddressChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={newAddress.country}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Address"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <Card key={addr.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{addr.name}</CardTitle>
                    {addr.isDefault && (
                      <span className="text-xs bg-[#f8f5f2] text-[#6b6963] px-2 py-1 rounded-full">Default</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-[#6b6963]">{addr.street}</p>
                  <p className="text-sm text-[#6b6963]">
                    {addr.city}, {addr.state} {addr.zip}
                  </p>
                  <p className="text-sm text-[#6b6963]">{addr.country}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  {!addr.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      disabled={isLoading}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteAddress(addr.id)}
                    disabled={isLoading || addresses.length === 1}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <p className="text-[#6b6963] mb-4">You don&apos;t have any addresses yet.</p>
                <Button variant="outline" onClick={() => setIsAddAddressOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
