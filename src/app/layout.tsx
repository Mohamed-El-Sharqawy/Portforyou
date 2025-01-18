import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

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
    >
      <html lang="en">
        <body className={`overflow-x-hidden font-serif antialiased dark`}>
          <ClerkLoading>
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
