"use client";

import gsap from "gsap";
import Link from "next/link";
import DownArrow from "@/features/(templates)/arik/assets/icons/down-arrow";
import PersonImage from "@/features/(templates)/arik/components/PersonImage";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { scrollToElement } from "@/features/(templates)/arik/utils/scrollToElement";
gsap.registerPlugin(useGSAP);

import "./hero.css";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!headingRef.current && !paragraphRef.current) return;

    const tl = gsap.timeline();

    tl.to(headingRef.current, {
      opacity: 1,
      duration: 0.75,
      delay: 0.9,
      ease: "power1.out",
    })
      .to(
        paragraphRef.current,
        {
          opacity: 1,
          duration: 0.75,
          ease: "power1.out",
        },
        1.25
      )
      .to(
        "#scroll-down-arrow",
        {
          opacity: 1,
          duration: 0.75,
          ease: "power3",
          onComplete: () => {
            tl.clear();
          },
        },
        1.35
      );
  });

  return (
    <section className="hero-section min-h-screen relative overflow-hidden">
      {/* Person Image */}
      <PersonImage />

      {/* Hero Content */}
      <div className="hero-content space-y-4 text-center absolute bottom-[40px] left-1/2 -translate-x-1/2 w-full">
        <h1
          ref={headingRef}
          className="relative text-wheat text-[96px] leading-tight"
        >
          <span className="editable" contentEditable>
            Web Designer
          </span>
          <br />
          <span className="italic editable" contentEditable>
            & Developer
          </span>
        </h1>

        <p
          ref={paragraphRef}
          className="text-wheat/60 max-w-[520px] leading-10 mx-auto text-2xl font-light editable"
          contentEditable
        >
          Premium web design, development, and SEO services to help your
          business stand out.
        </p>

        <Link
          href={"#logos-section"}
          onClick={(e) => scrollToElement(e, "#logos-section")}
          className="!mt-8 bg-wheat bg-opacity-5 size-[46px] rounded-full border border-wheat/15 cursor-pointer flex items-center justify-center mx-auto animate-bounce transition hover:bg-opacity-15 opacity-0"
          id="scroll-down-arrow"
        >
          <DownArrow />
        </Link>
      </div>
    </section>
  );
}
