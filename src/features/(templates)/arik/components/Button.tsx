import TopRightArrow from "@/features/(templates)/arik/assets/icons/top-right-arrow";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function Button({
  text,
  className,
  href,
}: {
  text: string;
  className?: string;
  href?: string;
}) {
  return href ? (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-3 bg-wheat text-black uppercase px-4 py-3 rounded-sm transition hover:brightness-75",
        className
      )}
    >
      {text} <TopRightArrow onlyIcon />
    </Link>
  ) : (
    <button
      className={cn(
        "flex items-center gap-x-3 bg-wheat text-black uppercase px-4 py-3 rounded-sm transition hover:brightness-75",
        className
      )}
    >
      {text} <TopRightArrow onlyIcon />
    </button>
  );
}
