import { testimonials } from "@/features/(templates)/arik/constants/testimonials";
import SingleTestimonial from "./SingleTestimonial";

export default function Testimonials() {
  return (
    <div className="w-full min-h-screen bg-black text-wheat px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Headings */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-5xl max-w-[250px] mx-auto leading-tight md:leading-tight md:max-w-[600px] md:text-8xl">
            What my <span className="font-serif italic">clients say</span>
          </h2>

          <p className="text-wheat/60 md:text-lg">
            See what my clients have to say about working with me and the
            results I helped them achieve.
          </p>
        </div>
        {/* Testimonials cards */}
        <Cards />
      </div>
    </div>
  );
}

const Cards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {testimonials.map((testimonial, index) => (
        <SingleTestimonial key={index} testimonial={testimonial} />
      ))}
    </div>
  );
};
