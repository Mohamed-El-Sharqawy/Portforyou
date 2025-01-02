"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      href="/templates/arik"
      className="inline-block w-fit cursor-pointer"
      data-no-blobity
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
