"use client";

import { useChangeFooterHeading } from "../../services/mutations";
import { useChangeFooterParagraph } from "../../services/mutations";
import { useFooterSectionData } from "../../services/queries";
import { useOpenAIMutation } from "@/services/mutations";
import EnhanceContentButton from "../EnhanceContentButton";
import CustomTooltip from "@/components/CustomTooltip";
import { toast } from "sonner";
import EnhancingLoader from "../EnhancingLoader";
import { useRef, useState } from "react";
import { cn, getToken } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type LastClickedField = "heading" | "paragraph" | null;

export default function Content() {
  const { decodedToken } = getToken();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { data, refetch } = useFooterSectionData(userId!);
  const { mutate: changeFooterHeading } = useChangeFooterHeading();
  const { mutate: changeFooterParagraph } = useChangeFooterParagraph();
  const { mutate: enhanceContent, isPending } = useOpenAIMutation();
  const [lastClicked, setLastClicked] = useState<LastClickedField>(null);

  const isOwner = decodedToken.userId === userId;

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const isHeadingPending = isPending && lastClicked === "heading";
  const isParagraphPending = isPending && lastClicked === "paragraph";

  const footer = data?.data.user.arikTemplate.footer;

  return (
    <>
      <h1
        ref={headingRef}
        contentEditable={isOwner}
        suppressContentEditableWarning
        onBlur={(e) => {
          if (e.target.textContent == footer?.footer_heading) return;
          changeFooterHeading(
            e.target.textContent!.replace("Enhance ContentEnhance Content", "")
          );
        }}
        className={cn(
          "uppercase xl:text-[128px] max-w-[1200px] my-2 leading-tight text-balance md:text-[80px] sm:text-[60px] text-[32px] group relative",
          isHeadingPending && "opacity-50",
          isOwner && "editable cursor-pointer"
        )}
      >
        {isHeadingPending && <EnhancingLoader />}
        {footer?.footer_heading || "Let's make your Website Shine"}
        {isOwner && (
          <CustomTooltip>
            <EnhanceContentButton
              onClick={() => {
                setLastClicked("heading");
                const elementContent = headingRef.current?.textContent?.replace(
                  "Enhance ContentEnhance Content",
                  ""
                );
                if (elementContent) {
                  enhanceContent(elementContent, {
                    onSuccess: (data: string) => {
                      if (data === elementContent) {
                        return toast.success("Content is already perfect 📈");
                      }
                      if (data === footer?.footer_heading) {
                        return toast.success("Content is already perfect 📈");
                      }
                      changeFooterHeading(data, {
                        onSuccess: () => {
                          toast.success("Content enhanced successfully!");
                          refetch();
                        },
                      });
                    },
                  });
                }
              }}
            />
          </CustomTooltip>
        )}
      </h1>

      <p
        ref={paragraphRef}
        contentEditable={isOwner}
        suppressContentEditableWarning
        onBlur={(e) => {
          if (e.target.textContent == footer?.footer_paragraph) return;
          changeFooterParagraph(
            e.target.textContent!.replace("Enhance ContentEnhance Content", "")
          );
        }}
        className={cn(
          "text-base sm:text-xl text-wheat/60 w-full px-3 sm:max-w-[500px] sm:px-0 group relative",
          isParagraphPending && "opacity-50",
          isOwner && "editable cursor-pointer"
        )}
      >
        {isParagraphPending && <EnhancingLoader />}
        {footer?.footer_paragraph ||
          "Premium web design, webflow, and SEO services to help your business stand out."}
        {isOwner && (
          <CustomTooltip>
            <EnhanceContentButton
              onClick={() => {
                setLastClicked("paragraph");
                const elementContent =
                  paragraphRef.current?.textContent?.replace(
                    "Enhance ContentEnhance Content",
                    ""
                  );
                if (elementContent) {
                  enhanceContent(elementContent, {
                    onSuccess: (data: string) => {
                      if (data === elementContent) {
                        return toast.success("Content is already perfect 📈");
                      }
                      changeFooterParagraph(data, {
                        onSuccess: () => {
                          toast.success("Content enhanced successfully!");
                          refetch();
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
    </>
  );
}
