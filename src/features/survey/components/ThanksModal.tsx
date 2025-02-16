"use client";

import Portal from "@/components/Portal";
import Link from "next/link";

import { motion } from "motion/react";

export default function ThanksModal({ showModal }: { showModal: boolean }) {
  return (
    <Portal selector="body">
      {showModal && (
        <div
          data-cy="survey-thankyou-modal"
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[1000]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 mx-4 space-y-6 max-w-md bg-gray-900 rounded-2xl"
          >
            <h3 className="font-serif text-2xl text-center text-white">
              Thank you for completing the survey!
            </h3>
            <p className="text-center text-gray-300">
              Your responses will help us provide a better experience.
            </p>
            <div className="flex justify-center mt-6">
              <Link
                href="/templates"
                data-cy="continue-to-templates-btn"
                className="px-8 py-3 font-medium text-white bg-blue-600 rounded-lg transition-colors duration-200 hover:bg-blue-700"
              >
                Continue to Templates
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </Portal>
  );
}
