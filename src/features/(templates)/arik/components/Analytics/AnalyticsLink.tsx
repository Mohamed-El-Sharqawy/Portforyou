"use client";

import { getToken } from "@/lib/utils";
import { BarChart2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AnalyticsLink() {
  const [currentUserId, setCurrentUserId] = useState("");
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const userId = urlParams.get('userId');

  useEffect(() => {
    const { decodedToken } = getToken();
    setCurrentUserId(decodedToken?.userId)
  }, []);
  
  // Only show analytics link to the template owner
  if (userId && currentUserId === userId) {
    return (
      <Link
        href={`/templates/arik/analytics?userId=${userId}`}
        className="flex items-center gap-x-2 text-wheat/80 hover:text-wheat transition-colors"
      >
        <BarChart2 size={28} className="cursor-pointer" />
        <p className="text-sm">View Analytics</p>
      </Link>
    );
  }
  
  return null;
}