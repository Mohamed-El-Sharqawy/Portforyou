"use client";

import Contact from "@/features/marketing/components/Contact";
import Hero from "@/features/marketing/components/Hero/Hero";
import Pricing from "@/features/marketing/Pricing/Pricing";
import Services from "@/features/marketing/components/Services";
import Testimonials from "@/features/marketing/components/Testimonials";
import Lenis from "lenis";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
      <Contact />
    </main>
  );
}
