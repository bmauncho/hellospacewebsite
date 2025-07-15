import { AccentHeading } from "./accent-heading";
import FadeIn from "./fade-in";

export function Innovate() {
  return (
    <FadeIn>
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <AccentHeading
              as="h2"
              accentPosition="bottom"
              className="text-3xl font-medium tracking-tight sm:text-4xl mx-auto flex justify-center"
            >
              Innovative Interior Design Solutions
            </AccentHeading>
            <p className="mt-4 text-lg text-[#6b6963]">
              At Hello Space, we believe that every home deserves to tell its
              own story. Our expert interior design consultations are tailored
              to meet your lifestyle and aesthetic needs. From modern minimalist
              looks to vibrant, eclectic styles, our designs and furniture bring
              your vision to life. Explore our portfolio to see how we&apos;ve
              turned everyday spaces into extraordinary experiences.
            </p>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
