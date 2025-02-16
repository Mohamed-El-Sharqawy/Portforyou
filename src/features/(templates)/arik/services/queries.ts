import { useQuery } from "@tanstack/react-query";
import {
  getHeroSectionData,
  getLogosSectionData,
  getServicesSectionData,
  getWorkExperienceSectionData,
  getWorkStepsSectionData,
} from "./api";

export const useHeroSectionData = () => {
  return useQuery({
    queryKey: ["hero-section-data"],
    queryFn: () => getHeroSectionData(),
    refetchOnWindowFocus: false,
  });
};

export const useLogosSectionData = () => {
  return useQuery({
    queryKey: ["logos-section-data"],
    queryFn: () => getLogosSectionData(),
    refetchOnWindowFocus: false,
  });
};

export const useServicesSectionData = () => {
  return useQuery({
    queryKey: ["services-section-data"],
    queryFn: () => getServicesSectionData(),
    refetchOnWindowFocus: false,
  });
};

export const useWorkExperienceSectionData = () => {
  return useQuery({
    queryKey: ["work-experience-section-data"],
    queryFn: () => getWorkExperienceSectionData(),
    refetchOnWindowFocus: false,
  });
};

export const useWorkStepsSectionData = () => {
  return useQuery({
    queryKey: ["work-steps-section-data"],
    queryFn: () => getWorkStepsSectionData(),
    refetchOnWindowFocus: false,
  });
};
