import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";
import { memo } from "react";

const Stars = () => {
  const isMobile = useIsMobile();

  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.75 }}
      className="absolute inset-0"
      key={+isMobile}
    >
      {[...Array(isMobile ? 10 : 30)].map((_, i) => (
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
    </motion.div>
  );
};

export const MemoizedStars = memo(Stars);
