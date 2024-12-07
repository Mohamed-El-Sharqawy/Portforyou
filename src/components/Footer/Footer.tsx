import Link from "next/link";
import Logo from "../Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-12 font-sans mx-auto px-4 space-y-4 text-center">
      <div className="mb-12 w-fit mx-auto font-serif">
        <Logo scrollToTop />
      </div>

      <p>
        Made with ❤️ and dedication by{" "}
        <Link
          href={"https://mohamed-elsharqawy.vercel.app"}
          target="_blank"
          className="text-primary cursor-pointer hover:underline underline-offset-2"
        >
          @Mohamed_El_Sharqawy
        </Link>
      </p>
      <p className="text-gray-400">
        &copy; {currentYear} Portforyou | All rights reserved.
      </p>
    </footer>
  );
}
