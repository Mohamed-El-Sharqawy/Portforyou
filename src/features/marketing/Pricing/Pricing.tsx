"use client";
import SectionsHeading from "@/components/ui/SectionsHeading";
import BackgroundGradientDemo  from "./PricingCard";
import { plans } from "../constants/pricings";



export default function Pricing() {
  return (
    <section className="marketing-section">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-10 text-secondary">
        {plans.map((plan)=>{
          return <BackgroundGradientDemo key={plan.subscription} plan={plan} />
        })}
      </div>
      <SectionsHeading text="Pricing" />
    </section>
  );
}









