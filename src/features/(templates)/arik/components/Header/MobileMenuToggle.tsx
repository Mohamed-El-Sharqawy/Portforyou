export default function MobileMenuToggle({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: (value: boolean) => void;
}) {
  return (
    <svg
      onClick={() => setIsMobileMenuOpen(true)}
      viewBox="-2.4 -2.4 28.80 28.80"
      className="size-[40px] cursor-pointer hover:filter hover:drop-shadow-[0_0_8px_#DAC5A7] transition"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
      id="menu-icon"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.144"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Menu / Menu_Alt_02">
          <path
            id="Vector"
            d="M11 17H19M5 12H19M11 7H19"
            stroke="#DAC5A7"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
}
