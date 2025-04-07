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
  handleResumeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resume: File | null;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useSurveyData(): UseSurveyDataReturn {
  const { data } = useUserPreferences();

  const [surveyData, setSurveyData] = useState<SurveyData>({
    colors: data.data.user.preferences.colors,
    profession: data.data.user.preferences.profession,
    email: data.data.user.preferences.email,
  });
  const [showModal, setShowModal] = useState(false);
  const [otherProfession, setOtherProfession] = useState("");

  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resume, setResume] = useState<File | null>(null);

  const handleOtherProfessionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOtherProfession(e.target.value);
    },
    []
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setResume(file);

    // Generate a unique file ID for this upload session
    const fileId = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    try {
      // Read the file as text
      const fileContent = await readFileAsText(file);

      // Split the content into chunks (max ~12KB per chunk to stay well under token limits)
      const MAX_CHUNK_SIZE = 1000;
      const chunks = splitTextIntoChunks(fileContent, MAX_CHUNK_SIZE);

      // let allResponses = "";

      // Upload each chunk sequentially
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const isLastChunk = i === chunks.length - 1;

        // Create a blob from the chunk text
        const chunkBlob = new Blob([chunk], { type: "text/plain" });

        // Create a File object from the blob
        const chunkFile = new File([chunkBlob], `${file.name}.part${i}`, {
          type: file.type,
          lastModified: file.lastModified,
        });

        const formData = new FormData();
        formData.set("resume", chunkFile);
        formData.set("fileId", fileId);
        formData.set("chunkIndex", i.toString());
        formData.set("totalChunks", chunks.length.toString());
        formData.set("isLastChunk", isLastChunk ? "true" : "false");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        // For the last chunk, we expect the summary
        if (isLastChunk) {
          const text = await response.text();
          try {
            const data = JSON.parse(text);
            console.log("Resume Summary:", data.summary);
            // allResponses = data.summary;
          } catch (error) {
            console.error("Invalid JSON Response:", text, error);
          }
        } else {
          // For intermediate chunks, just log the progress
          console.log(`Chunk ${i + 1}/${chunks.length} uploaded`);
        }
      }

      setResume(null);
    } catch (error) {
      console.error("Upload failed", error);
      setResume(null);
    }
  };

  // Helper function to read a file as text
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  // Helper function to split text into chunks
  const splitTextIntoChunks = (
    text: string,
    maxChunkSize: number
  ): string[] => {
    const chunks: string[] = [];
    let currentChunk = "";

    // Split by paragraphs to maintain some context
    const paragraphs = text.split(/\n\s*\n/);

    for (const paragraph of paragraphs) {
      // If adding this paragraph would exceed the chunk size, start a new chunk
      if (
        currentChunk.length + paragraph.length > maxChunkSize &&
        currentChunk.length > 0
      ) {
        chunks.push(currentChunk);
        currentChunk = paragraph;
      } else {
        currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
      }
    }

    // Add the last chunk if it's not empty
    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
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
  }, [data, surveyData]);

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
    showModal,
    otherProfession,
    handleProfessionSelect,
    handleOtherProfessionChange,
    handleSubmit,
    handleColorSelect,
    surveyData,
    isComplete,
    progress,
    handleResumeUpload,
    resume,
    handleEmailChange,
  };
}
