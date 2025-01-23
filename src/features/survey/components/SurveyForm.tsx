"use client";

import { motion } from "motion/react";

import SurveyFormContent from "./SurveyFormContent";
import { useUserPreferences } from "../services/queries";
import Loading from "@/app/loading";
import useToken from "@/hooks/useToken";
import { redirect } from "next/navigation";

export default function SurveyForm() {
  const {
    decodedToken: { userId },
  } = useToken();
  const { data, isPending } = useUserPreferences(userId);

  const hasPreferences =
    data?.data?.user?.preferences?.colors.length > 0 &&
    data?.data?.user?.preferences?.profession;

  if (isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!isPending && hasPreferences) return redirect("/templates");

  return (
    <div className="container px-4 py-20 mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto max-w-3xl font-serif text-xl text-center text-white sm:text-3xl md:text-4xl"
      >
        Your preferences and profession help us improve your experience
      </motion.h1>

      <SurveyFormContent />
    </div>
  );
}
