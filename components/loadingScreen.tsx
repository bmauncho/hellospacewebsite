"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
interface LoadingScreenProps {
  isLoading?: boolean;
}

export default function LoadingScreen({
  isLoading = false,
}: LoadingScreenProps) {
  const [visible, setVisible] = useState(isLoading);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (isLoading) {
      timer = window.setTimeout(() => {
        setFadeOut(true);
      }, 1500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && visible) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setFadeOut(false);
      }, 600); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    } else if (isLoading && !visible) {
      setVisible(true);
    }
  }, [isLoading, visible]);

  if (!visible) {
    return null; // Don't render anything if not visible
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a2722] transition-opacity duration-600"
      style={{ opacity: visible && !fadeOut ? 1 : 0 }}
    >
      {/* hello space logo */}
      <div className="relative flex flex-col items-center px-4">
        <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 animate-pulse">
          <Image
            src="/logo/hello-space-logo.png"
            alt="Hello Space Logo"
            width={128}
            height={128}
            className="animate-pulse w-full h-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
