"use client";

import ShineBorder from "@/components/ui/shine-border";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useIsMobile } from "@/hooks/useIsMobile";
import useNewsletterForm from "@/features/marketing/hooks/useNewsletterForm";
import { useState } from "react";

export default function NewsletterForm() {
  const { sendMail, isLoading, form } = useNewsletterForm();
  const [email, setEmail] = useState("");
  const isMobile = useIsMobile();

  return (
    <ShineBorder
      className="flex overflow-hidden relative flex-col justify-center items-center w-full rounded-lg border md:shadow-xl"
      color={["#3b82f6", "#7F00FF", "#0a59da"]}
    >
      <div className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
        <form
          ref={form}
          onSubmit={async (e) => {
            e.preventDefault();
            // Send mail to mailchimp and then clear the input field
            await sendMail(e, email);
            setEmail("");
          }}
          className="p-4 mx-auto space-y-8 max-w-2xl"
        >
          <h2 className="relative z-10 font-sans text-lg font-bold text-center text-transparent bg-clip-text bg-gradient-to-b md:text-7xl from-neutral-200 to-neutral-600">
            Stay Updated with Portforyou
          </h2>
          <p></p>
          <p className="relative z-10 mx-auto my-2 max-w-lg text-center text-neutral-500">
            Join the waitlist to be the first to know when we launch. Get
            exclusive updates, features, and access to the best
            portfolio-building SaaS platform.
          </p>
          <input
            type="text"
            name="email"
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="relative z-10 p-4 mt-4 w-full rounded-lg border transition outline-none border-neutral-800 focus:ring-2 focus:ring-primary/60 bg-neutral-950 placeholder:text-neutral-700"
          />
          <div className="relative z-10 mx-auto w-fit">
            <button
              type="submit"
              disabled={isLoading}
              aria-label="Submit to send us email. So, we can contact you"
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/75"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        {!isMobile && <BackgroundBeams />}
      </div>
    </ShineBorder>
  );
}
