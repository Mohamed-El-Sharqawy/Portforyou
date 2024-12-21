"use client";

import Button from "@/components/ui/Button";

import { motion } from "motion/react";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      viewport={{ once: true, amount: 0 }}
      className="relative z-10 will-change-[opacity]"
    >
      <h1 className="relative px-4 mb-8 w-full max-w-7xl text-xl font-bold text-center sm:px-0 sm:text-3xl md:text-5xl xl:text-7xl dark:text-white">
        Portfolio Creation Made Simple, Sharing Made Seamless.
      </h1>

      <p className="relative px-4 py-4 text-base font-extralight text-center sm:px-0 md:text-3xl dark:text-neutral-200">
        Build Stunning Portfolios Effortlessly.
      </p>

      <div className="relative z-50 mx-auto mt-8 w-fit">
        <Button data-cy="login-btn" href="/sign-in" text="Get Started" />
      </div>
    </motion.div>
  );
}
