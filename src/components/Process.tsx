import type { CSSProperties } from "react";
import { Lines, SectionLabel } from "./Typography";
import styles from "./Process.module.css";

const steps = [
  {
    title: "Understand",
    text: "Research the problem, the people and what they need.",
  },
  {
    title: "Structure",
    text: "Map user flows and explore ideas through wireframes.",
  },
  {
    title: "Make",
    text: "Bring the experience to life with UI and interactive prototypes.",
  },
  {
    title: "Refine",
    text: "Test, listen, iterate and prepare a clear developer handoff.",
  },
];

export default function Process() {
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

      {/* Steps joined by a prototype-style connector that draws itself on reveal. */}
      <div className={`${styles.flow} reveal`}>
        <span className={styles.connector} aria-hidden="true" />
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={styles.step}
              style={{ "--i": i } as CSSProperties}
            >
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.num}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
