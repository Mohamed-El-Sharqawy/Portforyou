import { motion } from "motion/react";
import { colorOptions, professions } from "../constants/surveyForm";
import { useSurveyData } from "../hooks/useSurveyData";

import ThanksModal from "./ThanksModal";

export default function SurveyFormContent() {
  const {
    showModal,
    otherProfession,
    handleProfessionSelect,
    handleOtherProfessionChange,
    handleSubmit,
    handleColorSelect,
    surveyData,
    isComplete,
    progress,
  } = useSurveyData();

  return (
    <>
      <div className="px-0 py-8 mx-auto space-y-12 max-w-4xl sm:px-8">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full bg-gray-700/30 rounded-full h-2.5 mb-6"
        >
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-8 space-y-8 rounded-2xl backdrop-blur-sm bg-gray-900/50"
        >
          <div className="space-y-6">
            <h2 className="mb-6 font-serif text-2xl text-white">
              What are your favorite colors?
              <span className="ml-2 font-sans text-sm text-gray-400">
                (Select one or more)
              </span>
            </h2>
            <div className="flex flex-wrap gap-4">
              {colorOptions.map((option) => (
                <button
                  name={option.id}
                  key={option.id}
                  onClick={() => handleColorSelect(option.id)}
                  data-no-blobity
                  data-blobity-invert={false}
                  className={`w-12 h-12 rounded-lg transition-all duration-200 transform hover:scale-110
              ${
                surveyData.colors.includes(option.id) ? "ring-4 ring-white" : ""
              }`}
                  style={{ backgroundColor: option.color }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="mb-6 font-serif text-xl text-white sm:text-2xl">
              What&apos;s your profession?
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {professions.map((prof) => (
                <button
                  key={prof}
                  name={prof}
                  onClick={() => handleProfessionSelect(prof)}
                  className={`p-2.5 text-sm text-center rounded-lg transition-all duration-200
                    ${
                      surveyData.profession === prof
                        ? "text-white bg-blue-600"
                        : "text-gray-300 bg-gray-800/50 hover:bg-gray-700/50"
                    }`}
                >
                  {prof}
                </button>
              ))}
            </div>

            {/* Other Profession Input */}
            {surveyData.profession === "Other" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <input
                  type="text"
                  value={otherProfession}
                  onChange={handleOtherProfessionChange}
                  placeholder="Enter your profession"
                  className="w-full p-2.5 text-sm rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  autoFocus
                />
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              name="submit-survey-btn"
              className={`px-8 py-3 rounded-lg transition-all duration-200 font-medium
                ${
                  isComplete
                    ? "text-white bg-blue-600 hover:bg-blue-700"
                    : "text-gray-300 bg-gray-600 cursor-not-allowed"
                }`}
            >
              Submit Survey
            </button>
          </motion.div>
        </motion.div>
      </div>

      <ThanksModal showModal={showModal} />
    </>
  );
}
