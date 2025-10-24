import Link from "next/link";
import FadeIn from "./fade-in";
import { Button } from "./ui/button";
import { AccentDivider } from "./accent-divider";

export function Consultations() {
  return (
    <FadeIn>
      <section className="bg-[#3c3a36] py-16 text-white md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent opacity-10 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent opacity-10 rounded-tr-full" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              Transform Your Home with Expert Interior Design
            </h2>
            <AccentDivider className="mx-auto my-6" />
            <p className="mt-4 text-white/80">
              Our interior design consultation services are crafted to offer
              creative solutions for every space. Whether you&apos;re renovating
              your home or seeking a fresh style update, our experienced team
              listens to your needs and provides innovative design concepts that
              bring functionality and beauty together. Book a consultation with
              us today and experience a transformation tailored just for you.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="ghost" className="shadow-lg">
                <Link href="/Contact">Book Your Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
