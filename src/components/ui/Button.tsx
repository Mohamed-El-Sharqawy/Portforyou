import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = React.ComponentPropsWithoutRef<"a">;

type LoginButtonProps = ButtonProps & {
  text: string;
  className?: string;
  href?: string;
};

export default function Button({
  text,
  className,
  href,
  ...props
}: LoginButtonProps) {
  return (
    <Link
      role="button"
      aria-label="Get Started - Login"
      href={href ?? "#"}
      {...props}
      className={cn(
        "inline-flex overflow-hidden relative h-12 rounded-full min-w-24 p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#1518a3_10%,#3b82f6_100%)]" />
      <span className="inline-flex justify-center items-center px-3 py-1 w-full h-full font-medium text-white rounded-full backdrop-blur-3xl cursor-pointer bg-slate-950">
        {text}
      </span>
    </Link>
  );
}
