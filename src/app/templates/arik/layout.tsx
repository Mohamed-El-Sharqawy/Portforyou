import type { Metadata } from "next";

import Header from "@/features/(templates)/arik/components/Header/Header";

import "@/styles/globals.css";
import "@/features/(templates)/arik/styles/globals.css";
import "@/features/(templates)/arik/components/Header/header.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased !font-arial bg-black overflow-x-hidden text-wheat`}
      >
        <Header />
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
