export type Step = {
  step_heading: string;
  step_subheading: string;
  step_paragraph: string;
  step_points: string[];
};

export type WorkSteps = {
  process_heading: string;
  process_paragraph: string;
  steps: Step[];
};
