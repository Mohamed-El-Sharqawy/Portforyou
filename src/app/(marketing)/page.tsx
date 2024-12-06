import Contact from "@/features/marketing/components/Contact";
import Features from "@/features/marketing/components/Features";
import Hero from "@/features/marketing/components/Hero/Hero";
import Pricing from "@/features/marketing/components/Pricing";
import Services from "@/features/marketing/components/Services";
import Testimonials from "@/features/marketing/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact />
    </main>
  );
}
