import React from "react";

import { links } from "@/constants/navLinks";
import LoginButton from "./LoginButton";

export default function HeaderNavLinks() {
  return (
    <nav className="items-center gap-x-4 hidden lg:flex">
      {links.map((link) => (
        <button
          className="text-xl hover:underline underline-offset-4 relative cursor-pointer"
          key={link.href}
          role="link"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();

            // the href is the id of the section
            window.scrollTo({
              top: document.getElementById(link.href)?.offsetTop,
              behavior: "smooth",
            });
          }}
        >
          {link.label}
        </button>
      ))}

      <LoginButton />
    </nav>
  );
}
