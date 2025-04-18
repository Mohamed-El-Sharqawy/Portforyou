"use client";

import ShowButtons from "@/features/(templates)/components/ShowButtons";
import TemplatesHeadings from "@/features/(templates)/components/TemplatesHeadings";

import { useState } from "react";
import { templates } from "@/features/(templates)/constants/templates";
import TemplatesGrid from "@/features/(templates)/components/TemplatesGrid";

export default function Templates() {
  const [displayedTemplates, setDisplayedTemplates] = useState(
    templates.slice(0, 3)
  );
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="container mx-auto px-4 pt-40 pb-8 font-arial">
      <TemplatesHeadings />

      <TemplatesGrid templates={displayedTemplates} />

      <ShowButtons
        templates={templates}
        showAll={showAll}
        setShowAll={setShowAll}
        setTemplates={setDisplayedTemplates}
      />
    </div>
  );
}
