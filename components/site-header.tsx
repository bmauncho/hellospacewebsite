"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileMenu } from "./mobile-menu";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";
import { CartDrawer } from "./cart/cart-drawer";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount: wishlistCount } = useWishlist();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "/About", label: "About" },
    { href: "/Services", label: "Services" },
    { href: "/Portfolio", label: "Portfolio" },
    { href: "/Contact", label: "Contact" },
    { href: "/Shop", label: "Shop" },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e2ded9] bg-[#f8f5f2]/80 backdrop-blur-sm">
      <div className="container p-2 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/hello-space-logo.png"
            alt="Hello Space Logo"
            width={40}
            height={40}
          />
        </Link>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-[#6b6963]">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-[#3c3a36]",
                pathname === item.href && "text-[#6b6963] font-bold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/Wishlist" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#6b6963] hover:text-[#3c3a36]"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c17c60] text-xs font-medium text-white">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>
          <CartDrawer />
          <Button asChild variant="accent" size="lg" className="hidden md:flex">
            <Link href="/Consultation">Book Consultation</Link>
          </Button>
          <div className="md:hidden">
            <MobileMenuButton
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              className="text-[#6b6963]"
            />
          </div>
        </div>
      </div>
      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      {/* Mobile menu */}
      <div>
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          menuItems={menuItems}
          pathname={pathname}
        />
      </div>
    </header>
  );
}
