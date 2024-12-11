import React from "react";

import { links } from "@/constants/navLinks";
import LoginButton from "./LoginButton";

export default function HeaderNavLinks() {
  const handleClick = (e: React.MouseEvent, link: { href: string }) => {
    e.preventDefault();

    // the href is the id of the section
    const value = document.getElementById(link.href)?.offsetTop;

    if (value) {
      window.scrollTo({
        top: value - 75,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="items-center gap-x-4 hidden lg:flex">
      {links.map((link) => (
        <button
          className="text-xl hover:underline underline-offset-4 relative cursor-pointer"
          key={link.href}
          role="link"
          tabIndex={0}
          onClick={(e) => handleClick(e, link)}
        >
          {link.label}
        </button>
      ))}

      <LoginButton />
    </nav>
  );
}
