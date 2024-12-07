"use client";

import Button from "@/components/ui/Button";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { MemoizedStars } from "./Stars";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <AuroraBackground className="relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
        >
          <h2 className="relative text-2xl sm:text-3xl md:text-5xl xl:text-7xl font-bold dark:text-white mb-8 max-w-7xl w-full text-center">
            Portfolio Creation Made Simple, Sharing Made Seamless.
          </h2>

          <p className="relative font-extralight text-base md:text-3xl dark:text-neutral-200 py-4 text-center">
            Build Stunning Portfolios Effortlessly.
          </p>

          <div className="relative z-50 w-fit mx-auto mt-8">
            <Button text="Get Started" />
          </div>
        </motion.div>
      </AuroraBackground>
      <MemoizedStars />
    </section>
  );
}
