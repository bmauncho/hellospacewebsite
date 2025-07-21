"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantitySelectorProps {
  initialQuantity?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
  disabled?: boolean
}

export default function QuantitySelector({
  initialQuantity = 1,
  min = 1,
  max = 10,
  onChange,
  disabled = false,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const increment = () => {
    const newQuantity = Math.min(quantity + 1, max)
    setQuantity(newQuantity)
    if (onChange) onChange(newQuantity)
  }

  const decrement = () => {
    const newQuantity = Math.max(quantity - 1, min)
    setQuantity(newQuantity)
    if (onChange) onChange(newQuantity)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10)

    if (!isNaN(value)) {
      const newQuantity = Math.max(min, Math.min(value, max))
      setQuantity(newQuantity)
      if (onChange) onChange(newQuantity)
    } else if (e.target.value === "") {
      setQuantity(min)
      if (onChange) onChange(min)
    }
  }

  const handleBlur = () => {
    // Ensure the value is within bounds when the input loses focus
    if (quantity < min) {
      setQuantity(min)
      if (onChange) onChange(min)
    } else if (quantity > max) {
      setQuantity(max)
      if (onChange) onChange(max)
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-[#3c3a36]">Quantity</h3>
      <div className="flex w-32 items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-md border-[#e2ded9]"
          onClick={decrement}
          disabled={quantity <= min || disabled}
          aria-label="Decrease quantity"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="text"
          inputMode="numeric"
          value={quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-8 w-12 border-x-0 border-[#e2ded9] text-center"
          aria-label="Quantity"
          disabled={disabled}
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-md border-[#e2ded9]"
          onClick={increment}
          disabled={quantity >= max || disabled}
          aria-label="Increase quantity"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
