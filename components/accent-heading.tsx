import type React from "react";
import { cn } from "@/lib/utils";

interface AccentHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  accentPosition?: "left" | "bottom";
}

export function AccentHeading({
  children,
  className,
  as: Component = "h2",
  accentPosition = "left",
}: AccentHeadingProps) {
  return (
    <div
      className={cn(
        "relative",
        accentPosition === "bottom" ? "pb-3" : "pl-4",
        className
      )}
    >
      <div
        className={cn(
          "absolute bg-[#C9986F]",
          accentPosition === "bottom"
            ? "bottom-0 left-0 h-1 w-16"
            : "left-0 top-1/2 h-full w-1 -translate-y-1/2 transform"
        )}
        aria-hidden="true"
      />
      <Component
        className={cn("font-serif", accentPosition === "left" ? "pl-3" : "")}
      >
        {children}
      </Component>
    </div>
  );
}
