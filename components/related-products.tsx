"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// This would typically come from a database or CMS
const relatedProducts = [
  {
    id: "natural-linen-throw-pillow",
    name: "Natural Linen Throw Pillow",
    price: 42.0,
    image: "/placeholder.svg?height=600&width=600",
    category: "Textiles",
  },
  {
    id: "olive-wood-serving-board",
    name: "Olive Wood Serving Board",
    price: 56.0,
    image: "/placeholder.svg?height=600&width=600",
    category: "Kitchen",
  },
  {
    id: "handwoven-seagrass-basket",
    name: "Handwoven Seagrass Basket",
    price: 38.0,
    image: "/placeholder.svg?height=600&width=600",
    category: "Storage",
  },
  {
    id: "ceramic-dinner-plates-set",
    name: "Ceramic Dinner Plates Set",
    price: 72.0,
    image: "/placeholder.svg?height=600&width=600",
    category: "Dining",
  },
]

export default function RelatedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#e2ded9] bg-white/80 backdrop-blur-sm"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-64 flex-shrink-0">
            <Link href={`/shop/${product.id}`} className="group block">
              <div className="overflow-hidden rounded-lg bg-white">
                <div className="relative aspect-square">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#6b6963]">{product.category}</div>
                  <h3 className="mt-1 font-serif text-base font-medium text-[#3c3a36]">{product.name}</h3>
                  <p className="mt-1 text-sm text-[#6b6963]">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#e2ded9] bg-white/80 backdrop-blur-sm"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}
