"use client";

import Button from "@/features/(templates)/arik/components/Button";
import Marquee from "react-fast-marquee";
import Content from "./Content";
import { useSearchParams } from "next/navigation";

export default function CTA() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <section className="relative min-h-screen bg-wheat/5 flex items-center justify-center flex-col">
      <Marquee
        autoFill
        speed={150}
        className="bg-wheat/10 h-14 !absolute inset-x-0 top-0"
      >
        <div className="flex items-center gap-x-8 mr-8 text-sm">
          <span className="text-wheat uppercase">Let’s talk</span>
          <span className="text-wheat uppercase">+++</span>
        </div>
      </Marquee>

      <div className="flex flex-col items-center justify-center text-wheat text-center">
        <span className="uppercase text-sm sm:text-base">Project in mind?</span>

        <Content />

        <Button
          href={`/templates/arik/contact?userId=${userId}`}
          className="mt-5 sm:mt-10"
          text="Get in touch"
        />
      </div>
    </section>
  );
}
