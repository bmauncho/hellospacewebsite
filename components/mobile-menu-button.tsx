"use client"

import { cn } from "@/lib/utils"

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function MobileMenuButton({ isOpen, onClick, className }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className={cn("flex h-10 w-10 items-center justify-center rounded-md", className)}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="relative h-5 w-5">
        <span
          className={cn(
            "absolute left-0 top-1/2 block h-0.5 w-5 bg-current transition-all duration-300",
            isOpen ? "rotate-45" : "-translate-y-1",
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-1/2 block h-0.5 w-5 bg-current transition-all duration-300",
            isOpen ? "opacity-0" : "opacity-100",
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-1/2 block h-0.5 w-5 bg-current transition-all duration-300",
            isOpen ? "-rotate-45" : "translate-y-1",
          )}
        />
      </div>
    </button>
  )
}
