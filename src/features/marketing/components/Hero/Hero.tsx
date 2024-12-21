import { Vortex } from "@/components/ui/vortex";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="w-[calc(100%)] mx-auto rounded-md h-screen overflow-hidden">
        <Vortex
          backgroundColor="transparent"
          rangeY={550}
          particleCount={200}
          baseHue={160}
          className="flex items-center justify-center py-4 w-full h-full"
        >
          <HeroContent />
        </Vortex>
      </div>
    </section>
  );
}
