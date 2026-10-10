"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./Hero.module.css";

const HOLD = 3000;

/**
 * Cycles role titles stacked in one spot. Letters of the incoming title rise into
 * place one after another while the outgoing title's letters drift up and fade.
 */
export default function RotatingRole({ roles }: { roles: string[] }) {
  const [{ index, prev }, setTurn] = useState<{ index: number; prev: number | null }>({
    index: 0,
    prev: null,
  });

  useEffect(() => {
    const cycle = setInterval(() => {
      setTurn(({ index }) => ({ index: (index + 1) % roles.length, prev: index }));
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
            {[...role, "."].map((char, i) => (
              <span
                key={i}
                className={`${styles.ch} ${char === "." && i === role.length ? styles.dot : ""}`}
                style={{ "--i": i } as CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
