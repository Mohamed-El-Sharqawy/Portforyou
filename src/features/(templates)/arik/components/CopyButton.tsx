"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Copy } from "lucide-react";
import { getToken } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function CopyButton() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const userIdQuery = searchParams.get("userId");

  const isOwner = userId === userIdQuery;

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const { decodedToken } = getToken();
    setUserId(decodedToken?.userId);
  }, []);

  return (
    <div className={`fixed bottom-8 ${isOwner ? "right-24" : "right-8"} z-50`}>
      <Button
        className="text-wheat"
        text={copied ? "Copied!" : "Copy URL"}
        onClick={handleCopy}
      >
        <Copy className="ml-2" size={16} />
      </Button>
    </div>
  );
}
