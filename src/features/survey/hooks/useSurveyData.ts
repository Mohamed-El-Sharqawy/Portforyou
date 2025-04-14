"use client";

import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

import cookie from "js-cookie";
import { updatePreferences } from "../services/api";
import { useUserPreferences } from "../services/queries";
import { professions } from "../constants/surveyForm";

export interface SurveyData {
  colors: string[];
  profession: string;
  email: string;
  resume?: string;
}

interface UseSurveyDataReturn {
  surveyData: SurveyData;
  setSurveyData: (surveyData: SurveyData) => void;
  isComplete: boolean;
  progress: number;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  otherProfession: string;
  handleProfessionSelect: (profession: string) => void;
  handleOtherProfessionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColorSelect: (color: string) => void;
  handleSubmit: () => Promise<void>;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploadingResume: boolean;
  setIsUploadingResume: (isUploadingResume: boolean) => void;
}

export function useSurveyData(): UseSurveyDataReturn {
  const { data } = useUserPreferences();

  const [surveyData, setSurveyData] = useState<SurveyData>({
    colors: data?.data?.user?.preferences?.colors || [],
    profession: data?.data?.user?.preferences?.profession || "",
    email: data?.data?.user?.preferences?.email || "",
    resume: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [otherProfession, setOtherProfession] = useState("");
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOtherProfessionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOtherProfession(e.target.value);
    },
    []
  );

  // Email validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setSurveyData((prev) => ({ ...prev, email }));
  };

  const handleSubmit = async () => {
    if (!isComplete) {
      // Show error or validation message
      return;
    }

    const token = cookie.get("token");
    const decodedToken = jwtDecode(token!) as {
      userId: string;
      email: string;
    };

    const res = await updatePreferences({
      userId: decodedToken?.userId,
      colors: surveyData.colors,
      profession:
        surveyData.profession === "Other"
          ? otherProfession || "Other"
          : surveyData.profession,
      email: surveyData.email,
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

  const handleProfessionSelect = useCallback((prof: string) => {
    if (prof === "Other") {
      setOtherProfession("");
    }
    updateProfession(prof);
  }, []);

  useEffect(() => {
    if (data) {
      setSurveyData({
        colors: data.data.user.preferences.colors,
        profession: data.data.user.preferences.profession,
        email: data.data.user.preferences.email,
        resume: data.data.user.preferences.resume || "",
      });
    }
  }, [data]);

  useEffect(() => {
    // Calculate progress
    let completedSteps = 0;
    if (surveyData.colors.length > 0) completedSteps++;
    if (surveyData.profession) completedSteps++;
    if (surveyData.email) completedSteps++;

    const totalSteps = 3; // Total number of steps in the survey
    const newProgress = (completedSteps / totalSteps) * 100;
    setProgress(newProgress);

    // Check if survey is complete
    setIsComplete(completedSteps === totalSteps);
  }, [surveyData]);

  useEffect(() => {
    if (surveyData.profession && !professions.includes(surveyData.profession)) {
      handleProfessionSelect("Other");
      handleOtherProfessionChange({
        target: { value: surveyData.profession },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [
    surveyData.profession,
    handleOtherProfessionChange,
    handleProfessionSelect,
  ]);

  return {
    surveyData,
    setSurveyData,
    handleSubmit,
    handleEmailChange,
    handleProfessionSelect,
    handleOtherProfessionChange,
    handleColorSelect,
    isComplete,
    progress,
    showModal,
    setShowModal,
    otherProfession,
    isUploadingResume,
    setIsUploadingResume,
  };
}
