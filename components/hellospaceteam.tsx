import { Button } from "@/components/ui/button";
import { AccentHeading } from "./accent-heading";
import FadeIn from "./fade-in";
import Link from "next/link";
import Image from "next/image";

export function Team() {
  return (
    <FadeIn>
      <section className="bg-[#e9e5e0] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <AccentHeading
                as="h2"
                className="text-3xl font-medium tracking-tight sm:text-4xl"
              >
                Meet the Team Behind Hello Space
              </AccentHeading>
              <p className="text-[#6b6963]">
                Hello Space was created out of a shared passion for design and a
                commitment to excellence. As equal partners, Emma and Brenda
                combine their expertise to deliver personalized interior design
                services and unique furniture collections. With a focus on
                sustainability and modern aesthetics, we help you create a space
                that reflects your personality and lifestyle.
              </p>
              <div className="pt-4">
                <Button asChild variant="ghost" size="lg">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg group">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/Team/Emma.png?height=600&width=450"
                    alt="Emma, Co-founder of Hello Space"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-white p-4">
                  <h3 className="font-serif text-lg font-medium text-[#3c3a36]">
                    Emma
                  </h3>
                  <p className="text-sm text-[#6b6963]">
                    Co-founder & Design Director
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg group">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/Team/Brenda.png?height=600&width=450"
                    alt="Brenda, Co-founder of Hello Space"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-white p-4">
                  <h3 className="font-serif text-lg font-medium text-[#3c3a36]">
                    Brenda
                  </h3>
                  <p className="text-sm text-[#6b6963]">
                    Co-founder & Furniture Specialist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
