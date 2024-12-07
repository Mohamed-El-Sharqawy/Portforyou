"use client";

import HeaderNavLinks from "./HeaderNavLinks";
import MobileMenu from "./MobileMenu";
import Logo from "../Logo";

import { motion } from "motion/react";

export default function Header() {
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
        delay: 1.1,
      }}
      viewport={{ once: true }}
      className="absolute top-0 inset-x-0 z-50"
    >
      <div className="header-container container flex items-center justify-between py-6 pb-7 bg-black bg-opacity-25 rounded-br-[40px] rounded-bl-[40px]">
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
