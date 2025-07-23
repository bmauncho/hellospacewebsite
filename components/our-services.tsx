import { AccentHeading } from "./accent-heading";
import FadeIn from "./fade-in";
import { FeatureCard } from "./feature-card";

export function OurServices() {
  return (
    <FadeIn>
      <section className="py-16 md:py-24">
        <div className="container mx-auto  px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <AccentHeading
              as="h2"
              accentPosition="bottom"
              className="text-3xl font-medium tracking-tight sm:text-4xl mx-auto flex justify-center"
            >
              Our Services
            </AccentHeading>
            <p className="mt-4 text-[#6b6963]">
              From initial consultation to final installation, we provide
              comprehensive interior design services tailored to your unique
              needs.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
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
                  className="text-brand-accent"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                  <path d="M12 12h.01" />
                </svg>
              }
              title="Interior Design Consultation"
              description="Our professional interior design consultations provide creative solutions tailored to your space and style preferences."
              link={{ href: "/services", label: "Learn More" }}
            />
            <FeatureCard
              icon={
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
                  className="text-brand-accent"
                >
                  <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
                  <path d="M4 12h16" />
                  <path d="M9 12v4" />
                  <path d="M15 12v4" />
                </svg>
              }
              title="Quality Furniture"
              description="Shop our curated collection of designer furniture that blends style, functionality, and sustainability."
              link={{ href: "/shop", label: "Shop Now" }}
            />
            <FeatureCard
              icon={
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
                  className="text-brand-accent"
                >
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              }
              title="Project Management"
              description="We handle every aspect of your design project, from concept to completion, ensuring a seamless experience."
              link={{ href: "/services", label: "Learn More" }}
            />
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
