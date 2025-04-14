"use client";

import { getToken } from "@/lib/utils";
import { BarChart2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function AnalyticsLink() {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    const { decodedToken } = getToken();
    setCurrentUserId(decodedToken?.userId);
  }, [userId]);

  // Only show analytics link to the template owner
  if (currentUserId === userId) {
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
