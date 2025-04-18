import Button from "@/components/ui/Button";
import SectionsHeading from "@/components/ui/SectionsHeading";
// import PricingsGrid from "./PricingsGrid";

export default function Pricing() {
  return (
    <section id="pricings" className="section space-y-20 !pb-0">
      <SectionsHeading text="Pricings" />

      <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-xl p-6 shadow-lg border border-primary/20">
        <h3 className="text-2xl font-bold text-primary mb-3">Coming Soon!</h3>
        <p className="text-primary mb-6">
          As an open-source project, we&apos;re currently offering all our
          services for free while we work towards our development goals. Stay
          tuned for our future pricing plans!
        </p>

        <Button href="/templates" text="Try Our Templates" />
      </div>
    </section>
  );
}
