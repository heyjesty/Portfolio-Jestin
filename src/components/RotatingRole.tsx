"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const HOLD = 2800;

/**
 * Rolls role titles through one clipped line: the current title slides up into
 * view while the previous one slides out the top.
 */
export default function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cycle = setInterval(() => {
      setIndex((i) => {
        setPrev(i);
        return (i + 1) % roles.length;
      });
    }, HOLD);
    return () => clearInterval(cycle);
  }, [roles.length]);

  return (
    <span className={styles.role}>
      {/* Screen readers get every title once instead of a constantly changing heading. */}
      <span className="sr-only">{roles.join(", ")}</span>
      <span className={styles.roleStack} aria-hidden="true">
        {roles.map((role, r) => (
          <span
            key={role}
            className={`${styles.roleItem} ${
              r === index ? styles.roleIn : r === prev ? styles.roleOut : ""
            }`}
          >
            {role}
            <span className={styles.dot}>.</span>
          </span>
        ))}
      </span>
    </span>
  );
}
