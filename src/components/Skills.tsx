import type { CSSProperties } from "react";
import { Lines, SectionLabel } from "./Typography";
import styles from "./Skills.module.css";

const groups = [
  {
    name: "Design tools",
    glyph: "◇",
    items: ["Figma", "Adobe XD", "Photoshop", "Canva"],
  },
  {
    name: "Practice",
    glyph: "▢",
    items: [
      "Wireframing",
      "Prototyping",
      "User research",
      "User flows",
      "Design systems",
      "Usability testing",
      "Interaction design",
    ],
  },
  {
    name: "Front-end",
    glyph: "</>",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
];

export default function Skills() {
  return (
    <section
      className={`section ${styles.skills}`}
      aria-labelledby="skills-title"
    >
      <div className={styles.head}>
        <SectionLabel index="03">Skills &amp; tools</SectionLabel>
        <h2 id="skills-title" className="title reveal reveal-text">
          <Lines lines={["My everyday", "toolkit"]} />
        </h2>
      </div>

      {/* Three columns styled like Figma's layers panel. */}
      <div className={styles.panels}>
        {groups.map((g, gi) => (
          <div
            key={g.name}
            className={`${styles.panel} reveal`}
            style={{ "--d": `${gi * 120}ms` } as CSSProperties}
          >
            <h3 className={styles.panelHead}>
              <span aria-hidden="true">▾</span>
              {g.name}
              <small>{g.items.length}</small>
            </h3>
            <ul>
              {g.items.map((item) => (
                <li key={item}>
                  <span className={styles.glyph} aria-hidden="true">
                    {g.glyph}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
