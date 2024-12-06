"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section>
      <Test />
    </section>
  );
}

const Test = () => {
  return (
    <AuroraBackground className="text-white">
      <motion.div
        className="relative flex flex-col gap-4 items-center justify-center px-4"
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <p className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Background lights are cool you know.
        </p>
        <p className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </p>
      </motion.div>
    </AuroraBackground>
  );
};
