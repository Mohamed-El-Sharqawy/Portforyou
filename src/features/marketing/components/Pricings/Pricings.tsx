
import SectionsHeading from "@/components/ui/SectionsHeading";
import PricingsGrid from "./PricingsGrid";

export default function Pricing() {
  return (
    <section id="pricings" className="marketing-section space-y-20">
      <SectionsHeading text="Pricings" />

      <PricingsGrid />
    </section>
  );
}
