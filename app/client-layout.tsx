"use client";

import LoadingScreen from "@/components/loadingScreen";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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

//"use client";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (hasVisitedBefore) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, pages[pathname] || LOADING_DURATIONS.default);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, hasVisitedBefore]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#171717] antialiased">
      <LoadingScreen isLoading={isLoading} />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}
