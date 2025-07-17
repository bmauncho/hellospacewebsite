"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/testimonial-card";

// This would typically come from a database or CMS
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "Working with Hello Space transformed our home beyond our expectations. Emma and Brenda listened to our needs and created a design that perfectly reflects our lifestyle. The quality of furniture they recommended is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Apartment Owner",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "I was impressed by the professional interior design consultation from Hello Space. They maximized the space in my small apartment while maintaining a stylish, modern aesthetic. Their attention to detail is remarkable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Business Owner",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "Hello Space redesigned our office space, creating an environment that inspires creativity and productivity. Their furniture selections are both beautiful and functional. I highly recommend their services for any commercial project.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Homeowner",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "The team at Hello Space has an incredible eye for design. They transformed our outdated living room into a modern, comfortable space that we love spending time in. Their sustainable furniture options were exactly what we were looking for.",
    rating: 5,
  },
];

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  // Handle autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change testimonial every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, activeIndex]);

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next
      nextTestimonial();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous
      prevTestimonial();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevTestimonial();
      } else if (e.key === "ArrowRight") {
        nextTestimonial();
      }
    };

    // Only add event listener if carousel is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("keydown", handleKeyDown);
        } else {
          window.removeEventListener("keydown", handleKeyDown);
        }
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#e2ded9] bg-white/80 backdrop-blur-sm hover:bg-brand-accent hover:text-white hover:border-brand-accent"
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <TestimonialCard
                content={testimonial.content}
                author={{
                  name: testimonial.name,
                  role: testimonial.role,
                  avatar: testimonial.avatar,
                }}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#e2ded9] bg-white/80 backdrop-blur-sm hover:bg-brand-accent hover:text-white hover:border-brand-accent"
          onClick={nextTestimonial}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === activeIndex
                ? "bg-brand-accent"
                : "bg-[#e2ded9] hover:bg-brand-accent/50"
            }`}
            onClick={() => goToTestimonial(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
