import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Check, X } from "lucide-react";
import { Plan } from "../constants/pricings";


export default function BackgroundGradientDemo ({plan}:{plan: Plan})  {
  return (
    <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-zinc-900">
      <h3 className="text-[40px] mt-5">{plan.subscription}</h3>
      <h4 className="text-[30px] my-5 mx-5">Price:<span className="text-[40px] text-center text-white">{plan.price}</span></h4>
      <div className="price-text-container"> 
        {plan.features.map((feature)=>{
          return feature.available ? <p className="text-white text-[20px] mb-5"><Check className="inline-block text-green-600 mx-2"/>{feature.label}</p> : <p className="text-white text-[20px] mb-5 opacity-50"><X className="inline-block text-red-600 mx-2"/>{feature.label}</p>
        })}
      </div>
      <div className="w-fit mx-auto my-10">
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Shimmer
        </button>
      </div>
    </BackgroundGradient>
  )
}