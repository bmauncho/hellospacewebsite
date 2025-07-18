"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Define project types
type Project = {
  id: number
  title: string
  description: string
  category: string
  location: string
  image: string
  featured?: boolean
}

interface InteractiveGalleryProps {
  projects: Project[]
  className?: string
}

export function InteractiveGallery({ projects, className }: InteractiveGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Get unique categories for filters
  const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category.toLowerCase())))]

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category.toLowerCase() === activeFilter)

  // Handle lightbox navigation
  const navigateGallery = (direction: "next" | "prev") => {
    if (!selectedProject) return

    const currentIndex = filteredProjects.findIndex((project) => project.id === selectedProject.id)
    let newIndex: number

    if (direction === "next") {
      newIndex = currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1
    }

    setSelectedProject(filteredProjects[newIndex])
  }

  const openLightbox = (project: Project) => {
    setSelectedProject(project)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    // Small delay to allow exit animation to complete
    setTimeout(() => setSelectedProject(null), 300)
  }

  // Handle filter change
  const handleFilterChange = (category: string) => {
    setActiveFilter(category)

    // Scroll to top of gallery when filter changes
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className={cn("space-y-6", className)} ref={galleryRef}>
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className={cn(
              "cursor-pointer capitalize transition-all hover:bg-[#a8a49e] hover:text-white",
              activeFilter === category ? "bg-[#a8a49e] text-white" : "bg-white text-[#6b6963]",
            )}
            onClick={() => handleFilterChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3" layout initial={false}>
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md",
                project.featured && "md:col-span-2 md:row-span-2",
              )}
              onClick={() => openLightbox(project)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  openLightbox(project)
                }
              }}
              role="button"
              aria-label={`View ${project.title}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end opacity-100 transition-opacity group-hover:opacity-100">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">{project.category}</div>
                  <h3 className="mt-1 font-serif text-xl font-medium text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{project.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-[#6b6963]">No projects found for this category. Please try another filter.</p>
        </div>
      )}

      {/* Lightbox Component */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        project={selectedProject}
        projects={filteredProjects}
        onNavigate={navigateGallery}
      />
    </div>
  )
}
