"use client";

import DownArrow from "@/features/(templates)/arik/assets/icons/down-arrow";
import Cards from "./Cards";
import { useChangeProcess } from "../../services/mutations";
import { useWorkStepsSectionData } from "../../services/queries";

export default function WorkSteps() {
  const { mutate } = useChangeProcess();

  const { data } = useWorkStepsSectionData();
  const process = data?.data.user.arikTemplate.process;

  return (
    <section className="container relative">
      <div className="space-y-6 md:mb-28 mb-16">
        <h2 className="text-wheat text-center">THE PROCESS</h2>

        <h1
          onBlur={(e) => {
            if (process) {
              const newProcess = process;

              newProcess.process_heading = e.target.textContent!;
              mutate(newProcess!);
            }
          }}
          contentEditable
          className="text-wheat text-center text-5xl leading-tight md:text-8xl md:leading-tight font-medium text-balance max-w-[700px] mx-auto editable"
        >
          {process?.process_heading || `Your Website in 5 steps`}
        </h1>

        <p
          onBlur={(e) => {
            if (process) {
              const newProcess = process;

              newProcess.process_paragraph = e.target.textContent!;
              mutate(newProcess!);
            }
          }}
          contentEditable
          className="text-center text-wheat/60 md:w-full max-w-[95%] mx-auto editable"
        >
          {process?.process_paragraph ||
            "Our process ensures that we create a website tailored to your business needs."}
        </p>

        <div className="bg-wheat bg-opacity-5 size-[46px] rounded-full border border-wheat/15 flex items-center justify-center mx-auto transition animate-bounce !mt-12">
          <DownArrow />
        </div>
      </div>

      <div className="relative content">
        <Cards />
      </div>
    </section>
  );
}
