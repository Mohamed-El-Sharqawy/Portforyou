import HeroContent from "./HeroContent";

import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <AuroraBackground>
        <HeroContent />
      </AuroraBackground>
    </section>
  );
}
