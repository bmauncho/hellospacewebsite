import Link from "next/link";
import FadeIn from "./fade-in";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { AccentHeading } from "./accent-heading";

export function CuratedFurniture() {
  return (
    <FadeIn>
      <section className="bg-[#e9e5e0] py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <AccentHeading
              as="h2"
              accentPosition="bottom"
              className="text-3xl font-medium tracking-tight sm:text-4xl mx-auto flex justify-center"
            >
              Curated Furniture Collections That Define Style
            </AccentHeading>
            <p className="mt-4 text-[#6b6963]">
              At Hello Space, we offer a diverse range of quality furniture that
              blends style with functionality. Each piece is designed to
              complement modern interiors and create a harmonious balance in
              your home. Shop our collection and find the perfect statement
              pieces that not only enhance your decor but also stand the test of
              time.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Modern Lounge Chair",
                price: "$895",
                image: "/curated/modern-lounge-chair.png?height=600&width=600",
              },
              {
                name: "Sustainable Coffee Table",
                price: "$645",
                image:
                  "/curated/sustainable-coffee-table.png?height=600&width=600",
              },
              {
                name: "Designer Pendant Light",
                price: "$325",
                image:
                  "/curated/designer-pendant-light.png?height=600&width=600",
              },
            ].map((item, index) => (
              <Link key={index} href="/shop" className="group">
                <div className="overflow-hidden rounded-lg bg-white">
                  <div className="relative aspect-square">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0">
                      <Badge variant="accent" className="m-3">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-medium text-[#3c3a36]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-brand-accent font-medium">
                      {item.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="accent">
              <Link href="/shop">Shop All Furniture</Link>
            </Button>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
