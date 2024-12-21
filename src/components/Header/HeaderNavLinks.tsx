import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import LoginButton from "./LoginButton";

import { links } from "@/constants/navLinks";

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
