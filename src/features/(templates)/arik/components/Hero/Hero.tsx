"use client";

import gsap from "gsap";
import Link from "next/link";
import DownArrow from "@/features/(templates)/arik/assets/icons/down-arrow";
import PersonImage from "@/features/(templates)/arik/components/PersonImage";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { scrollToElement } from "@/features/(templates)/arik/utils/scrollToElement";
import { useHeroSectionData } from "../../services/queries";


gsap.registerPlugin(useGSAP);

import "./hero.css";
import {
  useChangeHeroHeading,
  useChangeHeroSubheading,
  useChangeHeroParagraph,
} from "../../services/mutations";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const { data, isFetching } = useHeroSectionData();

  const hero = data?.data.user.arikTemplate.hero;

  const changeHeroHeading = useChangeHeroHeading();
  const changeHeroSubheading = useChangeHeroSubheading();
  const changeHeroParagraph = useChangeHeroParagraph();

  const handleHeadingChange = (event: React.ChangeEvent<HTMLSpanElement>) => {
    const newValue = event.target.textContent;
    changeHeroHeading.mutate(newValue!);
  };

  const handleSubheadingChange = (
    event: React.ChangeEvent<HTMLSpanElement>
  ) => {
    const newValue = event.target.textContent;
    changeHeroSubheading.mutate(newValue!);
  };

  const handleParagraphChange = (
    event: React.ChangeEvent<HTMLParagraphElement>
  ) => {
    const newValue = event.target.textContent;
    changeHeroParagraph.mutate(newValue!);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.set([headingRef.current, paragraphRef.current, "#scroll-down-arrow"], {
        opacity: 0,
      });

      tl.to(headingRef.current, {
        opacity: 1,
        duration: 0.75,
        delay: 0.5,
        ease: "power1.out",
      })
        .to(
          paragraphRef.current,
          {
            opacity: 1,
            duration: 0.75,
            ease: "power1.out",
          },
          0.725
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
          0.825
        );
    },
    {
      dependencies: [hero],
    }
  );

  return (
    <section className="hero-section min-h-screen relative overflow-hidden">
      {/* Person Image */}
      <PersonImage />

      {/* Hero Content */}
      <div className="hero-content space-y-4 text-center absolute bottom-[40px] left-1/2 -translate-x-1/2 w-full">
        <h1
          ref={headingRef}
          className="relative text-wheat text-[96px] leading-tight w-fit mx-auto"
        >
          <span
            onBlur={handleHeadingChange}
            className="editable"
            contentEditable
          >
            {!isFetching && (hero?.hero_heading || "Web Designer")}
          </span>
          <br />
          <span
            onBlur={handleSubheadingChange}
            className="editable italic"
            contentEditable
          >
            {!isFetching && (hero?.hero_subheading || "& Developer")}
          </span>
        </h1>

        <p
          onBlur={handleParagraphChange}
          ref={paragraphRef}
          className="text-wheat/60 max-w-[520px] leading-10 mx-auto text-2xl font-light editable"
          contentEditable
        >
          {!isFetching &&
            (hero?.hero_paragraph ||
              "Premium web design, development, and SEO services to help your business stand out.")}
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
