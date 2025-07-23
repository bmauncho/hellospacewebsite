import { AccentHeading } from "./accent-heading";
import FadeIn from "./fade-in";
import { TestimonialCarousel } from "./testimonial-carousel";

export function Testimonials() {
  return (
    <FadeIn>
      <section className="py-16 md:py-24 relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#e9e5e0] to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="mx-auto max-w-3xl text-center">
            <AccentHeading
              as="h2"
              accentPosition="bottom"
              className="text-3xl font-medium tracking-tight sm:text-4xl mx-auto flex justify-center"
            >
              What Our Clients Say
            </AccentHeading>
            <p className="mt-4 text-[#6b6963]">
              Hear from our satisfied clients about their experience working
              with Hello Space.
            </p>
          </div>
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
