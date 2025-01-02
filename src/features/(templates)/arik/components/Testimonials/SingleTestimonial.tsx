import { TestimonialProps } from "@/features/(templates)/arik/types/testimonials";
import Image from "next/image";

type Props = {
  testimonial: TestimonialProps;
};

export default function SingleTestimonial({ testimonial }: Props) {
  return (
    <article
      className={
        "bg-wheat/5 border border-wheat/15 rounded-lg p-12 hover:bg-wheat/10 transition-colors"
      }
    >
      <div className="mb-8">
        <Image
          src={testimonial.logo}
          alt="Company logo"
          width={40}
          height={40}
          className="opacity-80 w-auto h-auto"
        />
      </div>

      <h2 className="text-xl font-medium mb-4 text-wheat">
        {testimonial.title}
      </h2>

      <p className="text-wheat/60 mb-8 leading-relaxed max-w-[490px]">
        {testimonial.content}
      </p>

      <div className="flex items-center gap-3">
        <div className="rounded-full overflow-hidden size-[60px]">
          <Image
            src={testimonial.author.avatar}
            alt={testimonial.author.name}
            width={60}
            height={60}
            className="object-cover w-auto h-auto"
          />
        </div>
        <div>
          <h3 className="font-medium text-wheat">{testimonial.author.name}</h3>
          <h5 className="text-sm text-wheat/60">
            {testimonial.author.company}
          </h5>
        </div>
      </div>
    </article>
  );
}
