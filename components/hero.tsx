import { Button } from "@/app/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <header className="relative h-screen w-full overflow-hidden">
      <Image
        src="/hero/hello-space-hero.png"
        alt="hello space hero image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50">
        <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center text-white md:px-6 max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            Where Design Meets Functionality
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            Welcome to Hello Space, where design meets functionality. Founded by
            passionate professionals (Emma & Brenda), we transform spaces with
            innovative interior design solutions and quality, handcrafted
            furniture.
          </p>
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild variant="accent" size="lg" className="shadow-lg">
              <Link href="/Consultation">Book a Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white bg-black/30 hover:bg-white/10"
            >
              <Link href="/Portfolio">View Our Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
