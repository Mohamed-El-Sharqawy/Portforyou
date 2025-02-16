"use client";

import {
  Step as SingleStep,
  WorkSteps,
} from "@/features/(templates)/arik/types/work-steps";
import { fakeSteps } from "../../constants/work-steps";
import { useChangeProcess } from "../../services/mutations";

type Props = {
  step: SingleStep;
  position: number;
  process: WorkSteps | undefined;
};

export default function Step({ step, position, process }: Props) {
  const { mutate } = useChangeProcess();

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
                onBlur={(e) => {
                  if (process) {
                    const index = position - 1;
                    const newValue = e.target.textContent!;

                    const newProcess = process;
                    newProcess.steps[index].step_subheading = newValue;
                    mutate(newProcess!);
                  }
                }}
                contentEditable
                className="text-xs text-wheat/60 editable"
              >
                {step.step_subheading ||
                  fakeSteps[position - 1].step_subheading}
              </p>
              <h3
                onBlur={(e) => {
                  if (process) {
                    const index = position - 1;
                    const newValue = e.target.textContent!;

                    const newProcess = process;
                    newProcess.steps[index].step_heading = newValue;
                    mutate(newProcess!);
                  }
                }}
                contentEditable
                className="text-wheat text-lg md:text-xl font-semibold mt-1 editable"
              >
                {step.step_heading || fakeSteps[position - 1].step_heading}
              </h3>
            </div>

            <p
              onBlur={(e) => {
                if (process) {
                  const index = position - 1;
                  const newValue = e.target.textContent!;

                  const newProcess = process;
                  newProcess.steps[index].step_paragraph = newValue;
                  mutate(newProcess!);
                }
              }}
              contentEditable
              className="text-sm text-wheat/60 editable"
            >
              {step.step_paragraph || fakeSteps[position - 1].step_paragraph}
            </p>

            <ul className="space-y-2">
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
                        mutate(newProcess!);
                      }
                    }}
                    contentEditable
                    className="editable"
                  >
                    {item || fakeSteps[position - 1].step_points[pointIndex]}
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
