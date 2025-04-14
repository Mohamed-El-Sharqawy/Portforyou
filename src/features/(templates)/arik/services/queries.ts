import { useQuery } from "@tanstack/react-query";
import {
  getFooterSectionData,
  getHeroSectionData,
  getLogosSectionData,
  getServicesSectionData,
  getTestimonialSectionData,
  getWorkExperienceSectionData,
  getWorkStepsSectionData,
} from "./api";

// Hero
export const useHeroSectionData = (userId: string) => {
  return useQuery({
    queryKey: ["hero-section-data"],
    queryFn: () => (userId ? getHeroSectionData(userId) : null),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

// Logos
export const useLogosSectionData = (userId: string) => {
  return useQuery({
    queryKey: ["logos-section-data"],
    queryFn: () => {
      return userId ? getLogosSectionData(userId) : null;
    },
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

// Services
export const useServicesSectionData = (userId: string) => {
  return useQuery({
    queryKey: ["services-section-data"],
    queryFn: () => (userId ? getServicesSectionData(userId) : null),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

// WorkExperience
export const useWorkExperienceSectionData = (userId: string) => {
  return useQuery({
    queryKey: ["work-experience-section-data"],
    queryFn: () => (userId ? getWorkExperienceSectionData(userId) : null),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

// WorkSteps
export const useWorkStepsSectionData = (userId: string) => {
  return useQuery({
    queryKey: ["work-steps-section-data"],
    queryFn: () => (userId ? getWorkStepsSectionData(userId) : null),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

// Testimonials
export const useTestimonialSectionData = (userId: string) => {
  return useQuery({
    queryKey: ["testimonials-section-data"],
    queryFn: () => (userId ? getTestimonialSectionData(userId) : null),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

// Footer
export const useFooterSectionData = (userId: string) => {
  return useQuery({
    queryKey: ["footer-section-data"],
    queryFn: () => (userId ? getFooterSectionData(userId) : null),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};
