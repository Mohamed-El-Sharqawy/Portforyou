"use client";

import SingleService from "./SingleService";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import "./services.css";
import { useServicesSectionData } from "../../services/queries";
import { fakeServices } from "../../constants/services";
import { useSearchParams } from "next/navigation";
import { getToken } from "@/lib/utils";

export default function Services() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { decodedToken} = getToken();

  const { data, isFetching, refetch } = useServicesSectionData(userId!);
  const services = data?.data.user.arikTemplate.services || [];

  const isOwner = userId === decodedToken.userId;

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
    <section className="services-section container px-0" id="services-section">
      {(services.length > 0 ? services : fakeServices)?.map((service, idx) => (
        <SingleService
          key={`R ${idx}`}
          title={service.title}
          description={service.description}
          services={services}
          index={idx}
          refetch={refetch}
          isOwner={isOwner}
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
              refetch={refetch}
              isOwner={isOwner}
            />
          ))}
    </section>
  );
}
