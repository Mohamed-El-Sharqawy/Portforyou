import SectionsHeading from "@/components/ui/SectionsHeading";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="marketing-section space-y-20">
      <SectionsHeading text="Contact Us" />

      <ContactForm />
    </section>
  );
}
