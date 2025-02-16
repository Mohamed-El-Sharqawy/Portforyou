"use client";

import { fakeWorkExperience } from "@/features/(templates)/arik/constants/work-experience";
import { useGSAP } from "@gsap/react";
import SingleProject from "./SingleProject";
import gsap from "gsap";
import ScrollTrigger from "gsap/all";
import { useWorkExperienceSectionData } from "../../services/queries";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { data, refetch } = useWorkExperienceSectionData();
  const workExperience = data?.data.user.arikTemplate.work || [];

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
            />
          ))}
    </div>
  );
}
