"use client";

import Link from "next/link";
import SparklesText from "./ui/sparkles-text";

type LogoProps = {
  scrollToTop?: boolean;
};

export default function Logo({ scrollToTop }: LogoProps) {
  const scroll = (e: React.MouseEvent) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link href={"/"} onClick={scrollToTop ? scroll : undefined}>
      <SparklesText
        className="italic text-2xl lg:text-4xl xl:text-6xl"
        text="Portforyou"
        colors={{ first: "violet", second: "#3b82f6" }}
      />
    </Link>
  );
}
