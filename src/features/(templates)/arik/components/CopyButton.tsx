"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Copy } from "lucide-react";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button text={copied ? "Copied!" : "Copy URL"} onClick={handleCopy}>
        <Copy className="ml-2" size={16} />
      </Button>
    </div>
  );
}
