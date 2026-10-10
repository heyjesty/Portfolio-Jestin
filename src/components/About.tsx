import Image from "next/image";
import type { CSSProperties } from "react";
import { RESUME, projects } from "@/data/projects";
import { Arrow, Lines, SectionLabel } from "./Typography";
import styles from "./About.module.css";

const facts = [
  { value: `${projects.length}`, label: "Projects on Behance & GitHub" },
  { value: "2+", label: "Years designing interfaces" },
  { value: "Open", label: "To new opportunities" },
];

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className={styles.copy}>
        <SectionLabel index="02">The person behind the pixels</SectionLabel>
        <h2 className="title reveal reveal-text">
          <Lines lines={["Thoughtful design.", "A curious mind"]} />
        </h2>
        <div
          className={`${styles.text} reveal`}
          style={{ "--d": "150ms" } as CSSProperties}
        >
          <p className={styles.intro}>
            I&apos;m Jestin, a UI/UX designer with a background in digital
            product design and frontend development. I create clean, responsive
            web and mobile interfaces that bring usability and visual clarity
            together.
          </p>
          <p className="lead">
            From the first wireframe to the final interaction, I enjoy turning
            complex ideas into simple, accessible experiences.
          </p>
          <a className="ulink" href={RESUME} target="_blank" rel="noopener">
            View my resume{" "}
            <span>
              <Arrow />
            </span>
          </a>
        </div>
        <dl
          className={`${styles.facts} reveal`}
          style={{ "--d": "300ms" } as CSSProperties}
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.value}</dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure
        className={`${styles.photo} reveal`}
        style={{ "--d": "200ms" } as CSSProperties}
      >
        <span className={styles.frameName} aria-hidden="true">
          Jestin / Portrait
        </span>
        <span className={styles.canvas}>
          <span className={styles.frame}>
            <Image
              src="/assets/jestin-headshot.png"
              alt="Portrait of Jestin G Johnson"
              fill
              sizes="(max-width: 860px) 80vw, 38vw"
            />
          </span>
          <span className={styles.selection} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <b>1086 × 1448</b>
          </span>
          <span className={styles.cursor} aria-hidden="true">
            <svg width="22" height="26" viewBox="0 0 30 35">
              <path
                d="M3 2 L26 21 L15 22 L10 32 Z"
                fill="currentColor"
                stroke="#fff"
                strokeWidth="2"
              />
            </svg>
            <span>You</span>
          </span>
        </span>
        <figcaption className="sr-only">
          A little about the designer.
        </figcaption>
      </figure>
    </section>
  );
}
