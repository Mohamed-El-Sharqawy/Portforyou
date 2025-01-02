import { StepProps } from "@/features/(templates)/arik/types/work-steps";

type Props = {
  step: StepProps;
};

export default function Step({ step }: Props) {
  return (
    <article key={step.number} className="relative">
      {/* Timeline number */}
      <div className="absolute z-10 left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-wheat/5 size-[46px] rounded-full flex items-center justify-center mx-auto transition ring-[12px] ring-black backdrop-blur-md hover:bg-wheat/15">
        <span className="text-sm md:text-base font-mono text-wheat">
          {step.number}
        </span>
      </div>

      {/* Card */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
          step.position === "right"
            ? "md:justify-items-start"
            : "md:justify-items-end"
        }`}
      >
        <div
          className={`w-full max-w-lg bg-wheat/5 border border-zinc-800 rounded-lg p-6 backdrop-blur-md ${
            step.position === "right"
              ? "md:col-start-2 ml-auto"
              : "md:col-start-1 mr-auto"
          }`}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-xs text-wheat/60">{step.subtitle}</div>
              <h3 className="text-wheat text-lg md:text-xl font-semibold mt-1">
                {step.title}
              </h3>
            </div>

            <p className="text-sm text-wheat/60">{step.description}</p>

            <ul className="space-y-2">
              {step.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-sm text-wheat flex items-start"
                >
                  <span className="mr-4">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
