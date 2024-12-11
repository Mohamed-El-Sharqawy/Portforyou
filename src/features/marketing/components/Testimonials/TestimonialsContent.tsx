"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { RetroGrid } from "@/components/ui/retro-grid";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function TestimonialsContent() {
  const isMobile = useIsMobile();

  return (
    <div
      style={isMobile ? { borderWidth: "0px" } : { borderWidth: "1px" }}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden border rounded-lg md:shadow-xl py-20"
    >
      <AnimatedTestimonials />
      
      {!isMobile && <RetroGrid />}
    </div>
  );
}
