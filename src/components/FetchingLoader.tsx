"use client";

import {
  useHeroSectionData,
  useLogosSectionData,
  useServicesSectionData,
  useTestimonialSectionData,
  useWorkExperienceSectionData,
  useWorkStepsSectionData,
} from "@/features/(templates)/arik/services/queries";
import Fallback from "./Fallback";

export default function FetchingLoader() {
  const { isLoading: isHeroLoading } = useHeroSectionData();
  const { isLoading: isLogosLoading } = useLogosSectionData();
  const { isLoading: isServicesLoading } = useServicesSectionData();
  const { isLoading: isWorkExpLoading } = useWorkExperienceSectionData();
  const { isLoading: isWorkStepsLoading } = useWorkStepsSectionData();
  const { isLoading: isTestimonialsLoading } = useTestimonialSectionData();

  const isLoading =
    isHeroLoading ||
    isLogosLoading ||
    isServicesLoading ||
    isWorkExpLoading ||
    isWorkStepsLoading ||
    isTestimonialsLoading;

  return (
    <div
      style={{
        overflow: isLoading ? "hidden" : "visible",
        height: isLoading ? 0 : "auto",
      }}
    >
      {isLoading && <Fallback />}
    </div>
  );
}
