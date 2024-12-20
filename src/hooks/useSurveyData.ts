"use client";

import { useState, useEffect } from "react";

export interface SurveyData {
  colors: string[];
  profession: string;
}

interface UseSurveyDataReturn {
  surveyData: SurveyData;
  updateColors: (colors: string[]) => void;
  updateProfession: (profession: string) => void;
  isComplete: boolean;
  progress: number;
}

export function useSurveyData(): UseSurveyDataReturn {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    colors: [],
    profession: "",
  });

  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateColors = (colors: string[]) => {
    setSurveyData((prev) => ({ ...prev, colors }));
  };

  const updateProfession = (profession: string) => {
    setSurveyData((prev) => ({ ...prev, profession }));
  };

  useEffect(() => {
    // Calculate progress
    let completedSteps = 0;
    if (surveyData.colors.length > 0) completedSteps++;
    if (surveyData.profession) completedSteps++;

    const totalSteps = 2; // Total number of steps in the survey
    const newProgress = (completedSteps / totalSteps) * 100;
    setProgress(newProgress);

    // Check if survey is complete
    setIsComplete(completedSteps === totalSteps);
  }, [surveyData]);

  return {
    surveyData,
    updateColors,
    updateProfession,
    isComplete,
    progress,
  };
}
