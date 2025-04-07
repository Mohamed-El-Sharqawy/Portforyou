"use client";

import Portal from "../Portal";
import LoginButton from "./login-button";

import { links } from "@/constants/navLinks";
import { cn } from "@/lib/utils";
import { Menu, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import cookie from "js-cookie";
import LogoutButton from "./logout-button";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const token = cookie.get("token");

  const router = useRouter();

  const handleClick = (e: React.MouseEvent, link: { href: string }) => {
    e.preventDefault();

    if (window.location.pathname !== `/`) {
      return router.push(`/#${link.href}`);
    }

    setIsOpen(false);
    window.scrollTo({
      top: document.getElementById(link.href)?.offsetTop,
      behavior: "smooth",
    });
  };

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

      {/* Navbar */}
      <Portal selector={"body"}>
        <div
          className={cn(
            "fixed inset-y-0 space-y-10 transition-all duration-500 right-[-300px] w-[300px] bg-primary-foreground z-[1002]",
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

          <nav className="flex flex-col gap-y-8 justify-center items-center">
            {links.map((link) =>
              link.href == "templates" || link.href == "survey" ? null : (
                <button
                  className="relative text-xl cursor-pointer hover:underline underline-offset-4"
                  key={link.href}
                  role="link"
                  tabIndex={0}
                  onClick={(e) => handleClick(e, link)}
                >
                  {link.label}
                </button>
              )
            )}
            {token && (
              <>
                <Link
                  className="relative text-xl cursor-pointer hover:underline underline-offset-4"
                  href="/survey"
                  tabIndex={0}
                  onClick={() => setIsOpen(false)}
                >
                  Survey
                </Link>
                <Link
                  className="relative text-xl cursor-pointer hover:underline underline-offset-4"
                  href="/templates"
                  tabIndex={0}
                  onClick={() => setIsOpen(false)}
                >
                  Templates
                </Link>
              </>
            )}
          </nav>

          {token ? (
            <div className="mx-auto w-fit">
              <LogoutButton />
            </div>
          ) : (
            <div className="mx-auto w-fit">
              <LoginButton onClick={() => setIsOpen(false)} />
            </div>
          )}
        </div>
      </Portal>

      {/* Overlay */}
      {isOpen && (
        <Portal selector={"body"}>
          <div
            className="fixed inset-0 bg-black/50 z-[1000]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        </Portal>
      )}
    </div>
  );
}
