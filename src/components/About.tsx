import Image from "next/image";
import { Caveat } from "next/font/google";
import type { CSSProperties } from "react";
import { RESUME } from "@/data/projects";
import { Arrow, Lines, SectionLabel } from "./Typography";
import styles from "./About.module.css";

// Handwritten note beside the toolkit icons.
const hand = Caveat({ weight: "600", subsets: ["latin"] });

const steps = [
  { name: "Research", detail: "User flows & usability testing" },
  { name: "Design", detail: "Figma systems & prototypes" },
  { name: "Code", detail: "Python, React & CSS" },
];

const services = [
  "UI/UX Design",
  "Web Design",
  "Frontend Dev",
  "Graphic Design",
  "Prototyping",
];

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      {/* The label spans both columns, so the photo can line up with the title. */}
      <div className={styles.head}>
        <SectionLabel index="02">The person behind the pixels</SectionLabel>
      </div>
      <div className={styles.copy}>
        <h2 className="title reveal reveal-text">
          <Lines lines={["Thoughtful design.", "A curious mind"]} />
        </h2>

        <div
          className={`${styles.card} reveal`}
          style={{ "--d": "120ms" } as CSSProperties}
        >
          <p className={styles.cardTag}>About me</p>
          <p className={styles.intro}>
            I&apos;m Jestin, a UI/UX designer with a background in digital
            product design and frontend development. I create clean, responsive
            web and mobile interfaces that bring usability and visual clarity
            together.
          </p>
          <div className={styles.cardFoot}>
            <a
              className="ulink"
              href={RESUME}
              download="Jestin_G_Johnson_Resume.pdf"
            >
              Download resume{" "}
              <span className={styles.down}>
                <Arrow />
              </span>
            </a>
          </div>
        </div>

        <div
          className={`${styles.card} reveal`}
          style={{ "--d": "220ms" } as CSSProperties}
        >
          <p className={styles.cardTag}>What I do</p>
          <ol className={styles.services}>
            {services.map((s, i) => (
              <li key={s}>
                <b aria-hidden="true">{i + 1}</b>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <figure
        className={`${styles.photo} reveal`}
        style={{ "--d": "200ms" } as CSSProperties}
      >
        <span className={styles.frame}>
          {/* White photo backdrop multiplies into the sky, as in the hero. */}
          <span className={styles.portrait}>
            <Image
              src="/assets/jestin-headshot.png"
              alt="Portrait of Jestin G Johnson"
              fill
              sizes="(max-width: 860px) 80vw, 40vw"
            />
          </span>
          <span className={styles.selection} aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <i key={i} />
            ))}
            <b>Jestin · UI/UX Designer</b>
          </span>
        </span>

        <span className={styles.toolkit} aria-hidden="true">
          <span className={`${hand.className} ${styles.note}`}>my toolkit</span>
          <svg className={styles.curl} viewBox="0 0 60 50" fill="none">
            <path
              d="M6 4c22 2 40 14 44 36m0 0-8-6m8 6 5-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.icons}>
            <span className={styles.figma}>
              <span className={styles.figmaMark}>
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
            <span className={styles.xd}>Xd</span>
            <span className={styles.ps}>Ps</span>
            <span className={styles.canva}>C</span>
          </span>
        </span>
        <figcaption className="sr-only">
          Jestin&apos;s toolkit: Figma, Adobe XD, Photoshop and Canva.
        </figcaption>
      </figure>

      <div className={styles.vision}>
        <div className="reveal">
          <p className={styles.eyebrow}>{"// Background & vision"}</p>
          <p className={styles.roles}>
            {["Designer", "Builder", "Problem solver"].map((w) => (
              <span key={w}>
                {w}
                <span className="dot">.</span>
              </span>
            ))}
          </p>
        </div>
        <div
          className={`${styles.story} reveal`}
          style={{ "--d": "150ms" } as CSSProperties}
        >
          <p>
            <i aria-hidden="true" />
            My journey began as a Python developer, building an AI sales
            chatbot, a music playlist system and an Odoo library manager, and
            learning how software works under the hood. Along the way I realised
            that good code only matters if people enjoy using what it powers.
          </p>
          <p>
            That pulled me into UI/UX. Today I&apos;m just as excited about
            designing as developing: shaping flows and systems in Figma, then
            bringing them to life as responsive front-ends that look considered
            and feel effortless.
          </p>
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li key={step.name}>
                <b>
                  {String(i + 1).padStart(2, "0")}. {step.name}
                </b>
                <span>{step.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className={styles.rule} aria-hidden="true">
        <span>.design</span>
        <i />
        <span>2026</span>
      </p>
    </section>
  );
}
