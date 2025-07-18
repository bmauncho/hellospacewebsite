"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
};

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  projects: Project[];
  onNavigate: (direction: "next" | "prev") => void;
}

export function GalleryLightbox({
  isOpen,
  onClose,
  project,
  projects,
  onNavigate,
}: GalleryLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Reset state when project changes
  useEffect(() => {
    setIsZoomed(false);
    setShowInfo(false);
  }, [project]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => {
      if (prev && lightboxRef.current) {
        lightboxRef.current.scrollTo(0, 0);
      }
      return !prev;
    });
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onNavigate("next");
      } else if (e.key === "ArrowLeft") {
        onNavigate("prev");
      } else if (e.key === "i") {
        setShowInfo((prev) => !prev);
      } else if (e.key === "z") {
        toggleZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNavigate, toggleZoom]);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    const horizontalDistance = touchStart.x - touchEnd.x;
    const verticalDistance = touchStart.y - touchEnd.y;

    // Only register as a swipe if the horizontal movement is greater than vertical
    // and greater than a minimum threshold
    if (
      Math.abs(horizontalDistance) > Math.abs(verticalDistance) &&
      Math.abs(horizontalDistance) > 50
    ) {
      if (horizontalDistance > 0) {
        // Swipe left, go to next
        onNavigate("next");
      } else {
        // Swipe right, go to previous
        onNavigate("prev");
      }
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
        >
          <div
            ref={lightboxRef}
            className="relative max-h-full max-w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
            tabIndex={0}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Lightbox Controls */}
            <div className="absolute right-4 top-4 z-10 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={toggleInfo}
                aria-label={showInfo ? "Hide information" : "Show information"}
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={toggleZoom}
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? (
                  <ZoomOut className="h-4 w-4" />
                ) : (
                  <ZoomIn className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close lightbox"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation Controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = projects.findIndex(
                  (p) => p.id === project.id
                );
                onNavigate(currentIndex - 1 >= 0 ? "prev" : "next");
                //onNavigate("prev");
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = projects.findIndex(
                  (p) => p.id === project.id
                );
                onNavigate(
                  currentIndex + 1 < projects.length ? "next" : "prev"
                );
                //onNavigate("next");
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image Container */}
            <div
              ref={imageRef}
              className="relative h-[80vh] w-[90vw] max-w-5xl overflow-auto"
            >
              <div
                className={cn(
                  "relative transition-all duration-300",
                  isZoomed ? "h-[150vh] w-[150vw]" : "h-full w-full"
                )}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className={cn(
                    "object-contain transition-transform duration-300",
                    isZoomed ? "object-cover" : "object-contain"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleZoom();
                  }}
                  style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
                />
              </div>
            </div>

            {/* Project Info Panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 bg-white/90 p-6 backdrop-blur-sm"
                >
                  <h2 className="font-serif text-2xl font-medium text-[#3c3a36]">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm text-[#6b6963]">
                    {project.location}
                  </p>
                  <div className="mt-2 text-[#6b6963]">
                    {project.description}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
