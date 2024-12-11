import SectionsHeading from "@/components/ui/SectionsHeading";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="newsletter" className="marketing-section space-y-20">
      <SectionsHeading text="Newsletter" />

      <ContactForm />
    </section>
  );
}
