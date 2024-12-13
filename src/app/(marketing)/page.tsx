"use client";

import Contact from "@/features/marketing/components/Contact/Contact";
import Hero from "@/features/marketing/components/Hero/Hero";
import Pricings from "@/features/marketing/components/Pricings/Pricings";
import Services from "@/features/marketing/components/Services/Services";
import Testimonials from "@/features/marketing/components/Testimonials/Testimonials";
import { useIsMobile } from "@/hooks/useIsMobile";

import Lenis from "lenis";

import { useEffect } from "react";

export default function Home() {
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    if (!isMobile) {
      // Use requestAnimationFrame to continuously update the scroll
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    } else {
      lenis.destroy();
    }

    return () => {
      lenis.destroy();
    };
  }, [isMobile]);

  return (
    <>
      <Hero />
      <Services />
      <Pricings />
      <Testimonials />
      <Contact />
    </>
  );
}
