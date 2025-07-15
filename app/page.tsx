import { Team } from "@/components/hellospaceteam";
import { Hero } from "@/components/hero";
import { Innovate } from "@/components/innovate";
import { OurServices } from "@/components/our-services";

export default function Home() {
  return (
    <div className="bg-[#f8f5f2]">
      <Hero />
      <main>
        <Innovate />
        <Team />
        <OurServices />
      </main>
    </div>
  );
}
