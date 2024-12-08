import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { RetroGrid } from "@/components/ui/retro-grid";

import SectionsHeading from "@/components/ui/SectionsHeading";
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="marketing-section space-y-20"
    >
      <SectionsHeading text="Testimonials" />

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl">
        <AnimatedTestimonials />
        <RetroGrid />
      </div>
    </section>
  );
}
