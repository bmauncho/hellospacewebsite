"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface AddToCartButtonProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

export function AddToCartButton({
  product,
  quantity,
  disabled = false,
  className,
  variant = "default",
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      // Add item to cart
      addItem(product, quantity);

      // Show success toast
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart.`,
      });
    } catch (error) {
      console.error("Error  adding item to cart:", error);
      // Show error toast
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <Button
      className={className}
      variant={variant}
      disabled={disabled || isLoading}
      onClick={handleAddToCart}
    >
      {isLoading ? (
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
  );
}
