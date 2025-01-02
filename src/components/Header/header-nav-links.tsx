"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import LoginButton from "./login-button";

import { links } from "@/constants/navLinks";
import { useRouter } from "next/navigation";

export default function HeaderNavLinks() {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent, link: { href: string }) => {
    e.preventDefault();

    if (window.location.pathname !== `/`) {
      return router.push(`/#${link.href}`);
    }

    const value = document.getElementById(link.href)?.offsetTop;

    if (value) {
      window.scrollTo({
        top: value - 75,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="hidden gap-x-4 items-center lg:flex">
      <SignedOut>
        {links.map((link) => (
          <button
            className="relative text-xl cursor-pointer hover:underline underline-offset-4"
            key={link.href}
            role="link"
            tabIndex={0}
            onClick={(e) => handleClick(e, link)}
          >
            {link.label}
          </button>
        ))}
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <LoginButton />
      </SignedOut>
    </nav>
  );
}
