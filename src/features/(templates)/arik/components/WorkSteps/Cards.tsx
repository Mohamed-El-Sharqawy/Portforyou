import { steps } from "@/features/(templates)/arik/constants/work-steps";
import Step from "./Step";

export default function Cards() {
  return (
    <div className="min-h-screen text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto relative">
        {/* Central timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-wheat/15 transform -translate-x-1/2" />

        <div className="space-y-24">
          {steps.map((step) => (
            <Step key={step.number} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}
