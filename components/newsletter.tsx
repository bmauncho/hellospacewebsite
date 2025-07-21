"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1000)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {status === "success" ? (
        <div className="rounded-lg bg-[#e9e5e0] p-4 text-center">
          <p className="text-[#3c3a36] font-medium">Thank you for subscribing!</p>
          <p className="text-sm text-[#6b6963] mt-1">We&apos;ll be in touch with inspiration and updates.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#e2ded9] bg-white focus:border-[#a8a49e] focus:ring-[#a8a49e]"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#a8a49e] text-white hover:bg-[#8c8880]"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          <p className="text-xs text-[#6b6963] text-center">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </form>
      )}
    </div>
  )
}
