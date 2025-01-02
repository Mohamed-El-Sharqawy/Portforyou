"use client";

import { services } from "@/features/(templates)/arik/constants/services";
import { useGSAP } from "@gsap/react";
import SingleService from "./SingleService";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import "./services.css";

export default function Services() {
  useGSAP(() => {
    const services = gsap.utils.toArray(".services-section div");

    gsap.to(services, {
      opacity: 1,
      duration: 1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ".services-section",
        start: "65% bottom",
      },
      stagger: 0.3,
    });
  });

  return (
    <section className="services-section container px-0">
      {services.map((service, idx) => (
        <SingleService
          key={service.title}
          title={service.title}
          description={service.description}
          index={idx}
        />
      ))}
    </section>
  );
}
