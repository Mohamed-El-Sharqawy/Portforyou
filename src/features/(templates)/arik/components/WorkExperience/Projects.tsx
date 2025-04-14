"use client";

import { fakeWorkExperience } from "@/features/(templates)/arik/constants/work-experience";
import { useGSAP } from "@gsap/react";
import SingleProject from "./SingleProject";
import gsap from "gsap";
import ScrollTrigger from "gsap/all";
import { useWorkExperienceSectionData } from "../../services/queries";
import { useSearchParams } from "next/navigation";
import { getToken } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { decodedToken } = getToken();

  const { data, refetch } = useWorkExperienceSectionData(userId!);
  const workExperience = data?.data.user.arikTemplate.work || [];

  const isOwner = decodedToken?.userId === userId;

  useGSAP(
    () => {
      const projects = gsap.utils.toArray(".project");

      gsap.to(projects, {
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".work-experience-section-title",
          start: "top 50%",
        },
        stagger: 0.25,
      });
    },
    {
      dependencies: [workExperience],
    }
  );

  return (
    <div className="work-experience-projects-container">
      {(workExperience.length > 0 ? workExperience : fakeWorkExperience).map(
        (project, index) => (
          <SingleProject
            key={project.id}
            index={index}
            project={project}
            workExperience={workExperience}
            refetch={refetch}
            isOwner={isOwner}
          />
        )
      )}

      {/* Rest of Work experience if the data length is less than 4 */}
      {workExperience.length < 4 &&
        fakeWorkExperience
          .slice(workExperience.length)
          .map((project, index) => (
            <SingleProject
              key={project.id}
              index={index}
              project={project}
              workExperience={workExperience}
              refetch={refetch}
              isOwner={isOwner}
            />
          ))}
    </div>
  );
}
