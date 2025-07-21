"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Star, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/fade-in";
import ProductGallery from "@/components/product-gallery";
import QuantitySelector from "@/components/quantity-selector";
import RelatedProducts from "@/components/related-products";
import ProductReviews from "@/components/product-reviews";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { WishlistButton } from "@/components/wishlist/wishlist-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would typically come from a database or CMS
const product = {
  id: "handcrafted-ceramic-vase",
  name: "Handcrafted Ceramic Vase",
  price: 68.0,
  description:
    "Elevate your space with our handcrafted ceramic vase, made by skilled artisans using traditional techniques. Each piece features subtle variations in texture and glaze, making it truly one-of-a-kind.",
  details:
    "Our ceramic vases are crafted from locally sourced clay and fired at high temperatures for durability. The natural, earthy finish complements both modern and traditional interiors, while the organic shape adds character to any space.",
  features: [
    "Handcrafted by skilled artisans",
    "Made from locally sourced clay",
    "Water-resistant glaze finish",
    "Suitable for fresh or dried flowers",
    "Each piece is unique with subtle variations",
  ],
  dimensions: {
    height: "10 inches",
    diameter: "6 inches",
    weight: "2.5 lbs",
  },
  colors: [
    { name: "Sand", value: "#e2ded9", inStock: true },
    { name: "Olive", value: "#a8a49e", inStock: true },
    { name: "Terracotta", value: "#c17c60", inStock: false },
  ],
  images: [
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
  ],
  rating: 4.8,
  reviewCount: 24,
  inStock: true,
  shipping: "Free shipping on orders over $100",
  delivery: "Usually ships within 2-3 business days",
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { slug } = use(params);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="bg-[#f8f5f2]">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm font-medium text-[#6b6963] hover:text-[#3c3a36]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Gallery */}
            <ProductGallery
              images={product.images}
              productName={product.name}
            />

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-2 bg-[#e9e5e0] text-[#6b6963] hover:bg-[#e9e5e0]">
                  New Arrival
                </Badge>
                <h1 className="font-serif text-3xl font-medium text-[#3c3a36] md:text-4xl">
                  {product.name}
                </h1>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-[#a8a49e] text-[#a8a49e]"
                            : "text-[#e2ded9]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#6b6963]">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <p className="mt-4 text-2xl font-medium text-[#3c3a36]">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-[#6b6963]">{product.description}</p>

              {/* Color Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#3c3a36]">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <div key={color.name} className="relative">
                      <button
                        className={`h-8 w-8 rounded-full border-2 ${
                          color.inStock ? "" : "opacity-50"
                        }`}
                        style={{
                          backgroundColor: color.value,
                          borderColor:
                            selectedColor.name === color.name
                              ? "#a8a49e"
                              : "#e2ded9",
                        }}
                        disabled={!color.inStock}
                        aria-label={`Select ${color.name} color`}
                        onClick={() => color.inStock && setSelectedColor(color)}
                      />
                      {!color.inStock && (
                        <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e2ded9] text-[8px] font-medium text-[#6b6963]">
                          ✕
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#6b6963]">
                  {product.inStock ? "In Stock" : "Out of Stock"} -{" "}
                  {product.delivery}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <QuantitySelector
                  initialQuantity={quantity}
                  onChange={handleQuantityChange}
                />
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <AddToCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                    }}
                    quantity={quantity}
                    className="w-full bg-[#a8a49e] text-white hover:bg-[#8c8880]"
                  />
                  <WishlistButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      slug: slug,
                    }}
                    variant="outline"
                    size="icon"
                    className="border-[#e2ded9] text-[#6b6963] hover:text-[#3c3a36]"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#e2ded9] text-[#6b6963] hover:text-[#3c3a36]"
                    aria-label="Share Product"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="rounded-lg bg-[#e9e5e0] p-4">
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-[#6b6963]" />
                  <div>
                    <p className="text-sm font-medium text-[#3c3a36]">
                      Shipping & Returns
                    </p>
                    <p className="mt-1 text-xs text-[#6b6963]">
                      {product.shipping}
                    </p>
                    <p className="mt-1 text-xs text-[#6b6963]">
                      Free returns within 30 days
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Details Tabs */}
              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="grid w-full grid-cols-3 bg-[#e9e5e0]">
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-white"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="dimensions"
                    className="data-[state=active]:bg-white"
                  >
                    Dimensions
                  </TabsTrigger>
                  <TabsTrigger
                    value="care"
                    className="data-[state=active]:bg-white"
                  >
                    Care
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4 space-y-4">
                  <p className="text-sm text-[#6b6963]">{product.details}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="mr-2 text-[#a8a49e]">•</span>
                        <span className="text-[#6b6963]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="dimensions" className="mt-4 space-y-2">
                  <p className="text-sm text-[#6b6963]">
                    <span className="font-medium text-[#3c3a36]">Height:</span>{" "}
                    {product.dimensions.height}
                  </p>
                  <p className="text-sm text-[#6b6963]">
                    <span className="font-medium text-[#3c3a36]">
                      Diameter:
                    </span>{" "}
                    {product.dimensions.diameter}
                  </p>
                  <p className="text-sm text-[#6b6963]">
                    <span className="font-medium text-[#3c3a36]">Weight:</span>{" "}
                    {product.dimensions.weight}
                  </p>
                </TabsContent>
                <TabsContent value="care" className="mt-4 space-y-2">
                  <p className="text-sm text-[#6b6963]">
                    Clean with a soft, damp cloth. Avoid harsh chemicals or
                    abrasive cleaners.
                  </p>
                  <p className="text-sm text-[#6b6963]">
                    Not dishwasher safe. Hand wash only if needed.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </FadeIn>

        <Separator className="my-16 bg-[#e2ded9]" />

        {/* Related Products */}
        <FadeIn>
          <section className="py-8">
            <h2 className="mb-8 font-serif text-2xl font-medium text-[#3c3a36]">
              You May Also Like
            </h2>
            <RelatedProducts />
          </section>
        </FadeIn>

        <Separator className="my-16 bg-[#e2ded9]" />

        {/* Product Reviews */}
        <FadeIn>
          <section className="py-8">
            <h2 className="mb-8 font-serif text-2xl font-medium text-[#3c3a36]">
              Customer Reviews
            </h2>
            <ProductReviews
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
