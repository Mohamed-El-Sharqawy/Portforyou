import SectionsHeading from "@/components/ui/SectionsHeading";
import TestimonialsContent from "./TestimonialsContent";

export default function Testimonials() {
  return (
    <section id="testimonials" className="marketing-section space-y-20">
      <SectionsHeading text="Testimonials" />

      <TestimonialsContent />
    </section>
  );
}
