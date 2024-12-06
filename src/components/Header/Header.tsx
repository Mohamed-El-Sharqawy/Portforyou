import Link from "next/link";
import SparklesText from "../ui/sparkles-text";
import HeaderNavLinks from "./HeaderNavLinks";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="absolute top-0 inset-x-0 z-50">
      <div className="header-container container flex items-center justify-between py-6 pb-7 bg-black bg-opacity-25 rounded-br-[40px] rounded-bl-[40px]">
        {/* Logo */}
        <Link href={"/"}>
          <SparklesText
            className="italic lg:text-4xl xl:text-6xl"
            text="Portforyou"
            colors={{ first: "violet", second: "#3b82f6" }}
          />
        </Link>

        {/* Links */}
        <HeaderNavLinks />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
