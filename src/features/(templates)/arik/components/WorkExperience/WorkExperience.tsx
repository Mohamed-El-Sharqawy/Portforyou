import SectionTitle from "./SectionTitle";
import Projects from "./Projects";

import "./work-experience.css";

export default function WorkExperience() {
  return (
    <section
      className="container work-experience-section space-y-8 pb-20"
      id="work-experience-section"
    >
      <SectionTitle />

      <Projects />
    </section>
  );
}
