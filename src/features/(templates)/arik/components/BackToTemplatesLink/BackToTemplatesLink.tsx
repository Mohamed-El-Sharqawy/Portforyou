"use client";

import { getToken } from "@/lib/utils";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function BackToTemplatesLink() {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const { decodedToken } = getToken();
    setUserId(decodedToken?.userId);
  }, []);

  if(!userId) return null;

  return (
    <Link href={"/templates"} className="flex items-center gap-x-2">
      <ArrowLeftCircle size={28} className="cursor-pointer" />
      <p className="text-sm">Back to Templates</p>
    </Link>
  );
}
