"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import cookie from "js-cookie";
import { updatePreferences } from "../services/api";

export interface SurveyData {
  colors: string[];
  profession: string;
}

interface UseSurveyDataReturn {
  surveyData: SurveyData;
  isComplete: boolean;
  progress: number;
  showModal: boolean;
  otherProfession: string;
  handleProfessionSelect: (profession: string) => void;
  handleOtherProfessionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleColorSelect: (colorId: string) => void;
}

export function useSurveyData(): UseSurveyDataReturn {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    colors: [],
    profession: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [otherProfession, setOtherProfession] = useState("");

  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOtherProfessionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherProfession(e.target.value);
  };

  const handleSubmit = async () => {
    if (!isComplete) {
      // Show error or validation message
      return;
    }

    const token = await cookie.get("token");
    const decodedToken = await (jwtDecode(token!) as {
      userId: string;
      email: string;
    });

    const res = await updatePreferences({
      userId: decodedToken.userId,
      colors: surveyData.colors,
      profession: surveyData.profession,
    });

    if (
      res.data.updateUserPreferences.email &&
      res.data.updateUserPreferences.email == decodedToken.email
    ) {
      return setShowModal(true);
    }
  };

  const updateColors = (colors: string[]) => {
    setSurveyData((prev) => ({ ...prev, colors }));
  };

  const updateProfession = (profession: string) => {
    setSurveyData((prev) => ({ ...prev, profession }));
  };

  const handleColorSelect = (colorId: string) => {
    const newColors = surveyData.colors.includes(colorId)
      ? surveyData.colors.filter((id) => id !== colorId)
      : [...surveyData.colors, colorId];
    updateColors(newColors);
  };

  const handleProfessionSelect = (prof: string) => {
    if (prof === "Other") {
      setOtherProfession("");
    }
    updateProfession(prof);
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
    showModal,
    otherProfession,
    handleProfessionSelect,
    handleOtherProfessionChange,
    handleSubmit,
    handleColorSelect,
    surveyData,
    isComplete,
    progress,
  };
}
