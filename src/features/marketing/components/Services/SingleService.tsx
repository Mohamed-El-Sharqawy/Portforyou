"use client";

import Meteors from "@/components/ui/meteors";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Service } from "../../constants/services";

export default function SingleService({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl bg-slate-900/50 p-8 shadow-lg hover:shadow-xl border border-border/50 min-h-[280px] flex flex-col"
    >
      <div className="relative z-50 flex-1">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
          {<service.icon className="h-7 w-7" />}
        </div>

        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-100 leading-7">
          {service.title}
        </h2>

        <p className="text-sm text-slate-300">{service.description}</p>
      </div>

      <div
        className={cn(
          "absolute inset-0 z-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0",
          "transition-all duration-300 group-hover:opacity-100"
        )}
      />

      <Meteors />
    </motion.div>
  );
}
