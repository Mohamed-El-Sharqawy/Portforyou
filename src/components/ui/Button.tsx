import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

type LoginButtonProps = ButtonProps & {
  text: string;
  className?: string;
}

export default function Button({
  text,
  className,
  ...props
}: LoginButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex h-12 min-w-24 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#1518a3_10%,#3b82f6_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 font-medium text-white backdrop-blur-3xl">
        {text}
      </span>
    </button>
  );
}
