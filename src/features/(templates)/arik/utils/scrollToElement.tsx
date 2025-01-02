export const scrollToElement = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  e.preventDefault();

  const yOffset = -150;
  const element = document.querySelector<HTMLElement>(href);

  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
