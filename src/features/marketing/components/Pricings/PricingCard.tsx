import { Check, X } from "lucide-react";
import { Plan } from "../../constants/pricings";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/ui/shine-border";
import { motion } from "framer-motion";

export default function PricingCard({
  plan,
  index,
}: {
  plan: Plan;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      transition={{ duration: 1, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.40 }}
    >
      <ShineBorder
        className="relative p-8 pt-0 flex w-full flex-col items-start overflow-hidden rounded-lg border md:shadow-xl"
        color={["#3b82f6", "#7F00FF", "#0a59da"]}
      >
        <div className="absolute inset-0 rounded-[22px]" />

        <h3 className="relative text-[40px] mt-5 font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          {plan.subscription}
        </h3>

        <div className="relative my-8">
          <span className="text-sm text-zinc-400 uppercase">Price</span>
          <h4 className="text-[48px] font-bold text-white">{plan.price}</h4>
        </div>

        <div className="relative space-y-4">
          {plan.features.map((feature) => {
            return feature.available ? (
              <p
                key={feature.id}
                className="flex items-center text-[18px] text-zinc-100"
              >
                <Check className="shrink-0 w-5 h-5 text-emerald-500 mr-3" />
                <span>{feature.label}</span>
              </p>
            ) : (
              <p
                key={feature.id}
                className="flex items-center text-[18px] text-zinc-400/70"
              >
                <X className="shrink-0 w-5 h-5 text-red-500/70 mr-3" />
                <span>{feature.label}</span>
              </p>
            );
          })}
        </div>

        <div className="mt-8 relative w-full">
          <button
            className={cn(
              "w-full h-12 rounded-lg font-medium",
              "bg-gradient-to-r from-cyan-500 to-blue-600",
              "text-white shadow-lg shadow-blue-500/25",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            )}
          >
            Get Started
          </button>
        </div>
      </ShineBorder>
    </motion.div>
  );
}
