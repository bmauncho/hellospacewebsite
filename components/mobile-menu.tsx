import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";
type MenuItem = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  menuItems: MenuItem[];
  pathname: string;
  isShopRelatedPage: boolean;
};
export function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  menuItems,
  pathname,
  isShopRelatedPage,
}: MobileMenuProps) {
  const { user, signOut } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div
      className={cn(
        "fixed top-0 right-0 z-[100] w-full max-w-sm bg-background shadow-xl transition-transform duration-300 ease-in-out md:hidden",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{
        maxHeight: "100vh",
        height: "100vh",
        borderBottomLeftRadius: "1rem",
      }}
    >
      <div className="flex h-full flex-col overflow-y-auto p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/logo/hello-space-logo.png"
              alt="Hello Space Logo"
              width={32}
              height={32}
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#6b6963]"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        {/* User Account Section */}
        {isClient && user && (
          <div className="mb-6 rounded-lg border border-[#e2ded9] bg-[#f8f5f2] p-4">
            <div className="mb-3">
              <p className="font-medium text-[#3c3a36]">{user.name}</p>
              <p className="text-sm text-[#6b6963] truncate">{user.email}</p>
            </div>
            <div className="space-y-2">
              <Link
                href="/account"
                className="block rounded-md px-3 py-2 text-sm font-medium text-[#6b6963] transition-colors hover:bg-[#e2ded9] hover:text-[#3c3a36]"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              <Link
                href="/account/orders"
                className="block rounded-md px-3 py-2 text-sm font-medium text-[#6b6963] transition-colors hover:bg-[#e2ded9] hover:text-[#3c3a36]"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                href="/Wishlist"
                className="block rounded-md px-3 py-2 text-sm font-medium text-[#6b6963] transition-colors hover:bg-[#e2ded9] hover:text-[#3c3a36]"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#6b6963] transition-colors hover:bg-[#e2ded9] hover:text-[#3c3a36]"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Menu items */}
        <nav className="mt-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li
                key={item.href}
                className={cn(
                  "transform transition-all duration-300 ease-in-out",
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                )}
                style={{ transitionDelay: `${150 + index * 50}ms` }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium text-[#6b6963] transition-colors hover:bg-[#e2ded9] hover:text-[#3c3a36]",
                    pathname === item.href &&
                      "bg-[#c17c60] text-white hover:bg-[#a66a52] hover:text-white"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {isClient && !user && isShopRelatedPage && (
              <li
                className={cn(
                  "transform transition-all duration-300 ease-in-out",
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                )}
                style={{
                  transitionDelay: `${150 + (menuItems.length + 1) * 50}ms`,
                }}
              >
                <Link
                  href="/auth/sign-in"
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#6b6963] transition-colors hover:bg-[#e2ded9] hover:text-[#3c3a36]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            )}
            <li
              className={cn(
                "transform transition-all duration-300 ease-in-out pt-4",
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              )}
              style={{
                transitionDelay: `${150 + (menuItems.length + 2) * 50}ms`,
              }}
            >
              <Button
                asChild
                className="w-full bg-[#a8a49e] text-white hover:bg-[#8c8880]"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/Consultation">Book Consultation</Link>
              </Button>
            </li>
          </ul>
        </nav>

        {/* Footer icons and text */}
        <div
          className={cn(
            "mt-auto pt-8 transform transition-all duration-300 ease-in-out",
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
          style={{ transitionDelay: `${150 + (menuItems.length + 4) * 50}ms` }}
        >
          <div className="flex space-x-4 items-center justify-center">
            {/* Social Icons */}
            {/* Instagram */}
            <Button
              variant="accent"
              size="icon"
              className="text-background hover:text-[#3c3a36]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Button>

            {/* Facebook */}
            <Button
              variant="accent"
              size="icon"
              className="text-background hover:text-[#3c3a36]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Button>

            {/* Twitter */}
            <Button
              variant="accent"
              size="icon"
              className="text-background hover:text-[#3c3a36]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-[#6b6963]">
            © {new Date().getFullYear()} Hello Space
          </p>
        </div>
      </div>
    </div>
  );
}
