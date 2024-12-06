"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import "./hero.css";

export default function Hero() {
  return (
    <section>
      <AuroraBackground className="hero text-white">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <p className="hero-head">Background lights are cool you know.</p>
          <p className="hero-paragraph">And this, is chemical burn.</p>
        </motion.div>
      </AuroraBackground>{" "}
    </section>
  );
}
