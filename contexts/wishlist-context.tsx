"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

export type WishlistItem = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  slug: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string | number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string | number) => boolean;
  itemCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize wishlist from localStorage on client side
  useEffect(() => {
    setIsClient(true);
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
        localStorage.removeItem("wishlist");
      }
    }
  }, []);

  // Update localStorage when wishlist changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  }, [items, isClient]);

  // Add item to wishlist
  const addItem = (item: WishlistItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  // Remove item from wishlist
  const removeItem = (id: string | number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Check if item is in wishlist
  const isInWishlist = (id: string | number) => {
    return items.some((item) => item.id === id);
  };

  // Clear wishlist
  const clearWishlist = () => {
    setItems([]);
  };

  // Calculate total item count
  const itemCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
