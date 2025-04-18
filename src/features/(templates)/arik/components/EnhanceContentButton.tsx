import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function EnhanceContentButton({
  onClick,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <span
      onClick={onClick}
      {...props}
      className={cn(
        "absolute top-2 -right-8 text-wheat transition-colors opacity-0 group-hover:opacity-100 z-[999]",
        className
      )}
    >
      <Sparkles className="w-6 h-6" />
    </span>
  );
}
