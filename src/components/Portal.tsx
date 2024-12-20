import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector: string;
}) {
  const ref = useRef<Element | DocumentFragment | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current!) : null;
}
