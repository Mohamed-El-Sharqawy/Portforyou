import { useState, useEffect, useCallback } from "react";

// Debounce utility function
function debounce<F extends (...args: any[]) => any>(func: F, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = useCallback(
    debounce(() => {
      setIsMobile(window.innerWidth < breakpoint);
    }, 250),
    []
  );

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Set initial value
      setIsMobile(window.innerWidth < breakpoint);

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Clean up event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize, breakpoint]);

  return isMobile;
};
