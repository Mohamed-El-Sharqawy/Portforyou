"use client";

import Link from "next/link";
import Logo from "../Logo";
import GithubIcon from "@/features/(templates)/arik/assets/icons/github";
import LinkedinIcon from "@/features/(templates)/arik/assets/icons/linkedin";
import LeetcodeIcon from "@/features/(templates)/arik/assets/icons/leetcode";
import UpArrow from "@/features/(templates)/arik/assets/icons/up-arrow";

const pages = [
  { href: "services", text: "Services" },
  { href: "work", text: "Work" },
  { href: "testimonials", text: "Testimonials" },
  { href: "about", text: "About" },
  { href: "contact", text: "Contact" },
  { href: "calendly-schedule", text: "Schedule a call" },
];

const socials = [
  {
    href: "https://github.com/Mohamed-El-Sharqawy",
    text: "GitHub",
    icon: <GithubIcon />,
  },
  {
    href: "https://www.linkedin.com/in/mohamed-elsharqawi/",
    text: "LinkedIn",
    icon: <LinkedinIcon />,
  },
  {
    href: "https://leetcode.com/u/El-Sharqawy/",
    text: "LeetCode",
    icon: <LeetcodeIcon />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-wheat/5 h-[500px] pt-16">
      <div className="container flex justify-between">
        <div>
          <Logo />
          <div className="flex flex-col gap-y-4 mt-8">
            {socials.map((social) => (
              <Link
                className="flex items-center gap-x-3 text-wheat/60 transition-colors hover:text-wheat hover:underline"
                key={social.href}
                href={social.href}
              >
                {social.icon}

                {social.text}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-light mb-8">Pages</h3>

          <div className="flex flex-col gap-y-4">
            {pages.map((page) => (
              <Link
                className="uppercase text-wheat/60 transition-colors hover:text-wheat hover:underline"
                href={page.href}
                key={page.href}
              >
                {page.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container flex items-center justify-between mt-20">
        <p className="text-wheat/60">
          © 2022 Made by Pawel Gola. Powered by Framer.
        </p>

        <button
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center gap-x-2"
        >
          <h4>To Top</h4>

          <div className="bg-wheat/5 w-fit p-4 rounded-full">
            <UpArrow />
          </div>
        </button>
      </div>
    </footer>
  );
}
