import type * as React from "react"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Steps({ className, children, ...props }: StepsProps) {
  return (
    <div className={cn("relative space-y-8", className)} {...props}>
      <div className="absolute left-[15px] top-2 h-full w-[1px] bg-[#e2ded9]" />
      {children}
    </div>
  )
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  completed?: boolean
}

export function Step({ className, children, completed = false, ...props }: StepProps) {
  return (
    <div className={cn("relative pl-8", className)} {...props}>
      <div
        className={cn(
          "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border",
          completed ? "border-[#c17c60] bg-[#c17c60] text-white" : "border-[#e2ded9] bg-white text-[#6b6963]",
        )}
      >
        {completed ? (
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
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <span className="h-1 w-1 rounded-full bg-current" />
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}
