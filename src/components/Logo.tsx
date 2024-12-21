"use client";

import Link from "next/link";
import SparklesText from "./ui/sparkles-text";

export default function Logo() {
  const scroll = (e: React.MouseEvent) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link
      href={"/"}
      onClick={(e) => {
        if (window.location.pathname == "/") {
          scroll(e);
        } else {
          e.isPropagationStopped();
        }
      }}
    >
      <SparklesText
        className="italic text-2xl lg:text-4xl xl:text-6xl"
        text="Portforyou"
        colors={{ first: "violet", second: "#3b82f6" }}
      />
    </Link>
  );
}
