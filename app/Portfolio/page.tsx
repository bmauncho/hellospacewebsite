import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import FadeIn from "@/components/fade-in";
import { InteractiveGallery } from "@/components/interactive-gallery";

export const metadata = {
  title: "Portfolio - Hello Space Interior Design",
  description:
    "Explore our design portfolio showcasing a range of projects that exemplify our commitment to transforming spaces with innovative interior design.",
};

// This would typically come from a database or CMS
const projects = [
  {
    id: 1,
    title: "Modern Minimalist Living Room",
    description:
      "A clean, contemporary living space with sustainable furniture and natural light. This project focused on creating an open, airy environment that maximizes the available space while maintaining a warm, inviting atmosphere. We incorporated eco-friendly materials and energy-efficient lighting to align with the client's sustainability goals.",
    category: "Residential",
    location: "New York, NY",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
    featured: true,
  },
  {
    id: 2,
    title: "Scandinavian-Inspired Bedroom",
    description:
      "A serene bedroom design featuring neutral tones and functional storage solutions. The design emphasizes simplicity, clean lines, and natural materials to create a peaceful retreat. Custom-built storage solutions help maximize space while maintaining the minimalist aesthetic.",
    category: "Residential",
    location: "Boston, MA",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
  },
  {
    id: 3,
    title: "Creative Agency Office",
    description:
      "A collaborative workspace designed to inspire creativity and productivity. This open-concept office features flexible workstations, comfortable meeting areas, and strategic use of color to stimulate creative thinking. Acoustic solutions were incorporated to manage noise levels in the open environment.",
    category: "Commercial",
    location: "San Francisco, CA",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
    featured: true,
  },
  {
    id: 4,
    title: "Urban Loft Kitchen",
    description:
      "An industrial-inspired kitchen with modern appliances and custom cabinetry. This kitchen renovation preserved the loft's original character while introducing contemporary functionality. The design features exposed brick, stainless steel appliances, and a custom island that serves as both a workspace and gathering spot.",
    category: "Residential",
    location: "Chicago, IL",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
  },
  {
    id: 5,
    title: "Boutique Hotel Lobby",
    description:
      "A welcoming hotel lobby that combines luxury and comfort with a unique aesthetic. The design creates a memorable first impression for guests while providing practical check-in areas and comfortable seating. Custom lighting fixtures and locally-sourced artwork contribute to the distinctive atmosphere.",
    category: "Commercial",
    location: "Miami, FL",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
  },
  {
    id: 6,
    title: "Mid-Century Modern Dining Room",
    description:
      "A dining space that pays homage to mid-century design while feeling fresh and contemporary. This renovation preserved original architectural details while introducing modern comfort and functionality. The carefully curated furniture pieces include both vintage finds and contemporary interpretations of classic designs.",
    category: "Residential",
    location: "Seattle, WA",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
  },
  {
    id: 7,
    title: "Sustainable Office Renovation",
    description:
      "An environmentally conscious office redesign featuring recycled materials and energy-efficient systems. This project transformed an outdated office into a sustainable, healthy workspace. Features include natural lighting optimization, living walls, and furniture made from reclaimed materials.",
    category: "Commercial",
    location: "Portland, OR",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
  },
  {
    id: 8,
    title: "Contemporary Family Home",
    description:
      "A complete home redesign focused on creating functional spaces for a growing family. This project balanced sophisticated design with practical solutions for family living. Durable materials and clever storage solutions ensure the space remains beautiful despite the demands of daily family life.",
    category: "Residential",
    location: "Austin, TX",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
  },
  {
    id: 9,
    title: "Luxury Retail Space",
    description:
      "A high-end retail environment designed to showcase premium products and enhance the shopping experience. The design creates a sophisticated backdrop that highlights the merchandise while providing an immersive brand experience. Custom display fixtures and strategic lighting draw attention to featured products.",
    category: "Commercial",
    location: "Los Angeles, CA",
    image: "/Explore/scandinavian-bedroom.png?height=600&width=800",
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-[#f8f5f2]">
      <header className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/hero/hello-space-hero.png?height=800&width=1600"
          alt="Hello Space design portfolio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="container flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6">
            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Explore Our Design Portfolio
            </h1>
          </div>
        </div>
      </header>

      <main>
        <FadeIn>
          <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <p className="text-lg text-[#6b6963]">
                  Our portfolio showcases a range of projects that exemplify our
                  commitment to transforming spaces. From cozy living rooms to
                  expansive commercial areas, each project reflects a unique
                  blend of creativity, craftsmanship, and attention to detail.
                  Let our past work inspire your next home transformation.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="py-8 md:py-12">
            <div className="container px-4 md:px-6">
              <h2 className="mb-8 font-serif text-2xl font-medium text-center text-[#3c3a36]">
                Featured Projects
              </h2>
              <InteractiveGallery projects={projects} />
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="bg-[#3c3a36] py-16 text-white md:py-24">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                  Let&apos;s Create Your Dream Space
                </h2>
                <p className="mt-6 text-white/80">
                  Inspired by our portfolio? Let&apos;s work together to create
                  a space that reflects your unique style and meets your
                  specific needs. Our team of expert designers is ready to bring
                  your vision to life.
                </p>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="shadow-lg"
                  >
                    <Link href="/Consultation">Book a Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
