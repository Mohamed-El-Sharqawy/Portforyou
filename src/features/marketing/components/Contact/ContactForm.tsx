"use client";

import ShineBorder from "@/components/ui/shine-border";

import { BackgroundBeams } from "@/components/ui/background-beams";

export default function ContactForm() {
  return (
    <ShineBorder
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl"
      color={["#3b82f6", "#7F00FF", "#0a59da"]}
    >
      <div className="h-[40rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-2xl mx-auto p-4 space-y-8"
        >
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Stay Updated with Portforyou
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-center relative z-10">
            Join the waitlist to be the first to know when we launch. Get
            exclusive updates, features, and access to the best
            portfolio-building SaaS platform.
          </p>
          <input
            type="text"
            placeholder="youremail@example.com"
            className="rounded-lg border p-4 border-neutral-800 focus:ring-2 focus:ring-primary/60 outline-none w-full relative z-10 mt-4 transition bg-neutral-950 placeholder:text-neutral-700"
          />
          <div className="relative z-10 w-fit mx-auto">
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/75">
              Submit
            </button>
          </div>
        </form>
        <BackgroundBeams />
      </div>
    </ShineBorder>
  );
}
