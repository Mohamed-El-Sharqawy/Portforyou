import { BackgroundBeams } from "@/components/ui/background-beams";
import SectionsHeading from "@/components/ui/SectionsHeading";
import ShineBorder from "@/components/ui/shine-border";

export default function Contact() {
  return (
    <section id="contact" className="marketing-section space-y-20">
      <SectionsHeading text="Contact Us" />
      <ShineBorder
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl"
        color={["#3b82f6", "#7F00FF", "#0a59da"]}
      >
        <div className="h-[40rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              Join the waitlist
            </h1>
            <p></p>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              Welcome to MailJet, the best transactional email service on the
              web. We provide reliable, scalable, and customizable email
              solutions for your business. Whether you&apos;re sending order
              confirmations, password reset emails, or promotional campaigns,
              MailJet has got you covered.
            </p>
            <input
              type="text"
              placeholder="hi@manuarora.in"
              className="rounded-lg border p-4 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
            />
            <div className="relative z-10 w-fit mt-6 mx-auto">
              <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Shimmer
              </button>
            </div>
          </div>
          <BackgroundBeams />
        </div>
      </ShineBorder>
    </section>
  );
}
