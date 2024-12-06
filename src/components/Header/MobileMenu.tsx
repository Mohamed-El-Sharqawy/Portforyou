"use client";

import { links } from "@/constants/navLinks";
import { cn } from "@/lib/utils";
import { Menu, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoginButton from "./LoginButton/LoginButton";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex lg:hidden">
      {/* Mobile Menu Toggle */}
      <div>
        <Menu
          size={28}
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navbar */}
      <div
        className={cn(
          "fixed inset-y-0 right-[-300px] w-[300px] bg-primary-foreground transition-all duration-500 z-50 space-y-10",
          isOpen ? "right-[0]" : "right-[-300px]"
        )}
      >
        <div className="flex justify-end mt-11 mr-8">
          <XIcon
            size={28}
            className="ml-auto cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <nav className="flex flex-col items-center justify-center gap-y-8">
          {links.map((link) => (
            <Link
              className="text-xl hover:underline underline-offset-4 relative"
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mx-auto w-fit"><LoginButton /></div>
      </div>
    </div>
  );
}