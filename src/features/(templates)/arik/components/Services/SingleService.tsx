"use client";

import TopRightArrow from "@/features/(templates)/arik/assets/icons/top-right-arrow";
import { Service } from "../../types/services";
import { useChangeServices } from "../../services/mutations";
import { useRef, useState } from "react";
import { fakeServices } from "../../constants/services";
import { useOpenAIMutation } from "@/services/mutations";
import EnhanceContentButton from "../EnhanceContentButton";
import CustomTooltip from "@/components/CustomTooltip";
import { toast } from "sonner";
import EnhancingLoader from "../EnhancingLoader";

interface ServiceProps {
  title: string;
  description: string;
  services: Service[];
  index: number;
  refetch: () => void;
  isOwner: boolean;
}

export default function SingleService({
  title,
  description,
  index,
  services,
  refetch,
  isOwner,
}: ServiceProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const [lastClicked, setIsLastClicked] = useState<
    "serviceTitle" | "serviceDescription" | null
  >(null);
  const { mutate } = useChangeServices();
  const { mutate: enhanceContent, isPending } = useOpenAIMutation();

  const isServiceTitlePending = isPending && lastClicked == "serviceTitle";
  const isServiceDescriptionPending =
    isPending && lastClicked == "serviceDescription";

  return (
    <div className="p-12 bg-wheat/5 border border-wheat/15 w-[445.33px] rounded-sm opacity-0">
      <span className="text-wheat/60">0{index + 1}</span>
      <h2
        ref={titleRef}
        className={`group relative text-wheat mt-3 mb-2 text-2xl font-light ${isOwner && "editable cursor-pointer"} px-0 ${isServiceTitlePending ? "opacity-50" : ""}`}
        contentEditable={isOwner}
        suppressContentEditableWarning
        onBlur={(e) => {
          services[index] = {
            title: e.target.textContent!,
            description: descriptionRef.current?.textContent ?? "",
          };

          mutate(services);
        }}
      >
        {isServiceTitlePending && <EnhancingLoader />}
        {title || fakeServices[index].title}
        {isOwner && (
          <CustomTooltip>
            <EnhanceContentButton
              onClick={async () => {
                setIsLastClicked("serviceTitle");
                const elementContent = titleRef.current?.textContent;
                if (elementContent) {
                  enhanceContent(elementContent, {
                    onSuccess: (data) => {
                      if (data == title)
                        return toast.success("Content is already perfect 📈");
                      services[index] = {
                        title: data,
                        description: descriptionRef.current?.textContent ?? "",
                      };
                      mutate(services, {
                        onSuccess: () => {
                          if (data) {
                            toast.success("Content enhanced successfully!");
                            refetch();
                          }
                        },
                      });
                    },
                  });
                }
              }}
            />
          </CustomTooltip>
        )}
      </h2>
      <p
        ref={descriptionRef}
        className={`group relative mb-8 text-wheat/60 max-w-[350px] leading-7 ${isOwner && "editable cursor-pointer"} px-0 ${isServiceDescriptionPending ? "opacity-50" : ""}`}
        contentEditable={isOwner}
        suppressContentEditableWarning
        onBlur={(e) => {
          services[index] = {
            title: titleRef.current?.textContent ?? "",
            description: e.target.textContent!,
          };

          mutate(services);
        }}
      >
        {isServiceDescriptionPending && <EnhancingLoader />}
        {description || fakeServices[index].description}
        {isOwner && (
          <CustomTooltip>
            <EnhanceContentButton
              onClick={async () => {
                setIsLastClicked("serviceDescription");
                const elementContent = titleRef.current?.textContent;
                if (elementContent) {
                  enhanceContent(elementContent, {
                    onSuccess: (data) => {
                      if (data == description)
                        return toast.success("Content is already perfect 📈");
                      services[index] = {
                        title: titleRef.current?.textContent ?? "",
                        description: data,
                      };
                      mutate(services, {
                        onSuccess: () => {
                          if (data) {
                            toast.success("Content enhanced successfully!");
                            refetch();
                          }
                        },
                      });
                    },
                  });
                }
              }}
            />
          </CustomTooltip>
        )}
      </p>
      <TopRightArrow />
    </div>
  );
}
