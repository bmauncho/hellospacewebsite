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
        "border-[#e2ded9] bg-white relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-accent/10 rounded-bl-3xl" />
      <CardContent className="p-6">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "fill-brand-accent text-brand-accent"
                  : "text-[#e2ded9]"
              }`}
            />
          ))}
        </div>
        <blockquote className="mt-4 relative">
          <span className="absolute -top-2 -left-1 text-4xl text-brand-accent opacity-20">
            &quot;
          </span>
          <p className="text-[#6b6963] relative z-10 pl-3">{content}</p>
          <span className="absolute -bottom-5 -right-1 text-4xl text-brand-accent opacity-20">
            !&quot;
          </span>
        </blockquote>
        <div className="mt-6 flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
            />
            <AvatarFallback className="bg-brand-accent/20 text-brand-accent">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-[#3c3a36]">{author.name}</div>
            <div className="text-sm text-[#6b6963]">{author.role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
