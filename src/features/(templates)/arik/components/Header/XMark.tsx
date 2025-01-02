export default function XMark({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: (value: boolean) => void;
}) {
  return (
    <svg
      onClick={() => setIsMobileMenuOpen(false)}
      id="close-icon"
      className="size-8 absolute top-16 right-8 cursor-pointer hover:filter hover:drop-shadow-[0_0_8px_#DAC5A7] transition"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
          fill="#DAC5A7"
        ></path>
      </g>
    </svg>
  );
}
