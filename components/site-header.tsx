"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileMenu } from "./mobile-menu";
import { Heart, LogOut, User } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";
import { CartDrawer } from "./cart/cart-drawer";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
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

  const isShopRelatedPage = () => {
    return (
      pathname?.startsWith("/Shop") ||
      pathname?.startsWith("/Wishlist") ||
      pathname?.startsWith("/checkout") ||
      pathname?.startsWith("/account") ||
      pathname?.startsWith("/auth")
    );
  };
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
          {user && isShopRelatedPage() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="User menu"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.name && <p className="font-medium">{user.name}</p>}
                    {user.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/Wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(event) => {
                    event.preventDefault();
                    signOut();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {!user && isShopRelatedPage() ? (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex"
                >
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
              ) : null}
            </>
          )}
          {isShopRelatedPage() && (
            <>
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
            </>
          )}
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
          isShopRelatedPage={isShopRelatedPage()}
        />
      </div>
    </header>
  );
}
