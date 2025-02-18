"use client";

import { useTestimonialSectionData } from "../../services/queries";
import { fakeTestimonials } from "../../constants/testimonials";

import SingleTestimonial from "./SingleTestimonial";

const Cards = () => {
  const { data, refetch } = useTestimonialSectionData();
  const testimonials =
    data?.data.user.arikTemplate.testimonials.testimonials || [];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {testimonials.map((testimonial, index) => (
        <SingleTestimonial
          key={`R ${testimonial?.testimonial_heading}-${index}`}
          index={index}
          testimonial={testimonial}
          testimonials={testimonials}
          refetch={refetch}
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
            />
          ))}
    </div>
  );
};

export default Cards;
