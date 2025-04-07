"use client";

import { getToken } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const { decodedToken } = getToken();

  return (
    <Link
      onClick={(e) => {
        if (window.location.pathname == "/templates/arik") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      href={`/templates/arik?userId=${decodedToken?.userId}`}
      className="inline-block w-fit cursor-pointer"
    >
      <Image
        className="w-[52px] h-[20px]"
        src={"/arik/logo.svg"}
        alt="logo"
        width={52}
        height={20}
      />
    </Link>
  );
}
