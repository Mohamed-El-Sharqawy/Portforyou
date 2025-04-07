"use client";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useEffect, useState } from "react";

import { links } from "@/constants/navLinks";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeaderNavLinks() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Only access cookies on the client side
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    
    setToken(cookieToken || null);
    
    if (cookieToken) {
      try {
        // Dynamic import to avoid server-side execution
        import('jwt-decode').then(({ jwtDecode }) => {
          const decoded = jwtDecode(cookieToken) as { username: string };
          setUsername(decoded.username);
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

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
      {/* Render all links consistently with the same component type */}
      {!token &&
        links.map((link) =>
          link.href === "templates" || link.href === "survey" ? null : (
            <Link 
              href={`/#${link.href}`} 
              key={link.href}
              onClick={(e) => handleClick(e, link)}
              className="relative text-xl cursor-pointer hover:underline underline-offset-4"
            >
              {link.label}
            </Link>
          )
        )}

      {token && (
        <>
          <Link
            href="/survey"
            className="hover:underline underline-offset-4 tracking-widest"
          >
            Survey
          </Link>
          <Link
            href="/templates"
            className="hover:underline underline-offset-4 tracking-widest"
          >
            Templates
          </Link>
        </>
      )}

      {token ? (
        <>
          <p>
            Welcome,{" "}
            <span className="text-primary">
              {username}
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
