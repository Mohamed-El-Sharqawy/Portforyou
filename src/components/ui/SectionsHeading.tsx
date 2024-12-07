import AnimatedGradientText from "./animated-gradient-text";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function SectionsHeading({text}: {text: string}) {
  return (
    <AnimatedGradientText>
      <span
        className={cn(
          `inline animate-gradient bg-gradient-to-r from-[#3b82f6] via-[#9c40ff] to-[#3b82f6] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
        )}
      >
        {text}
      </span>
      <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </AnimatedGradientText>
  );
}
