"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function OrderConfirmationPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/shop");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="bg-[#f8f5f2] py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl rounded-lg border border-[#e2ded9] bg-white p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[#e9e5e0] p-3">
              <CheckCircle className="h-12 w-12 text-brand-accent" />
            </div>
          </div>
          <h1 className="mb-2 font-serif text-3xl font-medium text-[#3c3a36]">
            Order Confirmed!
          </h1>
          <p className="mb-6 text-[#6b6963]">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>

          <div className="mb-8 rounded-lg bg-[#e9e5e0] p-6 text-left">
            <h2 className="mb-4 font-serif text-xl font-medium text-[#3c3a36]">
              Order Details
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Order Number:</span>
                <span className="text-sm">
                  #HS
                  {Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Date:</span>
                <span className="text-sm">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Payment Method:</span>
                <span className="text-sm">Credit Card</span>
              </div>
            </div>
          </div>

          <p className="mb-6 text-sm text-[#6b6963]">
            We&apos;ve sent a confirmation email to {user.email} with all the
            details of your order. If you have any questions, please contact our
            customer service.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild variant="accent" className="flex-1">
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/account/orders">View My Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
