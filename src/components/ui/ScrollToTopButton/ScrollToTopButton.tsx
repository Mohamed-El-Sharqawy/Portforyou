"use client";

import { useEffect } from "react";

import "./scroll-to-top-button.css";

export default function ScrollToTopButton() {
  useEffect(() => {
    function scrollFunction() {
      const screenHeight = window.innerHeight - 100;
      const isEqualToScreenHeight =
        document.body.scrollTop > screenHeight ||
        document.documentElement.scrollTop > screenHeight;

      const button = document.getElementById("scrollToTopButton");

      if (isEqualToScreenHeight) {
        button?.classList.add("show");
      } else {
        button?.classList.remove("show");
      }
    }

    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <button
      onClick={() => {
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      role="link"
      className="button"
      id="scrollToTopButton"
    >
      <p className="button__text">
        <span style={{ "--index": 0 } as React.CSSProperties}>S</span>
        <span style={{ "--index": 1 } as React.CSSProperties}>C</span>
        <span style={{ "--index": 2 } as React.CSSProperties}>R</span>
        <span style={{ "--index": 3 } as React.CSSProperties}>O</span>
        <span style={{ "--index": 4 } as React.CSSProperties}>L</span>
        <span style={{ "--index": 5 } as React.CSSProperties}>L</span>
        <span style={{ "--index": 6 } as React.CSSProperties}> </span>
        <span style={{ "--index": 7 } as React.CSSProperties}>T</span>
        <span style={{ "--index": 8 } as React.CSSProperties}>O</span>
        <span style={{ "--index": 9 } as React.CSSProperties}> </span>
        <span style={{ "--index": 10 } as React.CSSProperties}>T</span>
        <span style={{ "--index": 11 } as React.CSSProperties}>O</span>
        <span style={{ "--index": 12 } as React.CSSProperties}>P</span>
        <span style={{ "--index": 14 } as React.CSSProperties}>❤️</span>
        <span style={{ "--index": 17 } as React.CSSProperties}>❤️</span>
      </p>

      <div className="button__circle">
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="button__icon"
          width="14"
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>

        <svg
          viewBox="0 0 14 15"
          fill="none"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
          className="button__icon button__icon--copy"
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );
}
