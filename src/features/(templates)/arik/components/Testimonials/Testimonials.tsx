"use client";

import { useSearchParams } from "next/navigation";
import {
  useChangeTestimonialsHeading,
  useChangeTestimonialsParagraph,
} from "../../services/mutations";
import { useTestimonialSectionData } from "../../services/queries";
import Cards from "./Cards";
import { getToken } from "@/lib/utils";

export default function Testimonials() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { decodedToken } = getToken();

  const { data } = useTestimonialSectionData(userId!);
  const { mutate: changeTestimonialsSectionHeading } =
    useChangeTestimonialsHeading();
  const { mutate: changeTestimonialsSectionParagraph } =
    useChangeTestimonialsParagraph();

  const { testimonials_heading, testimonials_paragraph } =
    data?.data.user.arikTemplate.testimonials || {};

    const isOwner = decodedToken.userId === userId;

  return (
    <section className="w-full min-h-screen bg-black text-wheat px-4 py-16" id="testimonials-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Headings */}
        <div className="text-center mb-16">
          <h2
            contentEditable={isOwner}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (e.target.textContent == testimonials_heading) return;

              changeTestimonialsSectionHeading(e.target.textContent!);
            }}
            className={`mb-4 text-5xl max-w-[250px] mx-auto leading-tight md:leading-tight md:max-w-[600px] md:text-8xl ${isOwner && "editable cursor-pointer"}`}
          >
            {!testimonials_heading ? (
              <>What my clients say</>
            ) : (
              testimonials_heading
            )}
          </h2>

          <p
            contentEditable={isOwner}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (e.target.textContent == testimonials_paragraph) return;

              changeTestimonialsSectionParagraph(e.target.textContent!);
            }}
            className={`text-wheat/60 md:text-lg ${isOwner && "editable cursor-pointer"}`}
          >
            {testimonials_paragraph ||
              `See what my clients have to say about working with me and the
            results I helped them achieve.`}
          </p>
        </div>

        {/* Testimonials cards */}
        <Cards />
      </div>
    </section>
  );
}
