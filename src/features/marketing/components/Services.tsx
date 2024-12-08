"use client";

import SectionsHeading from "@/components/ui/SectionsHeading";
import { services } from "../constants/services";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Meteors from "@/components/ui/meteors";

export default function Services() {
  return (
    <section id="services" className="marketing-section">
      <SectionsHeading text="Our Services" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl bg-slate-900/50 p-8 shadow-lg transition-all hover:shadow-xl border border-border/50 min-h-[280px] flex flex-col"
          >
            <div className="relative z-10 flex-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                {<service.icon className="h-7 w-7" />}
              </div>
              <h3 className="mb-3 text-lg font-semibold leading-none tracking-tight text-slate-100">
                {service.title}
              </h3>
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
        ))}
      </div>
    </section>
  );
}
