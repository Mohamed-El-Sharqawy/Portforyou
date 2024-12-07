"use client";

import Button from "@/components/ui/Button";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { MemoizedStars } from "./Stars";

import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <AuroraBackground className="relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <h2 className="hero-head">
            Portfolio Creation Made Simple, Sharing Made Seamless.
          </h2>

          <p className="hero-paragraph">
            Build Stunning Portfolios Effortlessly.
          </p>

          <div className="relative z-50 w-fit mx-auto">
            <Button className="hero-button" text="Get Started" />
          </div>
        </motion.div>
      </AuroraBackground>
      <MemoizedStars />
    </section>
  );
}
