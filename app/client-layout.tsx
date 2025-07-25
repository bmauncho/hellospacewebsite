"use client";

import LoadingScreen from "@/components/loadingScreen";
import { SiteHeader } from "@/components/site-header";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const LOADING_DURATIONS = {
  // Initial page load
  initial: 2500,

  // Minimum loading time for any page transition
  minimum: 800,

  // Maximum loading time for any page transition
  maximum: 3000,

  // Default loading time for pages
  default: 1200,
};

const pages: Record<string, number> = {
  "/": LOADING_DURATIONS.initial,
  "/About": LOADING_DURATIONS.default,
  "/Services": LOADING_DURATIONS.default,
  "/Portfolio": LOADING_DURATIONS.default,
  "/Contact": LOADING_DURATIONS.default,
  "/Shop": LOADING_DURATIONS.default,
  "/Consultation": LOADING_DURATIONS.default,
};

// Component that uses useSearchParams - needs to be wrapped in Suspense
function SearchParamsHandler({ 
  pathname, 
  hasVisitedBefore, 
  setIsLoading 
}: { 
  pathname: string;
  hasVisitedBefore: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (hasVisitedBefore) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, pages[pathname] || LOADING_DURATIONS.default);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, hasVisitedBefore, setIsLoading]);

  return null;
}

// "use client";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setIsLoading(true);
      setHasVisitedBefore(false);
    } else {
      setIsLoading(false);
      setHasVisitedBefore(true);
    }
  }, []);

  useEffect(() => {
    if (hasVisitedBefore) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATIONS.initial);
    return () => clearTimeout(timer);
  }, [hasVisitedBefore]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div
              className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
            >
              <LoadingScreen isLoading={isLoading} />
              <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsHandler 
                  pathname={pathname}
                  hasVisitedBefore={hasVisitedBefore}
                  setIsLoading={setIsLoading}
                />
                <SiteHeader />
                {children}
              </Suspense>
              <Toaster />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
