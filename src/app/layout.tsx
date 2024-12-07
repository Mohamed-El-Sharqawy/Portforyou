import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton/ScrollToTopButton";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title:
    "Portforyou - Create and Share Stunning Portfolios with AI-Powered Customization",
  description:
    "Design and publish professional portfolios effortlessly with Portforyou. Enjoy customizable templates, AI content writing, 3D models, and affordable subscription plans. Tailored for professionals across all fields, with hosting included.",
  twitter: {
    card: "summary_large_image",
    description:
      "Design and publish professional portfolios effortlessly with Portforyou. Enjoy customizable templates, AI content writing, 3D models, and affordable subscription plans. Tailored for professionals across all fields, with hosting included.",
  },
  openGraph: {
    description:
      "Design and publish professional portfolios effortlessly with Portforyou. Enjoy customizable templates, AI content writing, 3D models, and affordable subscription plans. Tailored for professionals across all fields, with hosting included.",
    url: "portforyou-xi.vercel.app",
    siteName: "Portforyou",
    images: [
      {
        url: "https://portforyou-xi.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Portforyou",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-serif antialiased dark overflow-x-hidden`}>
        <Header />
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
