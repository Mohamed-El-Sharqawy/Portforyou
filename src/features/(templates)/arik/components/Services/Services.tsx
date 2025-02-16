"use client";

import SingleService from "./SingleService";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import "./services.css";
import { useServicesSectionData } from "../../services/queries";
import { fakeServices } from "../../constants/services";

export default function Services() {
  const { data, isFetching } = useServicesSectionData();
  const services = data?.data.user.arikTemplate.services || [];

  useGSAP(
    () => {
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
    },
    {
      dependencies: [isFetching],
    }
  );

  return (
    <section className="services-section container px-0">
      {(services.length > 0 ? services : fakeServices)?.map((service, idx) => (
        <SingleService
          key={`R ${idx}`}
          title={service.title}
          description={service.description}
          services={services}
          index={idx}
        />
      ))}

      {/* rest of fake services if the services length is less than 3 */}
      {services.length < 3 &&
        new Array(3 - services.length)
          .fill(0)
          .map((_, idx) => (
            <SingleService
              key={`F ${idx + services.length}`}
              title={fakeServices[idx].title}
              description={fakeServices[idx].description}
              services={services}
              index={idx + services.length}
            />
          ))}
    </section>
  );
}
