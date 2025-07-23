import Link from "next/link";
import FadeIn from "./fade-in";
import { Button } from "./ui/button";
import { AccentHeading } from "./accent-heading";
import { ProjectGallery } from "./project-gallery";

export function ExplorePortfolio() {
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
              Explore Our Design Portfolio
            </AccentHeading>
            <p className="mt-4 text-[#6b6963]">
              Our portfolio showcases a range of projects that exemplify our
              commitment to transforming spaces. From cozy living rooms to
              expansive commercial areas, each project reflects a unique blend
              of creativity, craftsmanship, and attention to detail. Let our
              past work inspire your next home transformation.
            </p>
          </div>
          <div className="mt-12">
            <ProjectGallery />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="accent">
              <Link href="/Portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
