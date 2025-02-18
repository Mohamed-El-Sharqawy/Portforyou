"use client";

import TopRightArrow from "@/features/(templates)/arik/assets/icons/top-right-arrow";
import { Service } from "../../types/services";
import { useChangeServices } from "../../services/mutations";
import { useRef } from "react";
import { fakeServices } from "../../constants/services";

interface ServiceProps {
  title: string;
  description: string;
  services: Service[];
  index: number;
}

export default function SingleService({
  title,
  description,
  index,
  services,
}: ServiceProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const { mutate } = useChangeServices();

  return (
    <div className="p-12 bg-wheat/5 border border-wheat/15 w-[445.33px] rounded-sm opacity-0">
      <span className="text-wheat/60">0{index + 1}</span>
      <h2
        ref={titleRef}
        className="text-wheat mt-3 mb-2 text-2xl font-light editable px-0"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          services[index] = {
            title: e.target.textContent!,
            description: descriptionRef.current?.textContent ?? "",
          };

          mutate(services);
        }}
      >
        {title || fakeServices[index].title}
      </h2>
      <p
        ref={descriptionRef}
        className="mb-8 text-wheat/60 max-w-[350px] leading-7 editable px-0"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          services[index] = {
            title: titleRef.current?.textContent ?? "",
            description: e.target.textContent!,
          };

          mutate(services);
        }}
      >
        {description || fakeServices[index].description}
      </p>
      <TopRightArrow />
    </div>
  );
}
