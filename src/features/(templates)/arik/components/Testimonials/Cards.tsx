"use client";

import { useTestimonialSectionData } from "../../services/queries";
import { fakeTestimonials } from "../../constants/testimonials";

import SingleTestimonial from "./SingleTestimonial";
import { useSearchParams } from "next/navigation";
import { getToken } from "@/lib/utils";

const Cards = () => {
  const { decodedToken } = getToken();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { data, refetch } = useTestimonialSectionData(userId!);
  const testimonials =
    data?.data.user.arikTemplate.testimonials.testimonials || [];

  const isOwner = decodedToken.userId === userId;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {testimonials.map((testimonial, index) => (
        <SingleTestimonial
          key={`R ${testimonial?.testimonial_heading}-${index}`}
          index={index}
          testimonial={testimonial}
          testimonials={testimonials}
          refetch={refetch}
          isOwner={isOwner}
        />
      ))}

      {testimonials.length < 6 &&
        fakeTestimonials
          .slice(testimonials.length, 6)
          .map((testimonial, index) => (
            <SingleTestimonial
              key={`F ${testimonial?.testimonial_heading} - ${index + 10}`}
              index={index}
              testimonial={testimonial}
              testimonials={testimonials}
              refetch={refetch}
              isOwner={isOwner}
            />
          ))}
    </div>
  );
};

export default Cards;
