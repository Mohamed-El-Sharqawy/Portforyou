import SectionsHeading from "@/components/ui/SectionsHeading";
import PricingsGrid from "./PricingsGrid";

export default function Pricing() {
  return (
    <section className="marketing-section space-y-20">
      <SectionsHeading text="Pricings" />

      <PricingsGrid />
    </section>
  );
}
