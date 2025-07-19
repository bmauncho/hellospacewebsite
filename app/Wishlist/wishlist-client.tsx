"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/wishlist-context";

import { useToast } from "@/components/ui/use-toast";
import FadeIn from "@/components/fade-in";
import { useCart } from "@/contexts/cart-context";
import { Separator } from "@/components/ui/separator";

export default function WishlistClient() {
  const { items, removeItem, clearWishlist, itemCount } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<Record<string | number, boolean>>(
    {}
  );
  const [isClient, setIsClient] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  interface CartItem {
    id: string | number;
    name: string;
    price: number;
    image: string;
  }

  const handleAddToCart = async (item: CartItem) => {
    setIsLoading((prev) => ({ ...prev, [item.id]: true }));

    try {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });

      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsLoading((prev) => ({ ...prev, [item.id]: false }));
      }, 500);
    }
  };

  const handleRemoveFromWishlist = (id: string | number, name: string) => {
    removeItem(id);
    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    });
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
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
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl font-medium text-[#3c3a36] md:text-4xl">
              My Wishlist
            </h1>
            {itemCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-[#6b6963] hover:text-[#3c3a36]"
                onClick={handleClearWishlist}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>

          <Separator className="my-6 bg-[#e2ded9]" />

          {itemCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-[#e9e5e0] p-4">
                <Heart className="h-8 w-8 text-[#a8a49e]" />
              </div>
              <h2 className="mb-2 text-xl font-medium text-[#3c3a36]">
                Your wishlist is empty
              </h2>
              <p className="mb-6 max-w-md text-[#6b6963]">
                Start adding items to your wishlist by clicking the heart icon
                on products you love.
              </p>
              <Button
                asChild
                className="bg-[#a8a49e] text-white hover:bg-[#8c8880]"
              >
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-[#6b6963]">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your
                wishlist
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg border border-[#e2ded9] bg-white p-2 transition-all hover:shadow-md"
                  >
                    <div className="absolute right-4 top-4 z-10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 text-[#6b6963] backdrop-blur-sm hover:bg-white hover:text-[#3c3a36]"
                        onClick={() =>
                          handleRemoveFromWishlist(item.id, item.name)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>

                    <Link
                      href={`/shop/${item.slug}`}
                      className="block overflow-hidden rounded-md"
                    >
                      <Image
                        src={
                          item.image || "/placeholder.svg?height=300&width=300"
                        }
                        alt={item.name}
                        width={300}
                        height={300}
                        className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>

                    <div className="p-4">
                      <Link href={`/shop/${item.slug}`}>
                        <h3 className="mb-1 font-medium text-[#3c3a36] line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mb-4 text-[#6b6963]">
                        ${item.price.toFixed(2)}
                      </p>

                      <Button
                        className="w-full bg-[#a8a49e] text-white hover:bg-[#8c8880]"
                        disabled={isLoading[item.id]}
                        onClick={() => handleAddToCart(item)}
                      >
                        {isLoading[item.id] ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
