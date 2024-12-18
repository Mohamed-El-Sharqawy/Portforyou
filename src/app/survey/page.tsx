import SurveyForm from "@/components/Survey/SurveyForm";

export default function Survey() {
  return (
    <section className="flex justify-center items-center pt-12 min-h-screen bg-gradient-to-br">
      <div className="container px-4 py-20 mx-auto">
        <h1 className="mx-auto max-w-3xl font-serif text-xl text-center text-white sm:text-3xl md:text-4xl">
          Your preferences and profession help us improve your experience
        </h1>
        <SurveyForm />
      </div>
    </section>
  );
}
