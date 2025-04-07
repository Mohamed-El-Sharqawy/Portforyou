"use client";

import {
  Step as SingleStep,
  WorkSteps,
} from "@/features/(templates)/arik/types/work-steps";
import { fakeSteps } from "../../constants/work-steps";
import { useChangeProcess } from "../../services/mutations";
import EnhanceContentButton from "../EnhanceContentButton";
import CustomTooltip from "@/components/CustomTooltip";
import { useOpenAIMutation } from "@/services/mutations";
import { toast } from "sonner";
import { useRef, useState } from "react";
import EnhancingLoader from "../EnhancingLoader";

type Props = {
  step: SingleStep;
  position: number;
  process: WorkSteps | undefined;
  isOwner: boolean;
};

export default function Step({ step, position, process, isOwner }: Props) {
  const { mutate } = useChangeProcess();
  const { mutate: enhanceContent, isPending } = useOpenAIMutation();
  const [currentProcess] = useState(process);

  const [lastClicked, setLastClicked] = useState<
    "subheading" | "heading" | "paragraph" | "points" | null
  >(null);

  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const isSubheadingPending = isPending && lastClicked == "subheading";
  const isHeadingPending = isPending && lastClicked == "heading";
  const isParagraphPending = isPending && lastClicked == "paragraph";
  const arePointsPending = isPending && lastClicked == "points";

  return (
    <article className="relative">
      {/* Timeline number */}
      <div className="absolute z-10 left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-wheat/5 size-[46px] rounded-full flex items-center justify-center mx-auto transition ring-[12px] ring-black backdrop-blur-md hover:bg-wheat/15">
        <span className="text-sm md:text-base font-mono text-wheat">
          0{position}
        </span>
      </div>

      {/* Card */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
          position % 2 === 0 ? "md:justify-items-end" : "md:justify-items-start"
        }`}
      >
        <div
          className={`w-full max-w-lg bg-wheat/5 border border-zinc-800 rounded-lg p-6 backdrop-blur-md ${
            position % 2 === 0
              ? "md:col-start-1 mr-auto"
              : "md:col-start-2 ml-auto"
          }`}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <p
                ref={subheadingRef}
                onBlur={(e) => {
                  if (currentProcess) {
                    const index = position - 1;
                    const newValue = e.target.textContent!;

                    const newProcess = currentProcess;
                    newProcess.steps[index].step_subheading = newValue;
                    if (newValue == newProcess.steps[index].step_subheading)
                      return;
                    mutate(newProcess!);
                  }
                }}
                contentEditable={isOwner}
                suppressContentEditableWarning
                className={`text-xs text-wheat/60 ${isOwner && "editable cursor-pointer"} group relative ${isSubheadingPending && "opacity-50"}`}
              >
                {isSubheadingPending && <EnhancingLoader />}
                {step.step_subheading ||
                  fakeSteps[position - 1].step_subheading}
                {isOwner && (
                  <CustomTooltip>
                    <EnhanceContentButton
                      onClick={() => {
                        if (currentProcess) {
                          setLastClicked("subheading");
                          const elementContent =
                            subheadingRef.current?.textContent?.replace(
                              "Enhance ContentEnhance Content",
                              ""
                            );
                          if (elementContent) {
                            enhanceContent(elementContent, {
                              onSuccess: (data: string) => {
                                const index = position - 1;
                                const newProcess = { ...currentProcess };
                                if (data === elementContent) {
                                  return toast.success(
                                    "Content is already perfect 📈"
                                  );
                                }
                                newProcess.steps[index].step_subheading = data;
                                mutate(newProcess);
                                toast.success("Content enhanced successfully!");
                              },
                            });
                          }
                        }
                      }}
                    />
                  </CustomTooltip>
                )}
              </p>
              <h3
                ref={headingRef}
                onBlur={(e) => {
                  if (currentProcess) {
                    const index = position - 1;
                    const newValue = e.target.textContent!;

                    const newProcess = currentProcess;
                    newProcess.steps[index].step_heading = newValue;
                    if (newValue == newProcess.steps[index].step_heading)
                      return;
                    mutate(newProcess!);
                  }
                }}
                contentEditable={isOwner}
                suppressContentEditableWarning
                className={`text-wheat text-lg md:text-xl font-semibold mt-1 ${isOwner && "editable cursor-pointer"} group relative ${isHeadingPending && "opacity-50"}`}
              >
                {isHeadingPending && <EnhancingLoader />}
                {step.step_heading || fakeSteps[position - 1].step_heading}
                {isOwner && (
                  <CustomTooltip>
                    <EnhanceContentButton
                      onClick={() => {
                        if (currentProcess) {
                          setLastClicked("heading");
                          const elementContent =
                            headingRef.current?.textContent?.replace(
                              "Enhance ContentEnhance Content",
                              ""
                            );
                          if (elementContent) {
                            enhanceContent(elementContent, {
                              onSuccess: (data: string) => {
                                const index = position - 1;
                                const newProcess = { ...currentProcess };
                                if (data === elementContent) {
                                  return toast.success(
                                    "Content is already perfect 📈"
                                  );
                                }
                                newProcess.steps[index].step_heading = data;
                                mutate(newProcess);
                                toast.success("Content enhanced successfully!");
                              },
                            });
                          }
                        }
                      }}
                    />
                  </CustomTooltip>
                )}
              </h3>
            </div>

            <p
              ref={paragraphRef}
              onBlur={(e) => {
                if (currentProcess) {
                  const index = position - 1;
                  const newValue = e.target.textContent!;

                  const newProcess = currentProcess;
                  newProcess.steps[index].step_paragraph = newValue;
                  if (newValue == newProcess.steps[index].step_paragraph)
                    return;
                  mutate(newProcess!);
                }
              }}
              contentEditable={isOwner}
              suppressContentEditableWarning
              className={`text-sm text-wheat/60 ${isOwner && "editable cursor-pointer"} group relative ${isParagraphPending && "opacity-50"}`}
            >
              {isParagraphPending && <EnhancingLoader />}
              {step.step_paragraph || fakeSteps[position - 1].step_paragraph}
              {isOwner && (
                <CustomTooltip>
                  <EnhanceContentButton
                    onClick={() => {
                      if (currentProcess) {
                        setLastClicked("paragraph");
                        const elementContent =
                          paragraphRef.current?.textContent?.replace(
                            "Enhance ContentEnhance Content",
                            ""
                          );
                        if (elementContent) {
                          enhanceContent(elementContent, {
                            onSuccess: (data: string) => {
                              const index = position - 1;
                              const newProcess = { ...currentProcess };
                              if (data === elementContent) {
                                return toast.success(
                                  "Content is already perfect 📈"
                                );
                              }
                              newProcess.steps[index].step_paragraph = data;
                              mutate(newProcess);
                              toast.success("Content enhanced successfully!");
                            },
                          });
                        }
                      }
                    }}
                  />
                </CustomTooltip>
              )}
            </p>

            <ul
              className={`space-y-2 relative ${arePointsPending && "opacity-50"}`}
            >
              {arePointsPending && <EnhancingLoader />}
              {step.step_points?.map((item, pointIndex) => (
                <li
                  key={pointIndex}
                  className="text-sm text-wheat flex items-start"
                >
                  <span className="mr-4">•</span>
                  <span
                    onBlur={(e) => {
                      if (process) {
                        const index = position - 1;
                        const newValue = e.target.textContent!;

                        const newProcess = process;
                        newProcess.steps[index].step_points[pointIndex] =
                          newValue;
                        if (
                          newValue ==
                          newProcess.steps[index].step_points[pointIndex]
                        )
                          return;
                        mutate(newProcess!);
                      }
                    }}
                    contentEditable={isOwner}
                    suppressContentEditableWarning
                    className={`${isOwner && "editable cursor-pointer"} relative`}
                  >
                    {item || fakeSteps[position - 1].step_points[pointIndex]}
                    {isOwner && (
                      <CustomTooltip>
                        <EnhanceContentButton
                          onClick={(e) => {
                            if (process) {
                              setLastClicked("points");
                              const elementContent =
                                e.currentTarget.parentElement?.parentElement?.textContent?.replace(
                                  "Enhance ContentEnhance Content",
                                  ""
                                );
                              if (elementContent) {
                                enhanceContent(elementContent, {
                                  onSuccess: (data: string) => {
                                    const index = position - 1;
                                    const newProcess = { ...process };
                                    if (data === elementContent) {
                                      return toast.success(
                                        "Content is already perfect 📈"
                                      );
                                    }
                                    newProcess.steps[index].step_points[
                                      pointIndex
                                    ] = data;
                                    mutate(newProcess);
                                    toast.success(
                                      "Content enhanced successfully!"
                                    );
                                  },
                                });
                              }
                            }
                          }}
                        />
                      </CustomTooltip>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
