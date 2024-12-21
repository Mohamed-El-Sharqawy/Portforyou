import SectionsHeading from "@/components/ui/SectionsHeading";
import NewsletterForm from "./NewsletterForm";

export default function Contact() {
  return (
    <section id="newsletter" className="section space-y-20">
      <SectionsHeading text="Newsletter" />

      <NewsletterForm />
    </section>
  );
}
