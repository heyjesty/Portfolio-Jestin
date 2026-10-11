"use client";

import { useRef, useState, type PointerEvent } from "react";
import { Lines, SectionLabel } from "./Typography";
import styles from "./Skills.module.css";

type Skill = {
  name: string;
  /** Short mark shown on the coloured icon tile. */
  mark: string;
  /** Icon tile colours: background, then text. */
  tile: [string, string];
  kind: string;
  detail: string;
};

const ux: [string, string] = ["var(--orange)", "#fff"];

const skills: Skill[] = [
  {
    name: "Figma",
    mark: "Fi",
    tile: ["#1e1e1e", "#ff7262"],
    kind: "Design",
    detail:
      "Interfaces, components and interactive prototypes, from the first wireframe to handoff.",
  },
  {
    name: "Adobe XD",
    mark: "Xd",
    tile: ["#470137", "#ff61f6"],
    kind: "Design",
    detail: "Screen layouts and clickable prototypes for web and mobile.",
  },
  {
    name: "Photoshop",
    mark: "Ps",
    tile: ["#001e36", "#31a8ff"],
    kind: "Visual",
    detail: "Posters, product visuals and image editing for brand work.",
  },
  {
    name: "HTML & CSS",
    mark: "</>",
    tile: ["#e34f26", "#fff"],
    kind: "Frontend",
    detail: "Semantic, responsive layouts that hold up on every screen size.",
  },
  {
    name: "JavaScript",
    mark: "JS",
    tile: ["#f7df1e", "#1e1e1e"],
    kind: "Frontend",
    detail: "Interactions and behaviour that bring static designs to life.",
  },
  {
    name: "React",
    mark: "Re",
    tile: ["#20232a", "#61dafb"],
    kind: "Frontend",
    detail: "Component-based interfaces built to match the design system.",
  },
  {
    name: "Next.js",
    mark: "N",
    tile: ["#000", "#fff"],
    kind: "Frontend",
    detail: "Fast, production-ready React sites, like the one you're on now.",
  },
  {
    name: "Tailwind CSS",
    mark: "Tw",
    tile: ["#0f172a", "#38bdf8"],
    kind: "Frontend",
    detail: "Fast, consistent styling that maps straight onto design tokens.",
  },
  {
    name: "Python",
    mark: "Py",
    tile: ["#3776ab", "#ffd43b"],
    kind: "Backend",
    detail:
      "Chatbots, playlist tools and Odoo modules: where the journey started.",
  },
  {
    name: "Wireframing",
    mark: "Wf",
    tile: ux,
    kind: "UX",
    detail: "Low-fidelity layouts to agree on structure before any pixels.",
  },
  {
    name: "Prototyping",
    mark: "Pr",
    tile: ux,
    kind: "UX",
    detail: "Clickable flows to test ideas before they're built.",
  },
  {
    name: "Design Systems",
    mark: "DS",
    tile: ux,
    kind: "UX",
    detail: "Reusable components and styles that keep a product consistent.",
  },
  {
    name: "User Research",
    mark: "UR",
    tile: ux,
    kind: "UX",
    detail: "Understanding people and their goals before designing for them.",
  },
  {
    name: "Usability Testing",
    mark: "UT",
    tile: ux,
    kind: "UX",
    detail: "Watching real people use a design, then refining what trips them up.",
  },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const cloudRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const skill = skills[active];

  // The orange dot trails the pointer across the words (mouse and pen only).
  const moveDot = (e: PointerEvent<HTMLDivElement>) => {
    const cloud = cloudRef.current;
    const dot = dotRef.current;
    if (!cloud || !dot || e.pointerType === "touch") return;
    const box = cloud.getBoundingClientRect();
    dot.style.transform = `translate(${e.clientX - box.left}px, ${e.clientY - box.top}px)`;
    dot.style.opacity = "1";
  };
  const hideDot = () => {
    if (dotRef.current) dotRef.current.style.opacity = "0";
  };

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

      <div
        ref={cloudRef}
        className={`${styles.cloud} reveal`}
        onPointerMove={moveDot}
        onPointerLeave={hideDot}
      >
        <span ref={dotRef} className={styles.dot} aria-hidden="true" />
        <ul>
          {skills.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                className={i === active ? styles.current : ""}
                aria-pressed={i === active}
                aria-controls="skill-detail"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        id="skill-detail"
        className={`${styles.detail} reveal`}
        aria-live="polite"
      >
        <div key={active} className={styles.detailInner}>
          <span
            className={styles.tile}
            style={{ background: skill.tile[0], color: skill.tile[1] }}
            aria-hidden="true"
          >
            {skill.mark}
          </span>
          <div>
            <p className={styles.detailHead}>
              <b>{skill.name}</b>
              <span>{skill.kind}</span>
            </p>
            <p className={styles.detailText}>{skill.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
