"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  priority?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "flex relative flex-col justify-center items-center h-[100vh] text-slate-950 transition-bg will-change-[opacity]",
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="overflow-hidden absolute inset-0"
        viewport={{ once: true }}
      >
        <video
          src="https://res.cloudinary.com/dxfphp6to/video/upload/q_auto,f_auto,w_auto,dpr_auto/v1734601801/test_hdbfzb.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
      {children}
    </div>
  );
};
