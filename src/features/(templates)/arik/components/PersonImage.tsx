import { cn } from "@/features/(templates)/arik/utils/cn";
import Image from "next/image";

export default function PersonImage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hero-image-container absolute z-0 w-[880px] h-[770px] left-1/2 -translate-x-1/2 top-0 mix-blend-lighten",
        className
      )}
    >
      <Image
        className="w-full h-full object-cover"
        src="/arik/person.webp"
        alt="hero-img"
        width={880}
        height={770}
        loading="eager"
        priority
      />
    </div>
  );
}
