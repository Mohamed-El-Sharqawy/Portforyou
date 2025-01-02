"use client";

import { logos } from "@/features/(templates)/arik/constants/logos";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";

export default function Logos() {
  useGSAP(() => {
    gsap.to(".partner-logo", {
      opacity: 1,
      duration: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".logos",
        start: "180% bottom", // start of the section
      },
      stagger: 0.1,
    });
  });

  return (
    <section id="logos-section">
      <Marquee
        className="xl:!hidden py-8 bg-white/[0.02]"
        autoFill
        pauseOnHover
        speed={200}
      >
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="cursor-pointer drop-shadow-[0_0_4px_#DAC5A7] hover:drop-shadow-[0_0_8px_#DAC5A7] relative transition mr-16"
          >
            <Image
              className="w-auto h-auto"
              src={logo.src}
              alt={logo.alt}
              width={155}
              height={35}
            />
          </div>
        ))}
      </Marquee>

      <div className="hidden xl:grid logos grid-cols-6 place-items-center w-[1200px] mx-auto pt-12">
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="partner-logo cursor-pointer drop-shadow-[0_0_4px_#DAC5A7] hover:drop-shadow-[0_0_8px_#DAC5A7] relative transition opacity-0"
          >
            <Image
              className="w-auto h-auto"
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
