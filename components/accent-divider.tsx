import { cn } from "@/lib/utils";

interface AccentDividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg" | "full";
}

export function AccentDivider({
  className,
  orientation = "horizontal",
  size = "md",
}: AccentDividerProps) {
  const sizeClasses = {
    sm: orientation === "horizontal" ? "w-16" : "h-16",
    md: orientation === "horizontal" ? "w-24" : "h-24",
    lg: orientation === "horizontal" ? "w-32" : "h-32",
    full: orientation === "horizontal" ? "w-full" : "h-full",
  };

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-[#C17C60] to-[#C17C60]/30",
        orientation === "horizontal" ? "h-0.5" : "w-0.5",
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
