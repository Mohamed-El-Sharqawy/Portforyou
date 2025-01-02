import Link from "next/link";

type LoginButton = React.ComponentPropsWithoutRef<"a">;

/**
 * Renders a login button that navigates to the sign-in page.
 * The button has a gradient background and an animated underline.
 * Additional props can be passed to customize the button.
 */
export default function LoginButton({ ...props }: LoginButton) {
  return (
    <Link
      {...props}
      href={"/sign-in"}
      role="button"
      aria-label="Login button"
      className="inline-block relative p-px font-sans text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900"
    >
      <span className="overflow-hidden absolute inset-0 rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
        <span>Login</span>
        <svg
          fill="none"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 8.75L14.25 12L10.75 15.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
    </Link>
  );
}
