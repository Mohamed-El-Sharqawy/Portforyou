"use client";

import {
  useFooterSectionData,
  useHeroSectionData,
  useLogosSectionData,
  useServicesSectionData,
  useTestimonialSectionData,
  useWorkExperienceSectionData,
  useWorkStepsSectionData,
} from "@/features/(templates)/arik/services/queries";
import Fallback from "./Fallback";
import { useSearchParams } from "next/navigation";

export default function FetchingLoader() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { isLoading: isHeroLoading } = useHeroSectionData(userId!);
  const { isLoading: isLogosLoading } = useLogosSectionData(userId!);
  const { isLoading: isServicesLoading } = useServicesSectionData(userId!);
  const { isLoading: isWorkExpLoading } = useWorkExperienceSectionData(userId!);
  const { isLoading: isWorkStepsLoading } = useWorkStepsSectionData(userId!);
  const { isLoading: isTestimonialsLoading } = useTestimonialSectionData(userId!);
  const { isLoading: isFooterLoading } = useFooterSectionData(userId!);

  const isLoading =
    isHeroLoading ||
    isLogosLoading ||
    isServicesLoading ||
    isWorkExpLoading ||
    isWorkStepsLoading ||
    isTestimonialsLoading ||
    isFooterLoading;

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
