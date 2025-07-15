import type React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: {
    href: string;
    label: string;
  };
  className?: string;
  iconClassName?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  link,
  className,
  iconClassName,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "border-[#e2ded9] bg-white overflow-hidden group",
        className
      )}
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-[#C17C60] transition-all duration-300 group-hover:w-full" />
      <CardContent className="p-6">
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e5e0]",
            iconClassName
          )}
        >
          {icon}
        </div>
        <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
          {title}
        </h3>
        <p className="mt-2 text-[#6b6963]">{description}</p>
        {link && (
          <div className="mt-4">
            <Link
              href={link.href}
              className="group inline-flex items-center text-sm font-medium text-[#C17C60] hover:text-[#C17C60]/80"
            >
              {link.label}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
