import Button from "@/features/(templates)/arik/components/Button";
import Marquee from "react-fast-marquee";

export default function CTA() {
  return (
    <section className="relative min-h-screen bg-wheat/5">
      <Marquee autoFill speed={150} className="bg-wheat/10 h-14">
        <div className="flex items-center gap-x-8 mr-8 text-sm">
          <span className="text-wheat uppercase">Let’s talk</span>
          <span className="text-wheat uppercase">+++</span>
        </div>
      </Marquee>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-wheat text-center">
        <span className="uppercase text-sm sm:text-base">Project in mind?</span>

        <h1 className="uppercase xl:text-[128px] max-w-[1200px] my-2 leading-tight text-balance md:text-[80px] sm:text-[60px] text-[32px]">
          Let’s make your <span className="font-serif">Website Shine</span>
        </h1>

        <p className="text-base sm:text-xl text-wheat/60 w-full px-3 sm:max-w-[500px] sm:px-0">
          Premium web design, webflow, and SEO services to help your business
          stand out.
        </p>

        <Button href="contact" className="mt-5 sm:mt-10" text="Get in touch" />
      </div>
    </section>
  );
}
