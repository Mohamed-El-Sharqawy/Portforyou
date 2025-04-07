import { Loader2 } from "lucide-react";

export default function EnhancingLoader() {
  return (
    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <Loader2 className="w-10 h-10 text-wheat animate-spin" />
    </span>
  );
}
