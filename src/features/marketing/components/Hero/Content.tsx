"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { memo } from "react";

export default function Content() {
  return (
    <AuroraBackground className="hero relative z-10 text-white">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <h2 className="hero-head">Portfolio Creation Made Simple, Sharing Made Seamless.</h2>
          <MemoizedStars />
        </div>
        <p className="hero-paragraph">
          Build Stunning Portfolios Effortlessly.
        </p>

        <div className="relative z-50 w-fit mx-auto">
          <Button text="Get Started" />
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
        ></motion.span>
      ))}
    </div>
  );
};

const MemoizedStars = memo(Stars);
