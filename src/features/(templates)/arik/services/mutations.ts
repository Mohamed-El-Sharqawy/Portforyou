import { QueryClient, useMutation } from "@tanstack/react-query";
import {
  changeHeroHeading,
  changeHeroSubheading,
  changeHeroParagraph,
  changeLogos,
  changeServices,
  changeWorkExperience,
  changeProcessSection,
} from "./api";
import { Logo } from "../types/logos";
import { Service } from "../types/services";
import { Work } from "../types/work";
import { WorkSteps } from "../types/work-steps";

const queryClient = new QueryClient();

// Hero
export const useChangeHeroHeading = () => {
  return useMutation({
    mutationFn: (textContent: string) => changeHeroHeading(textContent),
  });
};

export const useChangeHeroSubheading = () => {
  return useMutation({
    mutationFn: (textContent: string) => changeHeroSubheading(textContent),
  });
};

export const useChangeHeroParagraph = () => {
  return useMutation({
    mutationFn: (textContent: string) => changeHeroParagraph(textContent),
  });
};

// Logos
export const useChangeLogos = () => {
  return useMutation({
    mutationFn: (logos: Logo[]) => changeLogos(logos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logos-section-data"] });
    },
  });
};

// Services
export const useChangeServices = () => {
  return useMutation({
    mutationFn: (services: Service[]) => changeServices(services),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services-section-data"] });
    },
  });
};

// WorkExperience
export const useChangeWorkExperience = () => {
  return useMutation({
    mutationFn: (work: Work[]) => changeWorkExperience(work),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["work-experience-section-data"],
      });
    },
  });
};

// WorkSteps
export const useChangeProcess = () => {
  return useMutation({
    mutationFn: (workSteps: WorkSteps) => changeProcessSection(workSteps),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["work-steps-section-data"],
      });
    },
  });
};
