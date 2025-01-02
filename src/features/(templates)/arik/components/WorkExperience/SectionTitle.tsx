"use client";

import { useGSAP } from "@gsap/react";
import TopRightArrow from "@/features/(templates)/arik/assets/icons/top-right-arrow";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SectionTitle() {
  useGSAP(() => {
    const title = document.querySelector(".work-experience-section-title > h1");

    const words = title?.textContent?.split(" ");
    title!.textContent = "";

    words?.forEach((word) => {
      word.split("").forEach((letter, idx) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.classList.add(
          "opacity-0",
          "relative",
          "-top-[25px]",
          "rotate-12",
          "inline-block"
        );
        title?.appendChild(span);

        if (word.length - 1 == idx) {
          const span = document.createElement("span");
          span.textContent = " ";
          title!.appendChild(span);
        }
      });
    });

    gsap.set(".work-experience-section-title h1", {
      opacity: 1,
    });

    gsap
      .to(".work-experience-section-title h1 span", {
        opacity: 1,
        top: 0,
        rotate: 0,
        duration: 0.25,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".work-experience-section",
          start: "-25% 25%",
          end: "25% 65%",
          toggleActions: "play none none none"
        },
      })

      gsap.from(".work-experience-section-title a", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3",
        scrollTrigger: {
          trigger: ".work-experience-section",
          start: "-25% 25%",
          end: "25% 65%",
          toggleActions: "play none none none"
        },
      });
  });

  return (
    <div className="work-experience-section-title flex items-center justify-between pl-8 pr-36">
      <h1 className="text-wheat text-5xl font-light opacity-0">
        Work <span className="italic font-serif">Experience</span>
      </h1>
      <TopRightArrow />
    </div>
  );
}
