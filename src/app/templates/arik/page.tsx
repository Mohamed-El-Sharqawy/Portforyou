import Fallback from "@/components/Fallback";
import CTA from "@/features/(templates)/arik/components/CTA/CTA";
import Header from "@/features/(templates)/arik/components/Header/Header";
import Hero from "@/features/(templates)/arik/components/Hero/Hero";
import Logos from "@/features/(templates)/arik/components/Logos/Logos";
import Services from "@/features/(templates)/arik/components/Services/Services";
import Testimonials from "@/features/(templates)/arik/components/Testimonials/Testimonials";
import WorkExperience from "@/features/(templates)/arik/components/WorkExperience/WorkExperience";
import WorkSteps from "@/features/(templates)/arik/components/WorkSteps/WorkSteps";

import { QueryClient } from "@tanstack/react-query";

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Home | Mohamed El-Sharqawy",
  description:
    "I'm a full-stack developer with a passion for creating beautiful and functional websites and applications.",
  keywords:
    "full-stack developer, web developer, software engineer, react developer, next.js developer, node.js developer, python developer, django developer, flask developer, sql developer, no-sql developer, database developer, web design, web development, software development, web design and development, web design and development services, web design and development company, web design and development agency, web design and development solutions, web design and development projects, web design and development services, web design and development company, web design and development agency, web design and development solutions, web design and development projects",
  robots: "index, follow",
  author: "Mohamed El-Sharqawy",
  creator: "Mohamed El-Sharqawy",
  openGraph: {
    title: "Home | Mohamed El-Sharqawy",
    description:
      "I'm a full-stack developer with a passion for creating beautiful and functional websites and applications.",
    url: "https://mohamed-elsharqawy.vercel.app",
    siteName: "Mohamed El-Sharqawy",
    images: [
      {
        url: "/og.png",
      },
    ],
  },
};

export default function Home() {
  const queryClient = new QueryClient();

  if (queryClient.isFetching()) return <Fallback />;

  return (
    <div className="arik-template overflow-x-hidden bg-black text-wheat font-arial">
      <Header />
      <Hero />
      <Logos />
      <Services />
      <WorkExperience />
      <WorkSteps />
      <Testimonials />
      <CTA />
    </div>
  );
}
