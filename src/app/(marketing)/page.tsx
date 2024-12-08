"use client";

import Contact from "@/features/marketing/components/Contact";
import Hero from "@/features/marketing/components/Hero/Hero";
import Pricings from "@/features/marketing/components/Pricings";
import Services from "@/features/marketing/components/Services/Services";
import Testimonials from "@/features/marketing/components/Testimonials/Testimonials";
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
      <Pricings />
      <Testimonials />
      <Contact />
    </main>
  );
}
