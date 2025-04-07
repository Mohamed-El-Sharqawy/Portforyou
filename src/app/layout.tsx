import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster } from "sonner";

import "@/styles/globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://portforyou-xi.vercel.app"),
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
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden font-serif antialiased dark`}>
        <ErrorBoundary>
          <Header />
          <main className="min-h-screen">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Footer />
          <Toaster position="top-center" theme="dark" />
        </ErrorBoundary>
      </body>
    </html>
  );
}
