import { Hero } from "@/components/hero";
import { Innovate } from "@/components/innovate";

export default function Home() {
  return (
    <div className="bg-[#f8f5f2]">
      <Hero />
      <main>
        <Innovate />
      </main>
    </div>
  );
}
