import FetchingLoader from "@/components/FetchingLoader";
import CopyButton from "@/features/(templates)/arik/components/CopyButton";
import CTA from "@/features/(templates)/arik/components/CTA/CTA";
import Header from "@/features/(templates)/arik/components/Header/Header";
import Hero from "@/features/(templates)/arik/components/Hero/Hero";
import Logos from "@/features/(templates)/arik/components/Logos/Logos";
import Services from "@/features/(templates)/arik/components/Services/Services";
import Testimonials from "@/features/(templates)/arik/components/Testimonials/Testimonials";
import WorkExperience from "@/features/(templates)/arik/components/WorkExperience/WorkExperience";
import WorkSteps from "@/features/(templates)/arik/components/WorkSteps/WorkSteps";
import AnalyticsTracker from "@/features/(templates)/arik/components/Analytics/AnalyticsTracker";
import ChatbotAssistant from "@/features/(templates)/arik/components/ChatbotAssistant/ChatbotAssistant";
import BackToTemplatesLink from "@/features/(templates)/arik/components/BackToTemplatesLink/BackToTemplatesLink";

import type { Viewport } from "next";
import { AnalyticsLink } from "@/features/(templates)/arik/components/Analytics/AnalyticsLink";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Home | Mohamed El-Sharqawy",
  description:
    "I'm a full-stack developer with a passion for creating beautiful and functional websites and applications.",
  keywords: `full-stack developer, web developer, software engineer, react developer, next.js developer, node.js developer, python developer, django developer, flask developer, 
  sql developer, no-sql developer, database developer, web design, web development, software development, web design and development, web design and development services, 
  web design and development company, web design and development agency, web design and development solutions, web design and development projects, 
  web design and development services, web design and development company, web design and development agency, web design and development solutions, 
  web design and development projects`,
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
  return (
    <div className="arik-template overflow-x-hidden bg-black text-wheat font-arial">
      {/* Silently track analytics for this template visit */}
      <AnalyticsTracker />

      {/* If Fetching display the loader */}
      <FetchingLoader />

      <Header />
      <Hero />
      <Logos />
      <Services />
      <WorkExperience />
      <WorkSteps />
      <Testimonials />
      <CTA />

      <CopyButton />

      <div className="fixed top-14 left-10 max-[1140px]:top-32 flex flex-col gap-y-4">
        <BackToTemplatesLink />

        {/* Analytics link - client-side check for ownership */}
        <AnalyticsLink />
      </div>

      {/* Portfolio Content Assistant Chatbot */}
      <ChatbotAssistant />
    </div>
  );
}
