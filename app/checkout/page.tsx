import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { ProtectedRoute } from "@/components/auth/protected-route";

export const metadata: Metadata = {
  title: "Checkout - Hello Space",
  description: "Complete your purchase from Hello Space.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-[#f8f5f2] py-12">
      <div className="container px-4 md:px-6">
        <h1 className="mb-8 font-serif text-3xl font-medium text-[#3c3a36]">
          Checkout
        </h1>
        <ProtectedRoute>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>
            <div>
              <CheckoutSummary />
            </div>
          </div>
        </ProtectedRoute>
      </div>
    </div>
  );
}
