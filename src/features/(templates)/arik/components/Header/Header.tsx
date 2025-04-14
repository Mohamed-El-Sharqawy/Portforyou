"use client";

import Link from "next/link";
import MobileMenuToggle from "./MobileMenuToggle";
import XMark from "./XMark";
import gsap from "gsap";
import Logo from "../Logo";

import { useEffect, useRef, useState } from "react";
import { links } from "@/features/(templates)/arik/constants/header";
import { useGSAP } from "@gsap/react";

import "./header.css";
import { scrollToElement } from "../../utils/scrollToElement";
import { redirect, useSearchParams } from "next/navigation";

gsap.registerPlugin(useGSAP);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuContent = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuContent.current?.classList.add("active");
    } else {
      mobileMenuContent.current?.classList.remove("active");
    }
  }, [isMobileMenuOpen]);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.fromTo(
        headerRef.current,
        {
          top: -80,
        },
        {
          top: 48,
          duration: 0.75,
          delay: 0.35,
          ease: "power2.out",
        }
      );
    },
    {
      dependencies: [],
    }
  );

  return (
    <>
      <header className="-top-[80px]" ref={headerRef}>
        <Logo />

        <div className="desktop-menu flex items-center gap-x-16 ml-auto">
          <nav className="space-x-5">
            {links.map((link) => (
              <Link
                className="hover:underline underline-offset-4 tracking-widest"
                href={link.href}
                key={link.href}
                prefetch={false}
                onClick={(e) => {
                  if (window.location.pathname == "/templates/arik") {
                    scrollToElement(e, link.href);
                  } else {
                    redirect("/templates/arik");
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={`/templates/arik/contact?userId=${userId}`}
            className="text-black bg-wheat py-2.5 px-4 rounded-sm hover:bg-wheat/80 active:bg-wheat uppercase"
          >
            Let&apos;s Talk
          </Link>
        </div>

        <div className="hidden mobile-menu">
          <MobileMenuToggle setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>
      </header>

      <div
        ref={mobileMenuContent}
        className="mobile-menu-content bg-black/80 fixed top-0 left-0 w-full h-full z-50 space-y-8 flex flex-col items-center justify-center backdrop-blur-md"
      >
        <XMark setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <nav className="flex flex-col items-center gap-y-8 text-wheat">
          {links.map((link) => (
            <Link
              onClick={closeMobileMenu}
              className="hover:underline underline-offset-4 tracking-widest hover:filter hover:drop-shadow-[0_0_8px_#DAC5A7] transition"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`/templates/arik/contact?userId=${userId}`}
          onClick={closeMobileMenu}
          className="absolute top-7 left-8 text-black bg-wheat py-2.5 px-4 rounded-sm hover:bg-wheat/80 active:bg-wheat uppercase block mx-auto"
          data-no-blobity
        >
          Let&apos;s Talk
        </Link>
      </div>
    </>
  );
}
