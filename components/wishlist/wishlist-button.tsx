"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { useWishlist } from "@/contexts/wishlist-context";

interface WishlistButtonProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function WishlistButton({
  product,
  variant = "outline",
  size = "icon",
  className,
}: WishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const isActive = isInWishlist(product.id);

  const handleToggleWishlist = async () => {
    setIsLoading(true);

    try {
      if (isActive) {
        removeItem(product.id);
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        });
      } else {
        addItem(product);
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast({
        title: "Error",
        description: "Could not update wishlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "transition-all duration-200",
        isActive && "text-red-500 hover:text-red-600",
        isLoading && "opacity-70",
        className
      )}
      disabled={isLoading}
      onClick={handleToggleWishlist}
      aria-label={isActive ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-5 w-5", isActive && "fill-current")} />
    </Button>
  );
}
