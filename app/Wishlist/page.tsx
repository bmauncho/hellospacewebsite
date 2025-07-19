import { Metadata } from "next";
import WishlistClient from "./wishlist-client";

export const metadata: Metadata = {
  title: "Wishlist | Hello Space",
  description: "View and manage your saved items",
};

export function WishListPage() {
  return <WishlistClient />;
}
