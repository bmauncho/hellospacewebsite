"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, Heart, CreditCard, Settings } from "lucide-react"

export function AccountOverview() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#3c3a36]">Account Overview</h1>
        <p className="text-[#6b6963] mt-1">Welcome back, {user?.name || "there"}!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Package className="h-5 w-5 text-[#c17c60]" />
              Orders
            </CardTitle>
            <CardDescription>View and track your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-semibold">0</p>
                <p className="text-sm text-[#6b6963]">Recent orders</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/account/orders">View Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#c17c60]" />
              Wishlist
            </CardTitle>
            <CardDescription>Products you&apos;ve saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-semibold">0</p>
                <p className="text-sm text-[#6b6963]">Saved items</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/wishlist">View Wishlist</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#c17c60]" />
              Billing
            </CardTitle>
            <CardDescription>Manage your payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#6b6963]">Payment methods</p>
                <p className="text-sm text-[#6b6963] mt-1">Manage your cards and addresses</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/account/billing">Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#c17c60]" />
              Settings
            </CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#6b6963]">Profile settings</p>
                <p className="text-sm text-[#6b6963] mt-1">Update your personal information</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/account/settings">Edit</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
