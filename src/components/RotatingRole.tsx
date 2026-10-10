"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const roles = ["UI/UX Designer", "Creative Technologist", "Vibe Coder"];
const HOLD = 2600;
const EXIT = 450;

/** Cycles through roles, easing each word out and the next one in. */
export default function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setLeaving(true);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setLeaving(false);
      }, EXIT);
    }, HOLD + EXIT);
    return () => {
      clearInterval(cycle);
      clearTimeout(swap);
    };
  }, []);

  return (
    <span className={styles.role}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        <span key={index} className={`${styles.word} ${leaving ? styles.wordOut : ""}`}>
          {roles[index]}
        </span>
        <span className={styles.dot}>.</span>
      </span>
    </span>
  );
}
