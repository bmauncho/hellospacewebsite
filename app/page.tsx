import { Consultations } from "@/components/consultations";
import { CuratedFurniture } from "@/components/curated-furniture";
import { ExplorePortfolio } from "@/components/explore-portfolio";
import { Team } from "@/components/hellospaceteam";
import { Hero } from "@/components/hero";
import { Innovate } from "@/components/innovate";
import { LetsWorkTogether } from "@/components/lets-work-together";
import { OurServices } from "@/components/our-services";
import { Testimonials } from "@/components/testimonials";

export const metadata = {
  title: "Hello Space – Innovative Interior Design & Quality Furniture",
  description:
    "Discover Hello Space – your destination for expert interior design consultations, stylish furniture, and inspiring portfolios. Book your consultation today!",
};

export default function Home() {
  return (
    <div className="bg-[#f8f5f2]">
      <header className="relative h-screen w-full overflow-hidden">
        <Hero />
      </header>
      <main className="w-full">
        <Innovate />
        <Team />
        <OurServices />
        <Consultations />
        <ExplorePortfolio />
        {/* <CuratedFurniture /> */}
        <Testimonials />
        <LetsWorkTogether />
      </main>
    </div>
  );
}
