import SectionsHeading from "@/components/ui/SectionsHeading";
import Marquee from "@/components/ui/marquee";
import { firstRow, secondRow } from "../../constants/testimonials";
import { ReviewCard } from "./TestimonialsCard";

export default function Testimonials() {
  return (
    <section id="testimonials" className="marketing-section">
      <SectionsHeading text="Testimonials" />
      <div className="relative flex mt-20 w-full flex-col items-center justify-center overflow-hidden  bg-background ">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </section>
  );
}
