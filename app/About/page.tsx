import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import FadeIn from "@/components/fade-in";

export const metadata = {
  title: "About Us - Hello Space Interior Design",
  description:
    "Meet the team behind Hello Space. Learn about our passion for design and commitment to excellence in interior design and furniture.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#f8f5f2]">
      <header className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/hero/hello-space-hero.png"
          alt="Hello Space design studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6">
            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Meet the Team Behind Hello Space
            </h1>
          </div>
        </div>
      </header>

      <main>
        <FadeIn>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <p className="text-lg text-[#6b6963]">
                  Hello Space was created out of a shared passion for design and
                  a commitment to excellence. As equal partners, Emma and Brenda
                  combine their expertise to deliver personalized interior
                  design services and unique furniture collections. With a focus
                  on sustainability and modern aesthetics, we help you create a
                  space that reflects your personality and lifestyle.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="bg-[#e9e5e0] py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src="/Team/Emma.png?height=800&width=640"
                    alt="Emma, Co-founder of Hello Space"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36]">
                    Emma
                  </h2>
                  <p className="text-[#6b6963]">
                    With over 15 years of experience in interior design, Emma
                    brings a wealth of knowledge and creativity to Hello Space.
                    Her background in architecture and passion for sustainable
                    design inform her approach to creating spaces that are both
                    beautiful and functional.
                  </p>
                  <p className="text-[#6b6963]">
                    Emma specializes in residential design, with a particular
                    focus on creating harmonious living spaces that reflect the
                    unique personalities and lifestyles of her clients. Her
                    designs have been featured in numerous publications,
                    including Interior Design Magazine and Modern Home.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/Portfolio"
                      className="group inline-flex items-center text-sm font-medium text-[#3c3a36]"
                    >
                      View Emma&apos;s Projects
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div className="space-y-4 md:order-last">
                  <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36]">
                    Brenda
                  </h2>
                  <p className="text-[#6b6963]">
                    Brenda&apos;s expertise in furniture design and product
                    development makes her an invaluable part of the Hello Space
                    team. With a background in industrial design and a passion
                    for craftsmanship, she curates our furniture collections
                    with an eye for quality, sustainability, and timeless style.
                  </p>
                  <p className="text-[#6b6963]">
                    Her relationships with artisans and manufacturers around the
                    world allow Hello Space to offer unique, handcrafted pieces
                    that you won&apos;t find anywhere else. Brenda believes that
                    furniture should not only be beautiful but also functional
                    and built to last.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/Portfolio"
                      className="group inline-flex items-center text-sm font-medium text-[#3c3a36]"
                    >
                      Explore Our Furniture
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src="/Team/Brenda.png?height=800&width=640"
                    alt="Brenda, Co-founder of Hello Space"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="bg-[#3c3a36] py-16 text-white md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                  Our Philosophy
                </h2>
                <p className="mt-6 text-white/80">
                  At Hello Space, we believe that good design should be
                  accessible to everyone. We work closely with our clients to
                  understand their needs, preferences, and budget, creating
                  customized solutions that transform their spaces into places
                  they love to be.
                </p>
                <p className="mt-4 text-white/80">
                  Sustainability is at the core of everything we do. We
                  prioritize eco-friendly materials, energy-efficient solutions,
                  and furniture that is built to last. Our goal is to create
                  beautiful spaces that are also kind to the planet.
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

        <FadeIn>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36] sm:text-4xl">
                  Our Process
                </h2>
                <p className="mt-4 text-[#6b6963]">
                  We believe in a collaborative approach to design, working
                  closely with our clients at every step of the process.
                </p>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: "01",
                    title: "Consultation",
                    description:
                      "We begin with a thorough consultation to understand your needs, preferences, and budget.",
                  },
                  {
                    step: "02",
                    title: "Concept Development",
                    description:
                      "Based on our consultation, we develop design concepts that align with your vision.",
                  },
                  {
                    step: "03",
                    title: "Design Refinement",
                    description:
                      "We refine the design based on your feedback, ensuring every detail meets your expectations.",
                  },
                  {
                    step: "04",
                    title: "Implementation",
                    description:
                      "We oversee the implementation of the design, from furniture selection to final styling.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg border border-[#e2ded9] bg-white p-6"
                  >
                    <div className="absolute -right-2 -top-2 text-6xl font-bold text-[#e9e5e0]">
                      {item.step}
                    </div>
                    <h3 className="relative font-serif text-xl font-medium text-[#3c3a36]">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-[#6b6963]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="bg-[#e9e5e0] py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36] sm:text-4xl">
                  Ready to Transform Your Space?
                </h2>
                <p className="mt-4 text-[#6b6963]">
                  Book a consultation with Hello Space today and take the first
                  step toward creating a space that truly reflects your
                  personality and lifestyle.
                </p>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="accent"
                    className="bg-[#a8a49e] text-white hover:bg-[#8c8880]"
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
