"use client";

import HeaderNavLinks from "./header-nav-links";
import MobileMenu from "./mobile-menu";
import Logo from "../Logo";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  if (pathname.includes("/templates/arik")) return null;

  return (
    <motion.header
      whileInView={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.3,
      }}
      viewport={{ once: true }}
      className="fixed top-0 inset-x-0 z-[1000]"
    >
      <div className="header-container container flex items-center justify-between py-6 pb-7 bg-black bg-opacity-25 rounded-br-[40px] rounded-bl-[40px] backdrop-blur-lg">
        {/* Logo */}
        <Logo />

        {/* Links */}
        <HeaderNavLinks />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </motion.header>
  );
}
