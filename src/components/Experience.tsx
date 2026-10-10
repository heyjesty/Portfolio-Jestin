import type { CSSProperties } from "react";
import { Lines, SectionLabel } from "./Typography";
import styles from "./Experience.module.css";

const roles = [
  {
    company: "Freelance",
    role: "UI/UX Designer",
    summary:
      "Responsive websites, apps, dashboards, wireframes and interactive prototypes.",
    period: "Feb 2025 — Present",
    current: true,
  },
  {
    company: "Aligntax Consultancy Services",
    role: "UI/UX Designer",
    summary:
      "Web and mobile UI, navigation, user flows and consistent visual systems.",
    period: "Jan 2024 — Feb 2025",
  },
  {
    company: "Quadance Technologies",
    role: "Full Stack Developer Intern",
    summary:
      "Web application development, testing and design-to-code workflows.",
    period: "Oct 2023 — Dec 2023",
  },
];

export default function Experience() {
  return (
    <section
      className={`section ${styles.experience}`}
      aria-labelledby="experience-title"
    >
      <div className={styles.intro}>
        <SectionLabel index="04">Experience &amp; education</SectionLabel>
        <h2 id="experience-title" className="title reveal reveal-text">
          <Lines lines={["A little", "context"]} />
        </h2>
        <p className="lead reveal" style={{ "--d": "150ms" } as CSSProperties}>
          From building websites to shaping experiences. A journey of learning
          and making.
        </p>
      </div>

      <div className={styles.timeline}>
        <ol>
          {roles.map((r, i) => (
            <li
              key={r.company}
              className={`${styles.row} reveal`}
              style={{ "--d": `${i * 110}ms` } as CSSProperties}
            >
              <span
                className={`${styles.node} ${r.current ? styles.nodeLive : ""}`}
                aria-hidden="true"
              />
              <time className={styles.period}>{r.period}</time>
              <div>
                <h3>{r.company}</h3>
                <p className={styles.role}>{r.role}</p>
                <p className={styles.summary}>{r.summary}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={`${styles.education} reveal`}>
          <p className={styles.eduLabel}>Education</p>
          <div className={styles.row}>
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.period}>2023 — Present</span>
            <div>
              <h3>Bachelor of Computer Applications</h3>
              <p className={styles.role}>Manipal University Jaipur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
