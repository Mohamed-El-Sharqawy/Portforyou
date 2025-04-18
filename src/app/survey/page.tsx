"use client";

import Fallback from "@/components/Fallback";
import SurveyFormContent from "@/features/survey/components/SurveyFormContent";

import { useUserPreferences } from "@/features/survey/services/queries";
import { motion } from "motion/react";

export default function Survey() {
  const { isPending } = useUserPreferences();

  if (isPending) {
    return <Fallback />;
  }

  return (
    <section className="flex justify-center items-center pt-12 min-h-screen bg-gradient-to-br font-arial">
      <div className="container px-4 py-20 mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto max-w-3xl text-xl text-center text-white sm:text-3xl md:text-4xl"
        >
          Your preferences and profession help us improve your experience and
          expand our template collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-4 max-w-2xl text-sm text-center text-gray-300 sm:text-base"
        >
          Currently offering 1 template, with more personalized options coming
          based on community feedback
        </motion.p>

        <SurveyFormContent />
      </div>
    </section>
  );
}
