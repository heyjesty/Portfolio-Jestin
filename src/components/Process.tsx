"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Lines, SectionLabel } from "./Typography";
import styles from "./Process.module.css";

const steps = [
  {
    title: "Understand",
    text: "Research the problem, the people and what they need.",
    outputs: ["User interviews", "Goals", "Constraints"],
  },
  {
    title: "Structure",
    text: "Map user flows and explore ideas through wireframes.",
    outputs: ["User flows", "Wireframes", "Information architecture"],
  },
  {
    title: "Make",
    text: "Bring the experience to life with UI and interactive prototypes.",
    outputs: ["UI design", "Design system", "Prototypes"],
  },
  {
    title: "Refine",
    text: "Test, listen, iterate and prepare a clear developer handoff.",
    outputs: ["Usability testing", "Iteration", "Developer handoff"],
  },
];

export default function Process() {
  const stackRef = useRef<HTMLOListElement>(null);

  // As each card slides over the one before, the covered card settles back:
  // it shrinks slightly and dims in proportion to how much is covered.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const cards = [...stack.children] as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        const covered = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
        card.style.setProperty("--covered", covered.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className={`section ${styles.process}`}
      aria-labelledby="process-title"
    >
      <div className={styles.head}>
        <SectionLabel index="05">How I work</SectionLabel>
        <h2 id="process-title" className="title reveal reveal-text">
          <Lines lines={["From the right questions", "to the small details"]} />
        </h2>
      </div>

      {/* Sticky card deck: each step pins below the last and the next slides over it. */}
      <ol ref={stackRef} className={styles.stack}>
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={styles.card}
            style={{ "--i": i } as CSSProperties}
          >
            <div className={styles.inner}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.copy}>
                <p className={styles.step}>
                  Step {i + 1} of {steps.length}
                </p>
                <h3>{s.title}</h3>
                <p className={styles.text}>{s.text}</p>
                <ul className={styles.outputs} aria-label="What I deliver">
                  {s.outputs.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
