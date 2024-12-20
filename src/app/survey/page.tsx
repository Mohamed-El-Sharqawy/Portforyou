import SurveyForm from "@/components/Survey/SurveyForm";

export default function Survey() {
  return (
    <section className="flex justify-center items-center pt-12 min-h-screen bg-gradient-to-br">
      <div className="container px-4 py-20 mx-auto">
        <SurveyForm />
      </div>
    </section>
  );
}
