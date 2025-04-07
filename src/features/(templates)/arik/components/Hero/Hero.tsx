"use client";

import gsap from "gsap";
import Link from "next/link";
import DownArrow from "@/features/(templates)/arik/assets/icons/down-arrow";
import PersonImage from "@/features/(templates)/arik/components/PersonImage";
import { toast } from "sonner";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { scrollToElement } from "@/features/(templates)/arik/utils/scrollToElement";
import { useHeroSectionData } from "../../services/queries";

gsap.registerPlugin(useGSAP);

import "./hero.css";
import {
  useChangeHeroHeading,
  useChangeHeroSubheading,
  useChangeHeroParagraph,
} from "../../services/mutations";
import { useOpenAIMutation } from "@/services/mutations";
import CustomTooltip from "@/components/CustomTooltip";
import EnhanceContentButton from "../EnhanceContentButton";
import EnhancingLoader from "../EnhancingLoader";
import { useSearchParams } from "next/navigation";
import { getToken } from "@/lib/utils";

export default function Hero() {
  const [lastClicked, setLastClicked] = useState<
    "heading" | "subheading" | "paragraph" | null
  >(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { decodedToken } = getToken();

  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);

  const { data, isFetching, refetch } = useHeroSectionData(userId!);
  const { mutate: enhanceContent, isPending } = useOpenAIMutation();

  const isOwner = userId === decodedToken.userId;

  const isHeroHeadingPending = isPending && lastClicked == "heading";
  const isHeroSubheadingPending = isPending && lastClicked == "subheading";
  const isHeroParagraphPending = isPending && lastClicked == "paragraph";

  const hero = data?.data.user?.arikTemplate?.hero;

  const changeHeroHeading = useChangeHeroHeading();
  const changeHeroSubheading = useChangeHeroSubheading();
  const changeHeroParagraph = useChangeHeroParagraph();

  const handleHeadingChange = (
    event: React.ChangeEvent<HTMLSpanElement>,
    enhancedContent?: string | undefined
  ) => {
    if (hero?.hero_heading === event.target.textContent) return;
    const newValue = event.target.textContent;
    changeHeroHeading.mutate(newValue!, {
      onSuccess: () => {
        if (enhancedContent) {
          refetch();
        }
      },
    });
  };

  const handleSubheadingChange = (
    event: React.ChangeEvent<HTMLSpanElement>,
    enhancedContent?: string | undefined
  ) => {
    if (hero?.hero_subheading === event.target.textContent) return;
    const newValue = event.target.textContent;
    changeHeroSubheading.mutate(newValue!, {
      onSuccess: () => {
        if (enhancedContent) {
          refetch();
        }
      },
    });
  };

  const handleParagraphChange = (
    event: React.ChangeEvent<HTMLParagraphElement>,
    enhancedContent?: string | undefined
  ) => {
    if (hero?.hero_paragraph === event.target.textContent) return;
    const newValue = event.target.textContent;
    changeHeroParagraph.mutate(newValue!, {
      onSuccess: () => {
        if (enhancedContent) {
          refetch();
        }
      },
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.set([headingRef.current, paragraphRef.current, "#scroll-down-arrow"], {
        opacity: 0,
      });

      tl.to(headingRef.current, {
        opacity: 1,
        duration: 0.75,
        delay: 0.5,
        ease: "power1.out",
      })
        .to(
          paragraphRef.current,
          {
            opacity: 1,
            duration: 0.75,
            ease: "power1.out",
          },
          0.725
        )
        .to(
          "#scroll-down-arrow",
          {
            opacity: 1,
            duration: 0.75,
            ease: "power3",
            onComplete: () => {
              tl.clear();
            },
          },
          0.825
        );
    },
    {
      dependencies: [hero],
    }
  );

  return (
    <section className="hero-section min-h-screen relative overflow-hidden">
      {/* Person Image */}
      <PersonImage />

      {/* Hero Content */}
      <div className="hero-content space-y-4 text-center absolute bottom-[40px] left-1/2 -translate-x-1/2 w-full">
        <h1
          ref={headingRef}
          className="relative text-wheat text-[96px] leading-tight w-fit mx-auto"
        >
          <div className="relative inline-block group">
            <span
              onBlur={handleHeadingChange}
              className={`${isHeroHeadingPending ? "opacity-50" : ""} ${isOwner && "editable cursor-pointer"}`}
              contentEditable={!isHeroHeadingPending && isOwner}
              suppressContentEditableWarning
              ref={span1Ref}
            >
              {!isFetching && (hero?.hero_heading || "Web Designer")}
            </span>
            {isHeroHeadingPending && <EnhancingLoader />}
            {isOwner && (
              <CustomTooltip content="Enhance Content">
                <EnhanceContentButton
                  onClick={() => {
                    setLastClicked("heading");
                    const elementContent = span1Ref.current?.textContent;
                    if (elementContent)
                      enhanceContent(elementContent, {
                        onSuccess(data) {
                          const event = {
                            target: {
                              textContent: data,
                            },
                          };
                          if (data === hero?.hero_heading)
                            return toast.success(
                              "Content is already perfect 📈"
                            );
                          handleHeadingChange(event as any, data);
                          toast.success("Content enhanced successfully!");
                        },
                      });
                  }}
                />
              </CustomTooltip>
            )}
          </div>
          <br />
          <div className="relative inline-block group">
            <span
              onBlur={handleSubheadingChange}
              className={`${isHeroSubheadingPending ? "opacity-50" : ""} ${isOwner && "editable cursor-pointer"}`}
              contentEditable={!isHeroSubheadingPending && isOwner}
              suppressContentEditableWarning
              ref={span2Ref}
            >
              {!isFetching && (hero?.hero_subheading || "& Developer")}
            </span>
            {isHeroSubheadingPending && <EnhancingLoader />}
            {isOwner && (
              <CustomTooltip content="Enhance Content">
                <EnhanceContentButton
                  onClick={() => {
                    setLastClicked("subheading");
                    const elementContent = span2Ref.current?.textContent;
                    if (elementContent)
                      enhanceContent(elementContent, {
                        onSuccess(data) {
                          const event = {
                            target: {
                              textContent: data,
                            },
                          };
                          if (data === hero?.hero_subheading)
                            return toast.success(
                              "Content is already perfect 📈"
                            );
                          handleSubheadingChange(event as any, data);
                          toast.success("Content enhanced successfully!");
                        },
                      });
                  }}
                />
              </CustomTooltip>
            )}
          </div>
        </h1>

        <div className="relative inline-block group">
          <p
            onBlur={handleParagraphChange}
            ref={paragraphRef}
            className={`text-wheat/60 max-w-[520px] leading-10 mx-auto text-2xl font-light ${isOwner && "editable cursor-pointer"} ${isHeroParagraphPending ? "!opacity-50" : ""}`}
            contentEditable={!isHeroParagraphPending && isOwner}
            suppressContentEditableWarning
          >
            {!isFetching &&
              (hero?.hero_paragraph ||
                "Premium web design, development, and SEO services to help your business stand out.")}
          </p>
          {isHeroParagraphPending && <EnhancingLoader />}
          {isOwner && (
            <CustomTooltip content="Enhance Content">
              <EnhanceContentButton
                onClick={() => {
                  setLastClicked("paragraph");
                  const elementContent = paragraphRef.current?.textContent;
                  if (elementContent)
                    enhanceContent(elementContent, {
                      onSuccess(data) {
                        const event = {
                          target: {
                            textContent: data,
                          },
                        };
                        if (data === hero?.hero_paragraph)
                          return toast.success("Content is already perfect 📈");
                        handleParagraphChange(event as any, data);
                        toast.success("Content enhanced successfully!");
                      },
                    });
                }}
              />
            </CustomTooltip>
          )}
        </div>

        <Link
          href={"#logos-section"}
          onClick={(e) => scrollToElement(e, "#logos-section")}
          className="!mt-8 bg-wheat bg-opacity-5 size-[46px] rounded-full border border-wheat/15 cursor-pointer flex items-center justify-center mx-auto animate-bounce transition hover:bg-opacity-15 opacity-0"
          id="scroll-down-arrow"
        >
          <DownArrow />
        </Link>
      </div>
    </section>
  );
}
