import SectionsHeading from "@/components/ui/SectionsHeading";
import ServicesGrid from "./ServicesGrid";

export default function Services() {
  return (
    <section id="services" className="section">
      <SectionsHeading text="Our Services" />

      <ServicesGrid />
    </section>
  );
}
