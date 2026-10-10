"use client";

import { useEffect } from "react";

/** Fades `.reveal` elements in as they scroll into view (enabled by the `js-motion` class). */
export default function RevealObserver() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-motion")) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
