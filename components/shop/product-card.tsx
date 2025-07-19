"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { WishlistButton } from "@/components/wishlist/wishlist-button"

type ProductCardProps = {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  isNew?: boolean
  onSale?: boolean
  slug?: string | number
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  category,
  image,
  isNew,
  onSale,
  slug,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const productSlug = slug || id

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#e2ded9] bg-white p-2 transition-all hover:shadow-md">
      <div className="absolute right-4 top-4 z-10">
        <WishlistButton
          product={{
            id,
            name,
            price,
            image,
            slug: productSlug.toString(),
          }}
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        />
      </div>

      {(isNew || onSale) && (
        <div className="absolute left-4 top-4 z-10">
          {onSale && <Badge className="mb-2 bg-[#c17c60] text-white hover:bg-[#a86a51]">{discount}% OFF</Badge>}
          {isNew && <Badge className="bg-[#e9e5e0] text-[#6b6963] hover:bg-[#e9e5e0]">New</Badge>}
        </div>
      )}

      <Link href={`/shop/${productSlug}`} className="block overflow-hidden rounded-md">
        <Image
          src={image || "/placeholder.svg?height=300&width=300"}
          alt={name}
          width={300}
          height={300}
          className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <div className="text-xs text-[#6b6963]">{category}</div>
        <Link href={`/shop/${productSlug}`}>
          <h3 className="mb-1 font-medium text-[#3c3a36] line-clamp-1">{name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <p className="font-medium text-[#3c3a36]">${price.toFixed(2)}</p>
          {originalPrice && <p className="text-sm text-[#6b6963] line-through">${originalPrice.toFixed(2)}</p>}
        </div>
      </div>
    </div>
  )
}
