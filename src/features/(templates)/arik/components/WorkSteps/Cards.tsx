"use client";

import { fakeSteps } from "@/features/(templates)/arik/constants/work-steps";
import { useWorkStepsSectionData } from "../../services/queries";

import Step from "./Step";
import { useSearchParams } from "next/navigation";
import { getToken } from "@/lib/utils";

export default function Cards() {
  const { decodedToken } = getToken();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { data } = useWorkStepsSectionData(userId!);
  const process = data?.data.user.arikTemplate.process;
  const steps = process?.steps || [];

  const isOwner = decodedToken?.userId === userId;

  return (
    <div className="min-h-screen text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto relative">
        {/* Central timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-wheat/15 transform -translate-x-1/2" />

        <div className="space-y-24">
          {steps?.map((step, index) => (
            <Step
              key={`R ${index}`}
              step={step}
              position={index + 1}
              process={process}
              isOwner={isOwner}
            />
          ))}

          {/* if steps length is less than 5, add fake steps */}
          {steps.length < 5 &&
            fakeSteps
              .slice(steps.length, 5)
              .map((step, index) => (
                <Step
                  key={`F ${steps.length + index + 1}`}
                  step={step}
                  position={steps.length + index + 1}
                  process={process}
                  isOwner={isOwner}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
