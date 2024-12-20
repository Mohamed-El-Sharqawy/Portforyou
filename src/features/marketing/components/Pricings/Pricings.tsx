import SectionsHeading from "@/components/ui/SectionsHeading";
import PricingsGrid from "./PricingsGrid";

export default function Pricing() {
  return (
    <section id="pricings" className="section space-y-20">
      <SectionsHeading text="Pricings" />

      <PricingsGrid />
    </section>
  );
}
