"use client";

import ShowButtons from "@/features/(templates)/components/ShowButtons";
import TemplatesHeadings from "@/features/(templates)/components/TemplatesHeadings";
import TemplatesGrid from "@/features/(templates)/components/TemplatesGrid";

import { useState } from "react";
import { templates } from "@/features/(templates)/constants/templates";

export default function Templates() {
  const [showAll, setShowAll] = useState(false);
  const [shuffledTemplates, setShuffledTemplates] = useState(templates);

  const displayedTemplates = showAll
    ? shuffledTemplates
    : shuffledTemplates.slice(0, 3);

  return (
    <div className="container mx-auto px-4 pt-40">
      <TemplatesHeadings />

      <TemplatesGrid templates={displayedTemplates} />

      <ShowButtons
        templates={templates}
        showAll={showAll}
        setShowAll={setShowAll}
        setShuffledTemplates={setShuffledTemplates}
      />
    </div>
  );
}
