import { plans } from "../../constants/pricings";
import PricingCard from "./PricingCard";

export default function PricingsGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-10 text-secondary">
      {plans.map((plan, index) => {
        return <PricingCard key={plan.subscription} plan={plan} index={index} />;
      })}
    </div>
  );
}
