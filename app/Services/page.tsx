import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/fade-in";

export const metadata = {
  title: "Interior Design Services - Hello Space",
  description:
    "Transform your home with expert interior design services from Hello Space. Book a consultation today for creative solutions tailored to your space.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#f8f5f2]">
      <header className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/hero/hello-space-hero.png?height=800&width=1600"
          alt="Hello Space interior design services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6">
            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Transform Your Home with Expert Interior Design
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
                  Our interior design consultation services are crafted to offer
                  creative solutions for every space. Whether you&apos;re
                  renovating your home or seeking a fresh style update, our
                  experienced team listens to your needs and provides innovative
                  design concepts that bring functionality and beauty together.
                  Book a consultation with us today and experience a
                  transformation tailored just for you.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="bg-[#e9e5e0] py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36] sm:text-4xl">
                  Our Services
                </h2>
                <p className="mt-4 text-[#6b6963]">
                  From initial consultation to complete home transformation, we
                  offer a range of services to meet your interior design needs.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-[#e2ded9] bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e5e0]">
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
                        className="text-[#a8a49e]"
                      >
                        <path d="M2 3h20"></path>
                        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                        <path d="m7 21 5-5 5 5"></path>
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
                      Design Consultation
                    </h3>
                    <p className="mt-2 text-[#6b6963]">
                      Our professional design consultation is the perfect
                      starting point for any project. We&apos;ll discuss your
                      needs, preferences, and budget to create a personalized
                      design plan.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">
                          In-home or virtual consultation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">Style assessment</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">
                          Preliminary design recommendations
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button
                        asChild
                        className="w-full bg-[#a8a49e] text-white hover:bg-[#8c8880]"
                      >
                        <Link href="/Consultation">Book Consultation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#e2ded9] bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e5e0]">
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
                        className="text-[#a8a49e]"
                      >
                        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                        <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
                        <path d="M12 12h.01"></path>
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
                      Full-Service Design
                    </h3>
                    <p className="mt-2 text-[#6b6963]">
                      Our comprehensive design service covers everything from
                      concept to completion, ensuring a seamless transformation
                      of your space.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">
                          Space planning and layout design
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">
                          Furniture and material selection
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">
                          Project management and installation
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button
                        asChild
                        className="w-full bg-[#a8a49e] text-white hover:bg-[#8c8880]"
                      >
                        <Link href="/Consultation">Learn More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#e2ded9] bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e5e0]">
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
                        className="text-[#a8a49e]"
                      >
                        <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
                        <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"></path>
                        <path d="M4 12h16"></path>
                        <path d="M9 12v4"></path>
                        <path d="M15 12v4"></path>
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
                      Furniture Selection
                    </h3>
                    <p className="mt-2 text-[#6b6963]">
                      Let us help you find the perfect furniture pieces to
                      complement your space, with access to exclusive designer
                      collections.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">
                          Curated furniture recommendations
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">
                          Access to trade-only resources
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-[#a8a49e]" />
                        <span className="text-[#6b6963]">
                          Custom furniture design
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button
                        asChild
                        className="w-full bg-[#a8a49e] text-white hover:bg-[#8c8880]"
                      >
                        <Link href="/Shop">Shop Furniture</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="bg-[#e9e5e0] py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src="/process/process.png?height=600&width=800"
                    alt="Interior design process"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36]">
                    Our Design Process
                  </h2>
                  <p className="text-[#6b6963]">
                    At Hello Space, we follow a structured design process to
                    ensure that every project meets our high standards of
                    quality and exceeds our clients&apos; expectations.
                  </p>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#a8a49e] text-white">
                        1
                      </span>
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">
                          Initial Consultation
                        </h3>
                        <p className="text-sm text-[#6b6963]">
                          We begin by understanding your needs, preferences, and
                          budget to establish the foundation of your project.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#a8a49e] text-white">
                        2
                      </span>
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">
                          Concept Development
                        </h3>
                        <p className="text-sm text-[#6b6963]">
                          Our designers create detailed concept boards and space
                          plans that bring your vision to life.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#a8a49e] text-white">
                        3
                      </span>
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">
                          Design Presentation
                        </h3>
                        <p className="text-sm text-[#6b6963]">
                          We present our design concepts, including furniture
                          selections, color schemes, and material samples.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#a8a49e] text-white">
                        4
                      </span>
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">
                          Implementation
                        </h3>
                        <p className="text-sm text-[#6b6963]">
                          We manage the entire implementation process, from
                          ordering furniture to final styling.
                        </p>
                      </div>
                    </li>
                  </ol>
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
                  Book Your Free Design Consultation Today!
                </h2>
                <p className="mt-4 text-[#6b6963]">
                  Ready to start your home transformation? Book a consultation
                  with Hello Space and take the first step toward creating a
                  space that truly reflects you. Our expert designers are here
                  to guide you through every step of the process—from initial
                  ideas to the final design.
                </p>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#a8a49e] text-white hover:bg-[#8c8880]"
                  >
                    <Link href="/Consultation">Schedule Your Consultation</Link>
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
