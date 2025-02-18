import { QueryClient, useMutation } from "@tanstack/react-query";
import {
  changeHeroHeading,
  changeHeroSubheading,
  changeHeroParagraph,
  changeLogos,
  changeServices,
  changeWorkExperience,
  changeProcessSection,
  changeTestimonialsSection,
  changeTestimonialsSectionHeading,
  changeTestimonialsSectionParagraph,
} from "./api";
import { Logo } from "../types/logos";
import { Service } from "../types/services";
import { Work } from "../types/work";
import { WorkSteps } from "../types/work-steps";
import { Testimonial } from "../types/testimonials";

const queryClient = new QueryClient();

// Hero
export const useChangeHeroHeading = () => {
  return useMutation({
    mutationFn: (textContent: string) => changeHeroHeading(textContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-section-data"] });
    },
  });
};

export const useChangeHeroSubheading = () => {
  return useMutation({
    mutationFn: (textContent: string) => changeHeroSubheading(textContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-section-data"] });
    },
  });
};

export const useChangeHeroParagraph = () => {
  return useMutation({
    mutationFn: (textContent: string) => changeHeroParagraph(textContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-section-data"] });
    },
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

// Testimonials
export const useChangeTestimonialsHeading = () => {
  return useMutation({
    mutationFn: (testimonials_heading: string) =>
      changeTestimonialsSectionHeading(testimonials_heading),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials-section-data"],
      });
    },
  });
};

export const useChangeTestimonialsParagraph = () => {
  return useMutation({
    mutationFn: (testimonials_paragraph: string) =>
      changeTestimonialsSectionParagraph(testimonials_paragraph),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials-section-data"],
      });
    },
  });
};

export const useChangeTestimonials = () => {
  return useMutation({
    mutationFn: (testimonials: Testimonial[]) =>
      changeTestimonialsSection(testimonials),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials-section-data"],
      });
    },
  });
};
