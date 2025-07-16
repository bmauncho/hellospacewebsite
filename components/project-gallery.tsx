"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// This would typically come from a database or CMS
const projects = [
  {
    id: 1,
    title: "Modern Minimalist Living Room",
    description:
      "A clean, contemporary living space with sustainable furniture and natural light.",
    category: "Residential",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Scandinavian-Inspired Bedroom",
    description:
      "A serene bedroom design featuring neutral tones and functional storage solutions.",
    category: "Residential",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Creative Agency Office",
    description:
      "A collaborative workspace designed to inspire creativity and productivity.",
    category: "Commercial",
    image: "/placeholder.svg?height=600&width=800",
    featured: true,
  },
  {
    id: 4,
    title: "Urban Loft Kitchen",
    description:
      "An industrial-inspired kitchen with modern appliances and custom cabinetry.",
    category: "Residential",
    image: "/placeholder.svg?height=600&width=800",
  },
];

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <Dialog key={project.id}>
          <DialogTrigger asChild>
            <div
              className="group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {project.featured && (
                  <div className="absolute top-0 right-0 m-3">
                    <Badge variant="accent">Featured</Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end opacity-100 transition-opacity group-hover:opacity-100">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">
                    {project.category}
                  </div>
                  <h3 className="mt-1 font-serif text-xl font-medium text-white">
                    {project.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-brand-accent/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            {selectedProject && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium uppercase tracking-wider text-brand-accent">
                    {selectedProject.category}
                  </div>
                  <DialogTitle asChild>
                    <h3 className="font-serif text-2xl font-medium text-[#3c3a36]">
                      {selectedProject.title}
                    </h3>
                  </DialogTitle>
                  <p className="text-[#6b6963]">
                    {selectedProject.description}
                  </p>
                  <div className="pt-4">
                    <Link
                      href={`/portfolio/${selectedProject.id}`}
                      className="inline-flex items-center text-sm font-medium text-brand-accent hover:text-brand-accent/80"
                    >
                      View Project Details
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
