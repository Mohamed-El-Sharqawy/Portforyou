"use client";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import cookie from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { links } from "@/constants/navLinks";
import { useRouter } from "next/navigation";

export default function HeaderNavLinks() {
  const router = useRouter();
  const token = cookie.get("token");

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
      {!token &&
        links.map((link) => (
          <button
            className="relative text-xl cursor-pointer hover:underline underline-offset-4"
            key={link.href}
            onClick={(e) => handleClick(e, link)}
          >
            {link.label}
          </button>
        ))}

      {token ? (
        <>
          <p>
            Welcome,{" "}
            <span className="text-primary">
              {(jwtDecode(token!) as { email: string }).email}
            </span>
          </p>

          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
