import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  rating: number;
  className?: string;
}

export function TestimonialCard({
  content,
  author,
  rating,
  className,
}: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        "border-[#e2ded9] bg-white relative overflow-hidden w-full max-w-none",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-brand-accent/10 rounded-bl-3xl" />
      <CardContent className="p-4 sm:p-6">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                i < rating
                  ? "fill-brand-accent text-brand-accent"
                  : "text-[#e2ded9]"
              }`}
            />
          ))}
        </div>
        <blockquote className="mt-3 sm:mt-4 relative">
          <span className="absolute -top-1 sm:-top-2 -left-1 text-2xl sm:text-4xl text-brand-accent opacity-20">
            &quot;
          </span>
          <p className="text-[#6b6963] relative z-10 pl-2 sm:pl-3 text-sm sm:text-base leading-relaxed">{content}</p>
          <span className="absolute -bottom-3 sm:-bottom-5 -right-1 text-2xl sm:text-4xl text-brand-accent opacity-20">
            !&quot;
          </span>
        </blockquote>
        <div className="mt-4 sm:mt-6 flex items-center space-x-2 sm:space-x-3">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
            <AvatarImage
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
            />
            <AvatarFallback className="bg-brand-accent/20 text-brand-accent text-xs sm:text-sm">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-[#3c3a36] text-sm sm:text-base truncate">{author.name}</div>
            <div className="text-xs sm:text-sm text-[#6b6963] truncate">{author.role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
