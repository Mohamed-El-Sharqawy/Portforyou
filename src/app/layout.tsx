import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton/ScrollToTopButton";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";

import "@/styles/globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#020817",
        },
      }}
      afterSignOutUrl={"/"}
      afterMultiSessionSingleSignOutUrl={"/"}
    >
      <html lang="en">
        <body className={`overflow-x-hidden font-serif antialiased dark`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTopButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
