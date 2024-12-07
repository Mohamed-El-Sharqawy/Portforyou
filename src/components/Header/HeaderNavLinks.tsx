import Link from "next/link";
import React from "react";

import { links } from "@/constants/navLinks";
import LoginButton from "./LoginButton";

export default function HeaderNavLinks() {
  return (
    <nav className="items-center gap-x-4 hidden lg:flex">
      {links.map((link) => (
        <Link
          className="text-xl hover:underline underline-offset-4 relative"
          key={link.href}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}

      <LoginButton />
    </nav>
  );
}
